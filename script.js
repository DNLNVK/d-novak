const modal=document.getElementById('formModal'),open=document.getElementById('openForm'),close=document.getElementById('closeForm');let formHistory=false;
function show(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('lock');if(!formHistory){history.pushState({formModal:true},'','#poptavka');formHistory=true}}
function hide(fromBack=false){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('lock');if(formHistory&&!fromBack){formHistory=false;history.back()}}
open.addEventListener('click',show);close.addEventListener('click',()=>hide());modal.addEventListener('click',e=>{if(e.target===modal)hide()});window.addEventListener('popstate',()=>{if(formHistory){formHistory=false;hide(true)}});document.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});document.querySelector('form').addEventListener('submit',e=>{e.preventDefault();alert('Formulář je zatím v testovacím režimu. Odesílání napojíme před spuštěním webu.');});


// Aktivní položka navigace podle právě zobrazeného oddílu.
const navLinks=[...document.querySelectorAll('nav a')];
const navSections=[
  {id:'top',links:['#top','#intro']},
  {id:'sluzby',links:['#sluzby']},
  {id:'proces',links:['#proces']},
  {id:'ukazky',links:['#ukazky']},
  {id:'kontakt',links:['#kontakt']}
];
function updateActiveNav(){
  const y=window.scrollY+window.innerHeight*0.35;
  let current='top';
  navSections.forEach(item=>{
    const el=document.getElementById(item.id);
    if(el && el.getBoundingClientRect().top+window.scrollY<=y) current=item.id;
  });
  navLinks.forEach(link=>{
    link.classList.toggle('active',navSections.find(item=>item.id===current)?.links.includes(link.getAttribute('href'))||false);
  });
}
window.addEventListener('scroll',updateActiveNav,{passive:true});
window.addEventListener('resize',updateActiveNav);
updateActiveNav();


const blueprint=document.querySelector('.hero-blueprint');
function updateBlueprint(){
  if(!blueprint)return;
  const hero=blueprint.parentElement;
  const progress=Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/Math.max(1,hero.offsetHeight)));
  blueprint.style.opacity=(0.38-(progress*0.24)).toFixed(3);
}
window.addEventListener('scroll',updateBlueprint,{passive:true});
window.addEventListener('resize',updateBlueprint);
updateBlueprint();


const drawings=[
  {src:'Pudorys1NP.jpg',title:'Půdorys'},
  {src:'Rez.jpg',title:'Řez objektem'},
  {src:'Pohledy.jpg',title:'Pohledy'}
];
const lightbox=document.getElementById('drawingLightbox');
const lightboxImage=document.getElementById('lightboxImage');
const lightboxTitle=document.getElementById('lightboxTitle');
const lightboxCount=document.getElementById('lightboxCount');
let drawingIndex=0;
function renderDrawing(){
  const d=drawings[drawingIndex];
  lightboxImage.src=d.src;
  lightboxImage.alt='Ukázka '+d.title.toLowerCase()+' skutečného stavu';
  lightboxTitle.textContent=d.title;
  lightboxCount.textContent=String(drawingIndex+1).padStart(2,'0')+' / '+String(drawings.length).padStart(2,'0');
}
function openDrawing(index){
  drawingIndex=index;
  renderDrawing();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('lock');
}
function closeDrawing(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('lock');
}
document.querySelectorAll('.sample-card').forEach(card=>{
  card.addEventListener('click',()=>openDrawing(Number(card.dataset.index)));
});
document.querySelector('.lightbox-close').addEventListener('click',closeDrawing);
document.querySelector('.lightbox-prev').addEventListener('click',()=>{
  drawingIndex=(drawingIndex-1+drawings.length)%drawings.length; renderDrawing();
});
document.querySelector('.lightbox-next').addEventListener('click',()=>{
  drawingIndex=(drawingIndex+1)%drawings.length; renderDrawing();
});
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeDrawing()});
document.addEventListener('keydown',e=>{
  if(!lightbox.classList.contains('open'))return;
  if(e.key==='Escape')closeDrawing();
  if(e.key==='ArrowLeft')document.querySelector('.lightbox-prev').click();
  if(e.key==='ArrowRight')document.querySelector('.lightbox-next').click();
});
