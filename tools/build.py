from pathlib import Path
from lxml import html, etree
from PIL import Image
import copy, json, re, shutil, html as escape

ROOT=Path(__file__).resolve().parents[1]
ORIGINAL=ROOT/'tools/original-content.html'
source=html.fromstring(ORIGINAL.read_bytes())
def serial(e): return etree.tostring(e,encoding='unicode',method='html')
def esc(v): return escape.escape(str(v),quote=True)
nav=[('index.html','Home'),('photography.html','Photography'),('videography.html','Film'),('visuals.html','Visual Art'),('clientwork.html','Client Work'),('about.html','About')]
def shell(title,body,file,description):
 links=''.join(f'<a href="{url}"'+(' aria-current="page"' if url==file else '')+f'>{label}</a>' for url,label in nav)
 return f'''<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(title)} · made.by.linus</title><meta name="description" content="{esc(description)}"><meta name="theme-color" content="#f1f0e9"><link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="canonical" href="https://linusluschtinez.github.io/{'' if file=='index.html' else file}"><meta property="og:title" content="{esc(title)} · made.by.linus"><meta property="og:description" content="{esc(description)}"><meta property="og:type" content="website"><meta property="og:image" content="https://linusluschtinez.github.io/images/concert_photography/concert_41.webp"><link rel="stylesheet" href="styles.css"><script src="site.js" defer></script></head><body><a class="skip-link" href="#main">Zum Inhalt</a><header class="site-header"><a class="brand" href="index.html" aria-label="made.by.linus – Startseite">made.by.linus<span class="brand-dot">●</span></a><nav id="navigation" aria-label="Hauptnavigation">{links}<a class="nav-contact" href="contact.html">Let’s talk ↗</a></nav><div class="header-buttons"><button id="theme-toggle" aria-label="Farbschema wechseln" title="Farbschema wechseln">◐</button><button id="menu-toggle" aria-expanded="false" aria-controls="navigation">Menü +</button></div></header><main id="main">{body}</main><footer class="site-footer"><a class="brand" href="index.html">made.by.linus</a><p>Photography. Film. Visuals.<br>Based near Vienna.</p><div><a href="mailto:office.linus99@gmail.com">E-Mail ↗</a><a href="https://www.instagram.com/made.by.linus/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.youtube.com/@lnstz7" target="_blank" rel="noopener noreferrer">YouTube ↗</a></div><small>© <span data-year>2026</span> made.by.linus</small></footer><dialog id="lightbox" aria-label="Medienansicht"><button class="lightbox-close" aria-label="Medienansicht schließen">Schließen ×</button><div id="lightbox-media"></div><div class="lightbox-controls"><button data-direction="-1" aria-label="Vorherige Arbeit">←</button><span id="lightbox-caption"></span><button data-direction="1" aria-label="Nächste Arbeit">→</button></div></dialog></body></html>'''

def media_attrs(page):
 for img in page.xpath('.//img'):
  img.set('loading','lazy');img.set('decoding','async')
  try:
   with Image.open(ROOT/img.get('src')) as im: img.set('width',str(im.width));img.set('height',str(im.height))
  except (OSError,TypeError): pass
  if img.getparent().get('class','').find('image-gallery')>=0:
   img.set('tabindex','0');img.set('role','button');img.set('aria-label',f"{img.get('alt','Bild')} vergrößern")
 for video in page.xpath('.//video'):
  video.attrib.pop('autoplay',None);video.set('preload','none');video.set('controls','');video.set('playsinline','')
  poster=video.get('poster')
  if poster and not (ROOT/poster).exists():
   video.attrib.pop('poster',None)
 for frame in page.xpath('.//iframe'):
  frame.set('loading','lazy');frame.set('title','Filmprojekt von made.by.linus')
 for a in page.xpath('.//a[@target="_blank"]'): a.set('rel','noopener noreferrer')
 for node in page.xpath('.//*[@style]'): node.attrib.pop('style',None)
 for a in page.xpath('.//a[@href="#contact"]'): a.set('href','contact.html')

def card(src,title,tag,link,cls=''):
 return f'<a class="work-card {cls}" href="{esc(link)}"><div class="work-image"><img src="{esc(src)}" alt="{esc(title)}" loading="lazy" decoding="async"><span class="work-arrow">↗</span></div><div class="work-meta"><h3>{esc(title)}</h3><span>{esc(tag)}</span></div></a>'

posts=json.loads((ROOT/'content/foto-schneider.json').read_text()) if (ROOT/'content/foto-schneider.json').exists() else []
featured=sorted([p for p in posts if p.get('featured')],key=lambda p:p.get('featuredOrder',0))
def insta_card(p):
 date=p.get('date','2026')
 return card(p['image'],p['title'],date,p['url'],'instagram-card')
