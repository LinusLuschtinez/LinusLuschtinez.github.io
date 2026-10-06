"""Build the global portfolio search index using only the Python standard library."""
from pathlib import Path
from html.parser import HTMLParser
import json

ROOT = Path(__file__).resolve().parents[1]

class Content(HTMLParser):
    def __init__(self):
        super().__init__()
        self.main = False
        self.sections = []
        self.active = None
        self.heading = False
        self.title = []
        self.text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'main': self.main = True
        if not self.main: return
        if tag == 'section' and attrs.get('id'):
            self.active = {'id': attrs['id'], 'title': [], 'text': []}
            self.sections.append(self.active)
        if tag in ('h1', 'h2'): self.heading = tag
        if tag == 'img' and attrs.get('alt'):
            self.handle_data(attrs['alt'])

    def handle_endtag(self, tag):
        if tag == 'main': self.main = False
        if tag == 'section': self.active = None
        if tag in ('h1', 'h2'): self.heading = False

    def handle_data(self, text):
        if not self.main: return
        self.text.append(text)
        if self.heading == 'h1': self.title.append(text)
        if self.active:
            self.active['text'].append(text)
            if self.heading == 'h2': self.active['title'].append(text)

def clean(parts): return ' '.join(' '.join(parts).split())

labels = {'index.html': 'Startseite', 'photography.html': 'Fotografie',
          'videography.html': 'Film', 'visuals.html': 'Visual Art',
          'clientwork.html': 'Kundenprojekte', 'about.html': 'Über Linus',
          'contact.html': 'Kontakt', 'price.html': 'Angebote',
          'foto-schneider.html': 'Foto Schneider'}
entries = []
for file, label in labels.items():
    content = Content()
    content.feed((ROOT / file).read_text())
    text = clean(content.text)[:3500]
    if file == 'foto-schneider.html': text = 'Foto Schneider Reels Produktvideos Social Content Baden 2026'
    entries.append({'title': label, 'category': 'Seite', 'url': file,
                    'text': text, 'description': clean(content.title)})
    for section in content.sections:
        title = clean(section['title'])
        if title and section['id'] != 'selected':
            entries.append({'title': title, 'category': label,
                            'url': file + '#' + section['id'],
                            'text': clean(section['text']), 'description': 'Projekt / Galerie'})
for post in json.loads((ROOT / 'content/foto-schneider.json').read_text()):
    entries.append({'title': post['title'], 'category': 'Foto Schneider · ' + post['date'],
                    'url': post['url'], 'text': post.get('caption', ''),
                    'description': post.get('caption', '')[:180], 'image': post['image']})
(ROOT / 'search-index.json').write_text(json.dumps(entries, ensure_ascii=False, separators=(',', ':')) + '\n')
print(f'{len(entries)} Einträge für die globale Suche erstellt.')
