# made.by.linus

Portfolio auf GitHub Pages. Eigenständige HTML-Seiten, keine Frontend-Abhängigkeiten zur Laufzeit.

## Vorschau

`python3 -m http.server 8765` und http://localhost:8765 öffnen.

## Inhaltspflege

Foto-Schneider-Beiträge liegen in `content/foto-schneider.json`. Vorschaubilder sind dauerhaft lokal unter `images/foto-schneider/` gespeichert. Neue Einträge enthalten `id`, `date`, `title`, `caption`, `sourceAccount`, `url`, `image`, `featured` und `featuredOrder`. `featuredOrder` steuert die Highlight-Reihenfolge. Datum aus dem Instagram-Beitrag prüfen; nicht bloß aus der Feed-Reihenfolge ableiten. Kooperationsbeiträge behalten ihren ursprünglichen Link und Account.

Nach Inhaltsänderungen `python3 tools/build.py` ausführen (benötigt lxml und Pillow). Der Generator verwendet die unveränderten bisherigen Portfolio-Inhalte in `tools/original-content.html`. CSS und JavaScript werden direkt in `styles.css` und `site.js` gepflegt.

212 im Profil sichtbare Beiträge aus 2026 erfasst (06.01. bis 06.10.2026). Datum aus dem Instagram-ID-Zeitstempel abgeleitet und stichprobenartig mit sichtbaren Instagram-Datumsangaben abgeglichen. Vollständige Reels und einzelne zusätzliche Carousel-Slides wurden nicht exportiert; die Karten verlinken auf das Original bei Instagram.

## Veröffentlichung

Geprüften Branch in das bestehende Repository `LinusLuschtinez/LinusLuschtinez.github.io` übernehmen. Sichtbare Marke: made.by.linus. Die bestehende Adresse bleibt erhalten. Keine Umbenennung des GitHub-Kontos nötig.

Vor jeder Veröffentlichung den aktuellen Live-Stand separat sichern. Original-Backup vom 06.10.2026: `/Users/lyka/Documents/Portfolio-Backup/2026-10-06-original`.
