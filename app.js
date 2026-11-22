const menu=document.querySelector('.menu');const nav=document.querySelector('#nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus()}});
/* Solo se descargan las imágenes del modo activo; las del otro modo, al cambiar */
function cargarTema(){const d=document.documentElement.dataset.theme==='dark';document.querySelectorAll(d?'img[data-src]:is(.logo-dark,.oscuro)':'img[data-src]:is(.logo-light,.claro)').forEach(i=>{i.src=i.dataset.src;i.removeAttribute('data-src')})}
cargarTema();
document.querySelector('.theme').addEventListener('click',()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;cargarTema();try{localStorage.setItem('tema',t)}catch(e){}});
// Scroll a pantalla completa: puntos de navegación, sección activa y animaciones de entrada
(()=>{
  const secciones=[...document.querySelectorAll('main>section')];
  const conPunto=secciones.filter(s=>s.dataset.dot);
  let puntos=[];
  if(conPunto.length){
    const nav=document.createElement('nav');nav.className='dots';nav.setAttribute('aria-label','Secciones');
    nav.innerHTML=conPunto.map(s=>`<a href="#${s.id}" data-i18n-aria="${s.dataset.dot}" aria-label="${s.dataset.label}"><span></span></a>`).join('');
    document.body.append(nav);puntos=[...nav.children];
  }
  const tabs=[...document.querySelectorAll('.tabbar a')];
  const tabDe={inicio:0,juegos:1,apps:2,estudio:3,contacto:4};
  secciones.slice(1).forEach(s=>[...s.children].forEach((c,i)=>{c.classList.add('reveal');c.style.setProperty('--d',Math.min(i,5)*90+'ms')}));
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.classList.add('in');
    const s=e.target;
    puntos.forEach(p=>p.toggleAttribute('aria-current',p.hash==='#'+s.id));
    if(document.body.dataset.page==='home'&&s.id in tabDe)tabs.forEach((t,i)=>i===tabDe[s.id]?t.setAttribute('aria-current','page'):t.removeAttribute('aria-current'));
  }),{threshold:.35});
  secciones.forEach(s=>io.observe(s));
})();
/* Fuente animada del inicio: el dibujo original de fondo; encima, agua de los chorros, ondas y el pato */
(()=>{
  const img=document.querySelector('.hero-art .fuente-hueco');
  const R=document.documentElement.dataset.raiz||'';
  /* En modo oscuro, la fuente con contornos claros (como el logo de la cabecera) */
  const oscuro=()=>document.documentElement.dataset.theme==='dark'?'-dark':'';
  new MutationObserver(()=>document.querySelectorAll('.fa-tema').forEach(i=>i.setAttribute('href',`${R}assets/${i.dataset.n}${oscuro()}.webp`))).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  if(!img)return;
  const chorros='<path d="M645,588 C590,650 548,760 550,912"/><path d="M1222,588 C1280,650 1316,760 1314,912"/>';
  img.outerHTML=`<svg class="fuente-anim" viewBox="240 365 1380 850" role="img" aria-label="${img.dataset.alt}">
  <defs><clipPath id="fa-sobre"><rect x="240" y="365" width="1380" height="643"/></clipPath>
  <clipPath id="fa-agua"><polygon points="355,920 470,872 1390,872 1500,930 1150,1035 480,1000"/></clipPath></defs>
  <image class="fa-tema" data-n="fuente-base" href="${R}assets/fuente-base${oscuro()}.webp" x="240" y="365" width="1380" height="850"/>
  <g clip-path="url(#fa-agua)" fill="none" stroke="#fff" stroke-width="9">
    <ellipse class="fa-onda" cx="548" cy="924" rx="80" ry="20"/><ellipse class="fa-onda o2" cx="548" cy="924" rx="80" ry="20"/>
    <ellipse class="fa-onda" cx="1300" cy="924" rx="80" ry="20"/><ellipse class="fa-onda o2" cx="1300" cy="924" rx="80" ry="20"/>
    <ellipse class="fa-zambullida" cx="1065" cy="998" rx="60" ry="15"/><ellipse class="fa-salida" cx="1195" cy="998" rx="60" ry="15"/>
  </g>
  <g class="fa-flujo" fill="none" stroke-linecap="round">${chorros}</g>
  <g clip-path="url(#fa-sobre)"><g class="fa-pato"><image href="${R}assets/pato.webp" x="-81" y="-109" width="162" height="115"/></g></g>
  <image class="fa-columna fa-tema" data-n="columna" href="${R}assets/columna${oscuro()}.webp" x="820" y="640" width="225" height="315"/>
</svg>`;
})();
/* Al abrir sin ancla, empezar siempre arriba (el móvil a veces restauraba el scroll al final) */
if('scrollRestoration' in history)history.scrollRestoration='manual';
if(!location.hash)addEventListener('load',()=>scrollTo(0,0));

