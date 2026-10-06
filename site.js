const qs=(s)=>document.querySelector(s);
let theme;try{theme=localStorage.getItem('portfolio-theme')}catch{}
document.documentElement.classList.toggle('dark',theme==='dark'||(!theme&&matchMedia('(prefers-color-scheme: dark)').matches));
qs('#theme-toggle')?.addEventListener('click',()=>{const dark=document.documentElement.classList.toggle('dark');try{localStorage.setItem('portfolio-theme',dark?'dark':'light')}catch{}});
const menu=qs('#menu-toggle'),nav=qs('#navigation');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Schließen ×':'Menü +'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menü +';menu.focus()}});
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
const buttons=[...document.querySelectorAll('[data-view]')];
function setView(view){if(!qs('#selected-panel'))return;const schneider=view==='schneider';qs('#selected-panel').hidden=schneider;qs('#schneider-panel').hidden=!schneider;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)))}
setView(new URLSearchParams(location.search).get('view')==='foto-schneider'?'schneider':'selected');
buttons.forEach(b=>b.addEventListener('click',()=>{setView(b.dataset.view);const url=new URL(location.href);if(b.dataset.view==='schneider')url.searchParams.set('view','foto-schneider');else url.searchParams.delete('view');history.replaceState({},'',url)}));
const search=qs('#post-search');const posts=[...document.querySelectorAll('[data-post]')];
function filterPosts(){const term=search.value.trim().toLocaleLowerCase('de');let count=0;posts.forEach(p=>{const visible=p.dataset.post.toLocaleLowerCase('de').includes(term);p.hidden=!visible;if(visible)count++});qs('#search-status').textContent=count?`${count} Arbeiten`:'Keine passenden Arbeiten gefunden.'}
search?.addEventListener('input',filterPosts);if(search)filterPosts();
document.querySelectorAll('.image-gallery,.video-grid,.video-gallery').forEach((gallery,idx)=>{const children=[...gallery.children];if(children.length<=6||gallery.classList.contains('no-collapse'))return;gallery.id||=`gallery-${idx}`;children.slice(6).forEach(c=>c.hidden=true);const toggle=document.createElement('button');toggle.className='gallery-expand-btn';toggle.textContent=`Alle ${children.length} Arbeiten anzeigen +`;toggle.setAttribute('aria-controls',gallery.id);toggle.setAttribute('aria-expanded','false');gallery.after(toggle);toggle.addEventListener('click',()=>{const expand=toggle.getAttribute('aria-expanded')!=='true';children.slice(6).forEach(c=>c.hidden=!expand);toggle.setAttribute('aria-expanded',String(expand));toggle.textContent=expand?'Weniger anzeigen −':`Alle ${children.length} Arbeiten anzeigen +`})});
const dialog=qs('#lightbox');let media=[],current=0,lastFocus;
function showMedia(index){current=(index+media.length)%media.length;const item=media[current];const area=qs('#lightbox-media');area.replaceChildren();const el=document.createElement(item.type);el.src=item.src;el.alt=item.caption;if(item.type==='video'){el.controls=true;el.autoplay=true;el.playsInline=true}area.append(el);qs('#lightbox-caption').textContent=`${item.caption} · ${current+1} / ${media.length}`;dialog.querySelectorAll('[data-direction]').forEach(b=>b.hidden=media.length<2)}
function openMedia(img){const gallery=img.closest('.image-gallery');media=[...gallery.querySelectorAll('img')].map(i=>({type:'img',src:i.src,caption:i.alt}));lastFocus=img;showMedia(media.findIndex(m=>m.src===img.src));dialog.showModal();document.body.classList.add('modal-open')}
document.querySelectorAll('.image-gallery img').forEach(img=>{img.addEventListener('click',()=>openMedia(img));img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openMedia(img)}})});
qs('.lightbox-close')?.addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog?.addEventListener('close',()=>{qs('#lightbox-media').replaceChildren();document.body.classList.remove('modal-open');lastFocus?.focus()});
dialog?.querySelectorAll('[data-direction]').forEach(b=>b.addEventListener('click',()=>showMedia(current+Number(b.dataset.direction))));
document.addEventListener('keydown',e=>{if(dialog?.open&&media.length){if(e.key==='ArrowRight')showMedia(current+1);if(e.key==='ArrowLeft')showMedia(current-1)}});