hero='''<section class="hero"><div class="hero-top"><span class="eyebrow"><span class="status-dot"></span> Visual Creator · Vienna / AT</span><span class="eyebrow">Independent perspective / 01</span></div><h1>Bilder, die bleiben.<br><span>Content, der bewegt.</span></h1><div class="hero-bottom"><p>Ich bin Linus. Ich erzähle Geschichten mit Fotografie, Film und digitalen Visuals. Für Menschen, Künstler:innen und Marken.</p><a class="pill" href="#selected">Arbeiten entdecken <span>↓</span></a></div><a class="hero-frame" href="photography.html#concert"><img src="images/concert_photography/concert_41.webp" alt="Sänger im blauen Bühnenlicht, Konzertfotografie von Linus" width="1600" height="1067" fetchpriority="high"><div class="hero-image-label"><span>Live moments.<br>Real energy.</span><span>Concert photography ↗</span></div></a></section>'''
selected='''<section class="selected section-wrap" id="selected"><div class="section-heading"><div><span class="eyebrow">Portfolio / Curated selection</span><h2>Selected work<span class="orange">.</span></h2></div><p>Ein Einblick in meine Welt.<br>Von der Bühne bis zum Markencontent.</p></div><div class="view-switch" role="group" aria-label="Startseiten-Auswahl"><button data-view="selected" aria-pressed="true">Selected Work</button><button data-view="schneider" aria-pressed="false">Foto Schneider</button></div><div id="selected-panel" class="selected-grid">'''
selected+=card('images/concert_photography/concert_66.webp','On stage. In the moment.','Photography / Concert','photography.html#concert','wide')
selected+=card('images/atmo/atmo_12.webp','A different atmosphere.','Photography / Atmosphere','photography.html#atmosphere')
selected+=card('videos/video_preview/luma3.webp','Stories in motion.','Film / Luma Media','videography.html#luma')
selected+=card('images/cross_web/Image50.webp','WiesenCross','Client Work / Photography','clientwork.html#WiesenCross','wide')
selected+='</div><div id="schneider-panel" hidden><div class="client-intro"><span class="eyebrow">Client spotlight / 2026</span><h3>Foto Schneider</h3><p>Produktstories, Reels und Einblicke hinter die Kulissen. Content, der einen Fotofachhandel erlebbar macht.</p><a class="text-link" href="foto-schneider.html">Alle Arbeiten ansehen ↗</a></div><div class="reel-grid">'+''.join(insta_card(p) for p in featured[:6])+'</div></div></section>'
spotlight='<section class="spotlight section-wrap"><div><span class="eyebrow">Client spotlight / Foto Schneider</span><h2>Von Kameras.<br>Und Charakter.</h2><p>Meine Content-Arbeit für Foto Schneider: Produktvideos, kreative Reels und echte Momente aus dem Geschäft und von Events.</p><a class="pill" href="foto-schneider.html">Foto Schneider entdecken ↗</a></div><div class="spotlight-grid">'+''.join(insta_card(p) for p in featured[:2])+'</div></section>'
cta='''<section class="cta section-wrap"><span class="eyebrow">Your story, my perspective.</span><h2>Eine Idee?<br>Lass sie uns sichtbar machen.</h2><a class="pill" href="contact.html">Let’s create together ↗</a></section>'''
(ROOT/'index.html').write_text(shell('Photography, Film & Content',hero+selected+spotlight+cta,'index.html','made.by.linus – Fotografie, Film, Social Media Content und Visual Art aus der Nähe von Wien. Entdecke ausgewählte Arbeiten von Linus.'))
(ROOT/'home.html').write_text((ROOT/'index.html').read_text().replace('https://linusluschtinez.github.io/"','https://linusluschtinez.github.io/"'))