/* "Avísame cuando salga": se envía al formulario de Brevo con doble confirmación por email. Por defecto, lista "Lanzamiento Grow Greens";
   una página puede poner su propio formulario con data-endpoint (Sneaker Shelf: lista n.º 4 "Lanzamiento Sneaker Shelf").
   Con AVISO_ENDPOINT vacío, abre el correo del visitante con el mensaje preparado.
   Al conectar MailerLite/Brevo/Formspree, poner aquí la URL del formulario y se enviará directamente. */
const AVISO_ENDPOINT='https://79842441.sibforms.com/serve/MUIFACHIh9Ho-uLR84Sad0zuzfZc9vOfa7tkeUsCIwJxVqR3WKt-LueG0JdGPRvYHxxvJCdg9RZOA5JM7INs2eZ_3Qz5Xx-fyuXu7VNo3aUz42MiMIGBTfyI9Bp4v3SKttMlkYiu6q78vMnjcuH4B2OQMVk-U6TmTwwGs_ofFss9sYLXqH_qM0LZPj6x1RXR3cfgtfQQ3lNyShqndA==';
(()=>{
  const f=document.querySelector('#avisame');if(!f)return;
  const endpoint=f.dataset.endpoint!==undefined?f.dataset.endpoint:AVISO_ENDPOINT,app=f.dataset.app||'Grow Greens';
  const msg=f.querySelector('.avisame-msg'),email=f.querySelector('[name=email]'),ok=f.querySelector('[name=consent]');
  const txt=k=>{try{return (T[document.documentElement.dataset.idioma]||{})['aviso_'+k]}catch(_){}};
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!email.checkValidity()){msg.textContent=txt('err_email')||'Revisa el email, parece que no es correcto.';email.focus();return}
    if(!ok.checked){msg.textContent=txt('err_consent')||'Marca la casilla para poder avisarte.';ok.focus();return}
    if(endpoint){
      try{const d=new FormData();d.append('EMAIL',email.value.trim());d.append('OPT_IN','1');d.append('email_address_check','');d.append('locale',(document.documentElement.dataset.idioma||'es').slice(0,2));
        const r=await fetch(endpoint+'?isAjax=1',{method:'POST',body:d});const j=await r.json().catch(()=>({}));if(!r.ok||!j.success)throw 0;
        f.classList.add('hecho');msg.textContent=txt('ok')||'¡Casi está! Te hemos enviado un correo: pulsa el enlace para confirmar y te avisaremos cuando salga.'}
      catch(_){msg.textContent=txt('err_send')||'No se ha podido enviar. Inténtalo de nuevo en un rato.'}
    }else{
      location.href='mailto:contact@fuentepatos.com?subject='+encodeURIComponent('Avísame cuando salga '+app)+'&body='+encodeURIComponent('Hola, quiero que me aviséis cuando salga '+app+'.\n\nMi email: '+email.value);
      msg.textContent=txt('ok_mail')||'Se ha abierto tu correo con el mensaje listo: solo tienes que enviarlo.';
    }
  });
})();
/* Navegación entre secciones sin "#seccion" en la barra de direcciones */
(()=>{
  const pagina=location.pathname.split('/').pop()||'index.html';
  const destino=a=>{
    const u=new URL(a.href,location.href);
    if(!u.hash||u.origin!==location.origin)return null;
    const misma=u.pathname===location.pathname||(u.pathname.split('/').pop()||'index.html')===pagina&&u.pathname.replace(/[^/]*$/,'')===location.pathname.replace(/[^/]*$/,'');
    return misma?document.getElementById(decodeURIComponent(u.hash.slice(1))):null;
  };
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href*="#"]');
    if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    const el=destino(a);if(!el)return;
    e.preventDefault();
    el.scrollIntoView({block:'start'});
    if(el.id==='contenido'||a.classList.contains('skip')){el.setAttribute('tabindex','-1');el.focus({preventScroll:true})}
  });
  /* Si se llega desde otra página con #seccion, se baja hasta ella y se limpia la dirección */
  if(location.hash){
    window.hashInicial=location.hash; /* i18n.js lo usa si redirige a otro idioma */
    const el=document.getElementById(decodeURIComponent(location.hash.slice(1)));
    history.replaceState(null,'',location.pathname+location.search);
    if(el){const ir=()=>el.scrollIntoView({block:'start',behavior:'instant'});ir();addEventListener('load',()=>{ir();setTimeout(ir,120)})}
  }
})();
