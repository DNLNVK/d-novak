const modal=document.getElementById('formModal'),open=document.getElementById('openForm'),close=document.getElementById('closeForm');function show(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('lock')}function hide(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('lock')}open.addEventListener('click',show);close.addEventListener('click',hide);modal.addEventListener('click',e=>{if(e.target===modal)hide()});document.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});document.querySelector('form').addEventListener('submit',e=>{e.preventDefault();alert('Formulář je zatím v testovacím režimu. Odesílání napojíme před spuštěním webu.');});


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
