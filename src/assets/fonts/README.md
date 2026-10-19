# Local Polish glyph extensions

Subset from the pinned Fontsource Inter and Instrument Serif 5.3.0 WOFF2 assets. Latin letters, punctuation and ó/Ó use the unchanged Latin fonts. These small files retain ĄąĆćĘęŁłŃńŚśŹźŻż, names and layout tables; see the adjacent OFL licenses. No font weight or visual design changes.

Rebuild with Python 3 + fonttools 4.58.5 + brotli: `python scripts/subset-polish-fonts.py`, then `node scripts/prepare-fonts.mjs`. Normal npm builds use the checked-in files and require no Python. Polish-only unicode ranges prevent duplicate Latin downloads.
