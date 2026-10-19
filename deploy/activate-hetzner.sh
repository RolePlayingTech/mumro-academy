#!/usr/bin/env bash
# Safe, atomic activation script for academy.mumro.io on Hetzner.
# Run as the existing admin account after uploading both archives to /tmp.
set -euo pipefail

release_id=${1:?release id required}
public_sha=${2:?public archive checksum required}
source_sha=${3:?source archive checksum required}

[[ $release_id =~ ^[0-9]{8}T[0-9]{6}Z-[0-9a-f]{12}$ ]] || exit 2
[[ $public_sha =~ ^[0-9a-f]{64}$ && $source_sha =~ ^[0-9a-f]{64}$ ]] || exit 2

base=/var/www/mumro.io/academy
release=$base/releases/$release_id
mkdir -p "$base/releases" "$base/backups"
[[ $(realpath -m "$release") == "$base/releases/$release_id" ]] || exit 2

previous=$(readlink "$base/current" || true)
if [[ -e $release && $previous != "$release" ]]; then
    rm -rf "$release"
fi
[[ ! -e $release ]] || { printf 'Release is already active: %s\n' "$release" >&2; exit 2; }

printf '%s  %s\n' \
  "$public_sha" "/tmp/$release_id-public.tar.gz" \
  "$source_sha" "/tmp/$release_id-source.tar.gz" | sha256sum --check

mkdir -p "$release/public" "$release/source"
tar -xzf "/tmp/$release_id-public.tar.gz" -C "$release/public"
tar -xzf "/tmp/$release_id-source.tar.gz" -C "$release/source"

test -f "$release/public/index.html"
test -f "$release/public/pl/index.html"
test -f "$release/public/404.html"
test -f "$release/public/sitemap.xml"
test -f "$release/public/llms.txt"
chmod -R a+rX "$release"

# Use mumro.io-academy so alphabetical sort in sites-enabled stays after app.mumro.io
config=/etc/nginx/sites-available/mumro.io-academy
enabled=/etc/nginx/sites-enabled/mumro.io-academy
backup=$base/backups/mumro.io-academy-$release_id.conf
config_existed=false
if [[ -f $config ]]; then
    config_existed=true
    sudo -n cp -p "$config" "$backup"
fi

rollback() {
    printf 'Rolling back academy.mumro.io activation...\n' >&2
    if [[ $config_existed == true && -f $backup ]]; then
        sudo -n cp -p "$backup" "$config"
        sudo -n ln -sfn "$config" "$enabled"
    else
        sudo -n rm -f "$enabled" "$config"
    fi
    if [[ -n $previous ]]; then
        ln -sfn "$previous" "$base/current.rollback"
        mv -Tf "$base/current.rollback" "$base/current"
    elif [[ -L $base/current ]]; then
        unlink "$base/current"
    fi
    sudo -n nginx -t && sudo -n systemctl reload nginx
}
trap rollback ERR

[[ ! -e $base/current.next || -L $base/current.next ]] || exit 2
ln -sfn "$release" "$base/current.next"
mv -Tf "$base/current.next" "$base/current"

staged_conf=$(mktemp "/tmp/academy-nginx-$release_id.XXXXXX.conf")
cp "$release/source/deploy/academy.mumro.io.nginx.conf" "$staged_conf"

cert_status="dedicated (/etc/letsencrypt/live/academy.mumro.io)"
if ! sudo -n test -f /etc/letsencrypt/live/academy.mumro.io/fullchain.pem; then
    resolved_ip=$(getent ahostsv4 academy.mumro.io | awk '{print $1; exit}' || true)
    if [[ $resolved_ip == "159.69.210.236" ]]; then
        sudo -n certbot certonly --nginx -d academy.mumro.io --non-interactive --agree-tos || true
    fi
fi

if ! sudo -n test -f /etc/letsencrypt/live/academy.mumro.io/fullchain.pem; then
    sed -i 's|/etc/letsencrypt/live/academy.mumro.io/|/etc/letsencrypt/live/mumro.io/|g' "$staged_conf"
    cert_status="fallback (/etc/letsencrypt/live/mumro.io until DNS A record academy.mumro.io -> 159.69.210.236 is added)"
fi

sudo -n install -m 644 "$staged_conf" "$config"
rm -f "$staged_conf"
sudo -n ln -sfn "$config" "$enabled"
sudo -n nginx -t
sudo -n systemctl reload nginx

expected_en=$(sha256sum "$release/public/index.html" | cut -d' ' -f1)
expected_pl=$(sha256sum "$release/public/pl/index.html" | cut -d' ' -f1)
actual_en=""
actual_pl=""
for attempt in {1..15}; do
    actual_en=$(curl --insecure --compressed --fail --silent --show-error --resolve academy.mumro.io:443:127.0.0.1 'https://academy.mumro.io/?lang=en' | sha256sum | cut -d' ' -f1 || true)
    actual_pl=$(curl --insecure --compressed --fail --silent --show-error --resolve academy.mumro.io:443:127.0.0.1 'https://academy.mumro.io/pl/' | sha256sum | cut -d' ' -f1 || true)
    if [[ $actual_en == "$expected_en" && $actual_pl == "$expected_pl" ]]; then break; fi
    printf 'Waiting for Nginx workers, attempt %s: EN=%s PL=%s\n' "$attempt" "$actual_en" "$actual_pl"
    sleep 1
done
[[ $actual_en == "$expected_en" && $actual_pl == "$expected_pl" ]]

# Verify sibling services on this host are completely unaffected
curl --fail --silent --show-error --output /dev/null --resolve mumro.io:443:127.0.0.1 'https://mumro.io/?lang=en'
curl --fail --silent --show-error --output /dev/null --resolve docs.mumro.io:443:127.0.0.1 'https://docs.mumro.io/'

trap - ERR
printf 'Activated academy.mumro.io release: %s\nPrevious release: %s\nTLS status: %s\n' \
  "$release_id" "${previous:-none (initial release)}" "$cert_status"
