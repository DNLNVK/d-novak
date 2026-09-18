const modal=document.getElementById('formModal'),open=document.getElementById('openForm'),close=document.getElementById('closeForm');function show(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('lock')}function hide(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('lock')}open.addEventListener('click',show);close.addEventListener('click',hide);modal.addEventListener('click',e=>{if(e.target===modal)hide()});document.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});document.querySelector('form').addEventListener('submit',e=>{e.preventDefault();alert('Formulář je zatím v testovacím režimu. Odesílání napojíme před spuštěním webu.');});
const hero=document.querySelector('.hero');
function updateHeroPlan(){
  if(!hero) return;
  const rect=hero.getBoundingClientRect();
  const progress=Math.min(1,Math.max(0,-rect.top/Math.max(1,hero.offsetHeight)));
  const opacity=0.34-(0.26*progress);
  hero.style.setProperty('--hero-plan-opacity',opacity.toFixed(3));
}
window.addEventListener('scroll',updateHeroPlan,{passive:true});
window.addEventListener('resize',updateHeroPlan);
updateHeroPlan();

function syncSampleGallery(){
  const grid=document.querySelector('.sample-grid');
  const main=document.querySelector('.sample-main');
  const side=document.querySelector('.sample-side');
  if(!grid||!main||!side) return;
  if(window.innerWidth<=800){
    side.style.height='';
    return;
  }
  side.style.height=main.getBoundingClientRect().height+'px';
}
window.addEventListener('load',syncSampleGallery);
window.addEventListener('resize',syncSampleGallery);
