#!/usr/bin/env bash
# Obtain and activate the dedicated Let's Encrypt TLS certificate for academy.mumro.io
# once the DNS A record academy.mumro.io -> 159.69.210.236 is active.
set -euo pipefail

resolved_ip=$(getent ahostsv4 academy.mumro.io | awk '{print $1; exit}' || true)
if [[ $resolved_ip != "159.69.210.236" ]]; then
    printf 'DNS for academy.mumro.io currently resolves to "%s" (expected 159.69.210.236).\n' "$resolved_ip" >&2
    printf 'Add A record: academy.mumro.io -> 159.69.210.236 and re-run this script.\n' >&2
    exit 1
fi

sudo -n certbot certonly --nginx -d academy.mumro.io --non-interactive --agree-tos
sudo -n test -f /etc/letsencrypt/live/academy.mumro.io/fullchain.pem

base=/var/www/mumro.io/academy
config=/etc/nginx/sites-available/mumro.io-academy
sudo -n install -m 644 "$base/current/source/deploy/academy.mumro.io.nginx.conf" "$config"
sudo -n nginx -t
sudo -n systemctl reload nginx

for attempt in {1..15}; do
    if curl --fail --silent --show-error --output /dev/null --resolve academy.mumro.io:443:127.0.0.1 'https://academy.mumro.io/?lang=en'; then
        printf 'Dedicated TLS certificate for academy.mumro.io is active and verified.\n'
        exit 0
    fi
    sleep 1
done
exit 1
