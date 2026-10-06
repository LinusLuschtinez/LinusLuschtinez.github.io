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

// Global search is available from every portfolio page.
const searchButton=document.createElement('button');
searchButton.id='global-search-toggle';searchButton.textContent='Suche';
searchButton.setAttribute('aria-label','Website durchsuchen');
searchButton.setAttribute('aria-haspopup','dialog');
qs('.header-buttons')?.prepend(searchButton);
const searchDialog=document.createElement('dialog');
searchDialog.id='global-search';searchDialog.setAttribute('aria-labelledby','global-search-title');
searchDialog.innerHTML='<div class="search-heading"><h2 id="global-search-title">Website durchsuchen</h2><button class="search-close" aria-label="Suche schließen">Schließen ×</button></div><label for="global-query">Projekte, Galerien und Beiträge</label><input id="global-query" type="search" placeholder="Zum Beispiel: Winstage, Konzert, Lumix" autocomplete="off" autofocus><p id="global-search-status" role="status"></p><div id="global-search-results"></div>';
document.body.append(searchDialog);
const globalQuery=searchDialog.querySelector('input'),resultList=qs('#global-search-results'),resultStatus=qs('#global-search-status');
let searchEntries,searchLoading,searchFocus;
const normalizeSearch=s=>s.toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ß/g,'ss');
function renderGlobalSearch(){
 if(!searchEntries)return;
 const query=normalizeSearch(globalQuery.value.trim()),terms=query.split(/\s+/).filter(Boolean);
 const matches=searchEntries.map((entry,i)=>{
  const title=normalizeSearch(entry.title),body=normalizeSearch(entry.title+' '+entry.category+' '+entry.text);
  if(!terms.every(term=>body.includes(term)))return null;
  const score=(title===query?100:0)+(query&&title.includes(query)?30:0)+terms.filter(t=>title.includes(t)).length*10+(entry.category==='Seite'?1:0);
  return {entry,score,i};
 }).filter(Boolean).sort((a,b)=>b.score-a.score||a.i-b.i);
 const visible=query?matches.slice(0,40):matches.filter(m=>m.entry.category==='Seite');
 resultStatus.textContent=query?(matches.length?`${matches.length} Treffer${matches.length>40?' · Erste 40 angezeigt':''}`:'Keine Treffer. Probiere einen anderen Begriff.'):'Wähle einen Bereich oder suche nach einer Arbeit.';
 resultList.replaceChildren();
 visible.forEach(({entry})=>{
  const link=document.createElement('a');link.className='search-result';link.href=entry.url;
  if(entry.url.startsWith('https://')){link.target='_blank';link.rel='noopener noreferrer'}
  if(entry.image){const img=document.createElement('img');img.src=entry.image;img.alt='';img.loading='lazy';link.append(img)}
  const details=document.createElement('div'),category=document.createElement('span'),title=document.createElement('strong'),description=document.createElement('p');
  category.textContent=entry.category;title.textContent=entry.title;description.textContent=entry.description;
  details.append(category,title,description);link.append(details);resultList.append(link);
  link.addEventListener('click',()=>searchDialog.close());
 });
}
async function openGlobalSearch(){
 if(searchDialog.open)return;
 searchFocus=document.activeElement;searchDialog.showModal();document.body.classList.add('modal-open');globalQuery.focus();
 resultStatus.textContent='Suche wird geladen …';
 try{
  searchLoading||=fetch('search-index.json').then(response=>{if(!response.ok)throw Error('Search unavailable');return response.json()});
  searchEntries=await searchLoading;renderGlobalSearch();
 }catch{searchLoading=null;resultStatus.textContent='Die Suche konnte nicht geladen werden. Bitte erneut öffnen.'}
}
searchButton.addEventListener('click',openGlobalSearch);
globalQuery.addEventListener('input',renderGlobalSearch);
searchDialog.querySelector('.search-close').addEventListener('click',()=>searchDialog.close());
searchDialog.addEventListener('click',e=>{if(e.target===searchDialog)searchDialog.close()});
searchDialog.addEventListener('close',()=>{if(!dialog?.open)document.body.classList.remove('modal-open');searchFocus?.focus()});
document.addEventListener('keydown',e=>{
 const typing=e.target.matches('input,textarea,[contenteditable="true"]');
 if((e.key.toLowerCase()==='k'&&(e.ctrlKey||e.metaKey))||(e.key==='/'&&!typing&&!dialog?.open)){
  e.preventDefault();openGlobalSearch();
 }
});
searchDialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();searchDialog.close()}});
