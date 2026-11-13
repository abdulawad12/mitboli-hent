# Hent Mitboli

Download-siden for Mitboli: **https://abdulawad12.github.io/mitboli-hent/**

- **Android:** appen (APK) hentes direkte fra siden, uden Google Play. Den nyeste ligger altid på `releases/latest/download/Mitboli.apk`.
- **iPhone (og alle andre):** web-appen i mappen `app/`. Den kan lægges på hjemmeskærmen via Safari → Del → Føj til hjemmeskærm.
- **QR-kode:** `qr-mitboli.png` (til tryk) og `qr-mitboli.svg`. Den peger på siden, så den skal aldrig laves om.

Siden og web-appen bygges i det private repository (`app/demo-web/build.mjs --hent`) og lægges herover. Rediger dem ikke her.

## Ny Android-version

1. Byg appen på expo.dev med profilen `demo`.
2. Kopiér linket til APK'en fra buildet (knappen **Install** → link).
3. Her: **Actions** → **Udgiv APK** → **Run workflow**. Indsæt linket, byggenummeret og versionen.

Workflowen henter filen, tjekker den, udgiver den og opdaterer `version.json`. Appen spørger selv brugerne, om de vil hente den nye version.

Appen er en demo med opdigtede personer og data.