descs={'photography':'Konzert-, Porträt-, Künstler- und Eventfotografie von made.by.linus.','videography':'Musikvideos, Reels, Brand Content und Filmprojekte von made.by.linus.','visuals':'3D Art, Animationen und digitale Visuals von made.by.linus.','clientwork':'Ausgewählte Kundenprojekte und Kooperationen von made.by.linus.','about':'Linus – Fotograf, Filmemacher und Visual Creator aus der Nähe von Wien.','contact':'Foto-, Video- oder Content-Projekt anfragen: Kontakt zu made.by.linus.','price':'Foto-, Video-, Content- und Workshop-Angebote von made.by.linus.'}
for original in source.xpath('//div[contains(@class,"spa-page")]'):
 name=original.get('id').replace('page-','')
 if name=='home':continue
 page=copy.deepcopy(original);page.attrib.pop('class',None);page.attrib.pop('id',None)
 media_attrs(page)
 if name=='about':
  for p in page.xpath('.//p'):
   text=' '.join(p.text_content().split()).replace('25-jähriger Kunstschaffender','Kunstschaffender').replace('Seit rund 13 Jahren','Seit meiner Jugend').replace('Nach dem ich','Nachdem ich')
   for child in list(p):p.remove(child)
   p.text=text
  page.xpath('.//h1')[0].text='Die Person hinter den Bildern.'
 if name=='clientwork':
  for grid in page.xpath('.//*[@data-gallery="winstage"]'):
   grid.set('class','video-grid portrait-grid no-collapse')
  first=page.xpath('./div')[0]
  teaser=html.fromstring('<section class="client-banner section-wrap"><span class="eyebrow">Content / 2026</span><h2>Foto Schneider</h2><p>Reels, Produktstories und Behind the Scenes.</p><a class="pill" href="foto-schneider.html">Projekt entdecken ↗</a></section>');page.insert(page.index(first)+1,teaser)
 sections=page.xpath('.//section[@id]')
 if sections:
  jump=html.Element('nav',{'class':'category-nav','aria-label':'Kategorien'})
  for section in sections:
   h=section.xpath('.//h2')
   if h:
    a=etree.SubElement(jump,'a',href='#'+section.get('id'));a.text=' '.join(h[0].text_content().split())
  page.insert(1,jump)
 title=page.xpath('.//h1')[0].text_content() if page.xpath('.//h1') else name
 (ROOT/(name+'.html')).write_text(shell(title,serial(page)+(cta if name!='contact' else ''),name+'.html',descs[name]))

intro='<section class="page-header section-wrap"><span class="eyebrow">Client work / Since 2026</span><h1>Foto Schneider<span class="orange">.</span></h1><p class="subtitle">Kameras erklären. Geschichten erzählen.<br>Ein Fotofachhandel mit Persönlichkeit.</p><div class="project-facts"><div><span>Kunde</span><strong>Foto Schneider · Baden</strong></div><div><span>Format</span><strong>Reels / Social Content</strong></div><div><span>Creator</span><strong>made.by.linus</strong></div></div><a class="text-link" href="https://www.instagram.com/foto_schneider/" target="_blank" rel="noopener noreferrer">@foto_schneider auf Instagram ↗</a></section>'
gallery='<section class="section-wrap"><div class="section-heading"><div><span class="eyebrow">Selected content</span><h2>Meine Auswahl.</h2></div><p>Produktwissen, Humor und echte Einblicke.<br>Die Videos öffnen direkt auf Instagram.</p></div><div class="reel-grid">'+''.join(insta_card(p) for p in featured)+'</div></section>'
archive='<section class="section-wrap"><div class="section-heading"><div><span class="eyebrow">Project archive</span><h2>Alle erfassten Arbeiten.</h2></div><span>'+str(len(posts))+' Beiträge / 2026</span></div><label class="search-label" for="post-search">Arbeiten durchsuchen</label><input id="post-search" type="search" placeholder="Zum Beispiel: Lumix, Workshop, Behind the Scenes"><p id="search-status" role="status"></p><div class="reel-grid archive-grid">'+''.join('<div data-post="'+esc(p['title']+' '+p.get('caption',''))+'">'+insta_card(p)+'</div>' for p in posts)+'</div></section>'
(ROOT/'foto-schneider.html').write_text(shell('Foto Schneider – Social Content',intro+gallery+archive+cta,'foto-schneider.html','Reels, Produktvideos und Behind the Scenes für Foto Schneider in Baden. Content seit 2026 von made.by.linus.'))
(ROOT/'404.html').write_text(shell('Seite nicht gefunden','<section class="page-header section-wrap"><span class="eyebrow">404</span><h1>Hier geht’s weiter.</h1><p>Diese Seite gibt es nicht mehr. Entdecke meine aktuellen Arbeiten.</p><a class="pill" href="index.html">Zur Startseite ↗</a></section>','404.html','Zurück zum Portfolio von made.by.linus.'))
(ROOT/'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#f14d2e"/><text x="12" y="46" font-family="Arial,sans-serif" font-size="43" font-weight="bold" fill="#fff">m.</text></svg>')
(ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>https://linusluschtinez.github.io/'+('' if n=='index.html' else n)+'</loc></url>' for n in ['index.html','foto-schneider.html']+[n+'.html' for n in descs])+'</urlset>')
(ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: https://linusluschtinez.github.io/sitemap.xml\n')
print('10 eigenständige Portfolio-Seiten erstellt; Bestandsgalerien erhalten.')

# Refresh the global index whenever content changes.
import runpy
runpy.run_path(str(ROOT/'tools/search_index.py'))
