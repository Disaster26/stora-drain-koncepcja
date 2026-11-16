(function(){
var top=document.getElementById('top'),bur=top.querySelector('.burger'),menu=document.getElementById('menu');
bur.addEventListener('click',function(){var o=top.classList.toggle('otw');bur.setAttribute('aria-expanded',o);bur.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');});
menu.addEventListener('click',function(e){if(e.target.closest('a')){top.classList.remove('otw');bur.setAttribute('aria-expanded','false');}});
/* aktywna pozycja menu */
var links=[].slice.call(menu.querySelectorAll('a')),secs=links.map(function(a){var h=a.getAttribute('href');return h.length>1?document.querySelector(h):null;});
function akt(){var y=scrollY+innerHeight*0.35,i=0;secs.forEach(function(s,k){if(s&&s.offsetTop<=y)i=k;});links.forEach(function(a,k){if(k===i)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
var tk=0;addEventListener('scroll',function(){if(tk)return;tk=requestAnimationFrame(function(){tk=0;akt();});},{passive:true});
/* pasek mobilny po przewinieciu za przycisk hero */
var mob=document.getElementById('mob'),cta=document.querySelector('.hero .btn');
if('IntersectionObserver' in window){new IntersectionObserver(function(en){var e=en[0];mob.classList.toggle('widac',!e.isIntersecting&&e.boundingClientRect.top<0);}).observe(cta);}
/* pas linii na telefonie */
var pas=document.getElementById('pas'),lic=document.getElementById('lic'),pp=document.getElementById('pp'),nn=document.getElementById('nn'),karty=pas.children;
function krok(){return karty[1].offsetLeft-karty[0].offsetLeft;}
function idx(){return Math.round(pas.scrollLeft/krok());}
function odsw(){var sl=pas.scrollLeft,cw=pas.clientWidth,sw=pas.scrollWidth,i=Math.min(idx(),karty.length-1);lic.textContent=(i+1)+' / '+karty.length;pp.disabled=sl<4;nn.disabled=sl+cw>=sw-4;}
pas.addEventListener('scroll',odsw,{passive:true});
pp.addEventListener('click',function(){pas.scrollBy({left:-krok(),behavior:'smooth'});});
nn.addEventListener('click',function(){pas.scrollBy({left:krok(),behavior:'smooth'});});
if('IntersectionObserver' in window){var iop=new IntersectionObserver(function(en){if(en[0].isIntersecting){odsw();iop.disconnect();}});iop.observe(pas);}
/* przeciaganie mysza w pasach */
[].forEach.call(document.querySelectorAll('.linie,.zdj3,.ludzie'),function(el){var d=false,x0,s0,ruch=0;
el.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||el.scrollWidth<=el.clientWidth)return;d=true;ruch=0;x0=e.clientX;s0=el.scrollLeft;el.style.scrollSnapType='none';});
addEventListener('pointermove',function(e){if(!d)return;ruch=Math.abs(e.clientX-x0);el.scrollLeft=s0-(e.clientX-x0);});
addEventListener('pointerup',function(){if(!d)return;d=false;el.style.scrollSnapType='';});
el.addEventListener('click',function(e){if(ruch>6){e.preventDefault();e.stopPropagation();ruch=0;}},true);});
/* lightbox */
var lb=document.getElementById('lb'),li=lb.querySelector('img'),ll=lb.querySelector('.lic'),grp=[],gi=0;
function pokaz(){var b=grp[gi];li.src=b.getAttribute('data-lb');li.alt=b.querySelector('img').alt;ll.textContent=(gi+1)+' / '+grp.length+'  -  '+li.alt;}
document.addEventListener('click',function(e){var b=e.target.closest('[data-lb]');if(!b)return;var par=b.parentElement.closest('.linie,.zdj3')||document;grp=[].slice.call(par.querySelectorAll('[data-lb]'));gi=grp.indexOf(b);pokaz();lb.classList.add('on');lb.querySelector('.x').focus();});
function zamk(){lb.classList.remove('on');li.removeAttribute('src');}
lb.querySelector('.x').onclick=zamk;
lb.querySelector('.pp').onclick=function(){gi=(gi-1+grp.length)%grp.length;pokaz();};
lb.querySelector('.nn').onclick=function(){gi=(gi+1)%grp.length;pokaz();};
lb.addEventListener('click',function(e){if(e.target===lb)zamk();});
addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')zamk();if(e.key==='ArrowLeft')lb.querySelector('.pp').click();if(e.key==='ArrowRight')lb.querySelector('.nn').click();});
var tx0=null;lb.addEventListener('touchstart',function(e){tx0=e.touches[0].clientX;},{passive:true});
lb.addEventListener('touchend',function(e){if(tx0===null)return;var dx=e.changedTouches[0].clientX-tx0;if(Math.abs(dx)>50)(dx<0?lb.querySelector('.nn'):lb.querySelector('.pp')).click();tx0=null;});
/* film - fasada */
var film=document.getElementById('film');
film.addEventListener('click',function(){if(film.querySelector('iframe'))return;var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/uEe23VBAbFg?autoplay=1&rel=0';f.title='STORA-DRAIN - film firmowy';f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;film.appendChild(f);film.querySelector('.play').remove();});
/* mapa przy przewinieciu */
var mapa=document.getElementById('mapa');
function wstawMape(){if(mapa.querySelector('iframe'))return;var f=document.createElement('iframe');f.src='https://www.google.com/maps?q=Sp%C3%B3%C5%82dzielcza+58,+58-500+Jelenia+G%C3%B3ra&z=15&output=embed';f.title='Mapa: ul. Spółdzielcza 58, Jelenia Góra';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';mapa.appendChild(f);}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){wstawMape();io.disconnect();}},{rootMargin:'300px'});io.observe(mapa);}else wstawMape();
/* formularz pokazowy */
document.getElementById('form').addEventListener('submit',function(e){e.preventDefault();document.getElementById('ok').hidden=false;});
document.getElementById('rok').textContent=new Date().getFullYear();
})();
