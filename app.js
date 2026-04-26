
/* ── TABS ── */
function showTab(id,btn){
  // esconder filtro se não for correr
  const fb = document.getElementById('filtro-bar');
  if(fb) fb.style.display = id==='correr' ? 'flex' : 'none';
  document.querySelectorAll('.tab-b').forEach(b=>b.classList.remove('on'));
  document.querySelectorAll('.pane').forEach(p=>p.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('tp-'+id).classList.add('on');
}

/* ── ATALHOS HERO ── */
function filtrarTipo(tipo){
  const tabs=document.querySelectorAll('.tab-b');
  const mapa={correr:0,batente:1,garagem:2,acess:3};
  const idx=mapa[tipo];
  if(idx!==undefined) tabs[idx].click();
  setTimeout(()=>document.getElementById('produtos').scrollIntoView({behavior:'smooth'}),50);
}

/* ── FILTRO ── */
function aplicarFiltro(){
  const peso=document.getElementById('f-peso').value;
  const uso=document.getElementById('f-uso').value;
  document.querySelectorAll('#grid-correr .pc').forEach(card=>{
    const dp=card.dataset.peso||'';
    const du=card.dataset.uso||'';
    let ok=true;
    if(peso&&dp&&dp!==peso)ok=false;
    if(uso&&du&&du!==uso)ok=false;
    card.style.display=ok?'':'none';
  });
}
function resetFiltro(){
  document.getElementById('f-peso').value='';
  document.getElementById('f-uso').value='';
  document.querySelectorAll('#grid-correr .pc').forEach(c=>c.style.display='');
}

/* ── FORM ── */
function okForm(e){
  e.preventDefault();
  const form = e.target;
  const nome = form.querySelector('input[type="text"]').value.trim();
  const wa   = form.querySelector('input[type="tel"]').value.trim();
  const zona = form.querySelector('select').value;
  if(!nome || !wa || !zona){ alert('Por favor preenche todos os campos.'); return; }

  // Guardar lead no Supabase
  fetch('https://gpanomdrhvnqqdutdtfe.supabase.co/rest/v1/leads_instaladores', {
    method: 'POST',
    headers: {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYW5vbWRyaHZucXFkdXRkdGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTU5MTgsImV4cCI6MjA5Mjc5MTkxOH0.7OIm6W_MmFdASO3T6JfNw9wtv5o03ZxOkXt-Fu7PVSI',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYW5vbWRyaHZucXFkdXRkdGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTU5MTgsImV4cCI6MjA5Mjc5MTkxOH0.7OIm6W_MmFdASO3T6JfNw9wtv5o03ZxOkXt-Fu7PVSI',
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ nome, whatsapp: wa, zona })
  }).catch(err => console.warn('Erro ao guardar lead:', err));

  // Mostrar confirmação visual
  document.getElementById('fc').style.display='none';
  document.getElementById('fok').style.display='block';

  // Abrir WhatsApp com os dados
  const msg = 'Olá! Quero ser parceiro instalador PPA Oeste.\n\nNome/Empresa: ' + nome +
    '\nWhatsApp: ' + wa + '\nZona: ' + zona + '\n\nAguardo contacto. Obrigado!';
  setTimeout(function(){
    window.open('https://wa.me/351926961099?text=' + encodeURIComponent(msg), '_blank');
  }, 400);
}


/* ── MAPA ── */
function activateZone(el, zona) {
  document.querySelectorAll('.mi-item').forEach(i=>i.classList.remove('active'));
  document.querySelectorAll('.mz').forEach(m=>m.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.mz').forEach(m=>{
    if(m.dataset.zona===zona) m.classList.add('active');
  });
}
// activar hover nos dots do mapa
document.querySelectorAll('.mz').forEach(mz=>{
  mz.addEventListener('mouseenter',()=>{
    const zona=mz.dataset.zona;
    document.querySelectorAll('.mi-item').forEach(i=>{
      if(i.textContent.includes(zona)) i.classList.add('active');
      else i.classList.remove('active');
    });
  });
  mz.addEventListener('mouseleave',()=>{
    const activeItem=document.querySelector('.mi-item.active');
    if(!activeItem) document.querySelector('.mi-item:first-child').classList.add('active');
  });
});

/* ── SCROLL ANIMATIONS ── */
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){en.target.classList.add('visible');obs.unobserve(en.target)}
  });
},{threshold:0.08});
document.querySelectorAll('.reveal,.pc,.ben,.feat').forEach(el=>{
  el.classList.add('reveal');
  obs.observe(el);
});

/* ── NAV SHADOW ON SCROLL ── */
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>10);
},{ passive:true });



// ── SISTEMA DE IDIOMAS ──
const LANG = {"pt": {"ann_strong": "Instalador?", "ann_main": " Os preços aqui são para o cliente final. ", "ann_link": "Clica para ver as tuas condições →", "btn_ghost": "Sou instalador", "btn_nav": "Fazer pedido", "nav_1": "Motores", "nav_2": "CCTV", "nav_3": "Acessórios", "nav_4": "Instaladores", "hs_title": "Automatismos PPA para portões", "hs_tagline": "Conforto com segurança — os motores mais rápidos do mundo, entregues no Oeste de Portugal.", "hs_lbl": "O teu portão é de:", "pill_1": "⬅➡ Correr", "pill_2": "🚪 Batente", "pill_3": "🏠 Garagem", "pill_4": "❓ Não sei", "trust_1": "Entrega rápida", "trust_2": "Garantia 2 anos PPA", "trust_3": "Stock local em Portugal", "trust_4": "Fatura em todos os pedidos", "trust_5": "Condições especiais para instaladores", "sh_ey_1": "Catálogo 2026", "sh_t_1": "Escolhe o teu equipamento", "tab_1": "Portão de correr", "tab_2": "Portão de batente", "tab_3": "Porta de garagem", "tab_4": "Acessórios", "tab_5": "📷 CCTV", "tab_6": "🔐 Controlo de acesso", "pc_plbl": "Preço s/ IVA", "pc_inst_lbl": "Instalador", "pc_inst_val": "Preço especial →", "btn_wa_card": "Pedir por WhatsApp", "sh_ey_2": "Videovigilância PPA", "sh_t_2": "CCTV — Câmaras e Gravadores", "sh_ey_3": "Acessórios PPA", "sh_t_3": "Acessórios e complementos", "inst_ey": "Exclusivo para instaladores", "inst_t": "Condições exclusivas<br>para instaladores.", "inst_lead": "Trabalhas com automatismos na região? Temos condições comerciais exclusivas para instaladores e serralheiros. Regista-te — entramos em contacto em 24h.", "cond_1": "Sem mínimo mensal", "cond_2": "Portes grátis em encomendas acima de 450€", "cond_3": "Apoio técnico incluído", "escassez": "Trabalhamos com máximo de 5 parceiros por concelho para garantir volume de obra a todos.", "form_t": "Registo de parceiro", "form_sub": "3 campos. Resposta em menos de 24h com condições de parceiro.", "label_1": "Nome e empresa", "label_2": "WhatsApp", "label_3": "Zona principal", "btn_sub": "Quero ser parceiro — resposta em 24h", "fnota": "Os teus dados são confidenciais e não são partilhados com terceiros.", "fok_h": "Registo recebido!", "fok_p": "Entramos em contacto em menos de 24h com as tuas condições de parceiro. Bem-vindo à rede PPA Oeste.", "fok_wa": "Entra já no grupo de instaladores →", "cta_ey": "Pronto para começar?", "cta_h_text": "Tens dúvidas?", "cta_h_em": "Fala connosco agora.", "cta_p": "Fala connosco agora. Respondemos sempre no próprio dia — dúvida, preço ou pedido.", "btn_wa_lg": "Fazer pedido pelo WhatsApp", "btn_em": "📧 Enviar email", "foot_title_1": "Contacto", "foot_title_2": "Zona de entrega", "foot_title_3": "Navegação", "fci_label_1": "WhatsApp / Telefone", "fci_label_2": "Email", "fci_label_3": "Base de operações", "fci_label_4": "Horário WhatsApp", "fci_val_3": "Peniche, Portugal", "fci_val_4": "Segunda a Sexta, 9h–18h", "foot_entrega_titulo": "Entrega directa na região:", "foot_fora": "Fora desta área?", "foot_ctt": "", "foot_nav_1": "Motorização", "foot_nav_2": "CCTV", "foot_nav_3": "Instaladores", "foot_nav_4": "Fazer pedido", "foot_copy": "© 2025 Oeste Automatismo · Todos os direitos reservados", "rgpd": "Dados recolhidos exclusivamente para contacto comercial. Não partilhamos informações com terceiros. Direito de remoção via geral@oesteautomatismo.com (RGPD — Reg. UE 2016/679). Sem cookies de rastreamento publicitário.", "pane_ft_1": "Não encontras o teu modelo?", "pane_ft_1_link": "Fala connosco →", "pane_ft_2": "Portão diferente?", "pane_ft_2_link": "Fala connosco →", "pane_ft_3": "Outro modelo?", "pane_ft_3_link": "Fala connosco →", "pane_ft_4": "Outro acessório?", "pane_ft_4_link": "Fala connosco →", "pane_ft_5": "Mais câmaras?", "pane_ft_5_link": "Pede o catálogo →", "pane_ft_6": "Outro produto?", "pane_ft_6_link": "Fala connosco →", "ben_t_1": "Tabela de preços exclusiva para profissionais", "ben_d_1": "Condições comerciais diferenciadas para instaladores e serralheiros registados. Recebe a tabela completa em 24h após registo.", "ben_t_2": "Linha direta WhatsApp — sem esperas", "ben_d_2": "Parceiros têm resposta prioritária. Encomenda em 1 mensagem. Stock confirmado na hora.", "ben_t_3": "Clientes da loja encaminhados para ti", "ben_d_3": "Quem compra pelo site e precisa de instalar vai para parceiros da zona. Negócio nos dois sentidos."}, "en": {"ann_strong": "Installer?", "ann_main": " Prices shown are for end customers. ", "ann_link": "Click to see your conditions →", "btn_ghost": "I'm an installer", "btn_nav": "Place order", "nav_1": "Motors", "nav_2": "CCTV", "nav_3": "Accessories", "nav_4": "Installers", "hs_title": "PPA Gate Automation", "hs_tagline": "Comfort with security — the fastest motors in the world, delivered in Western Portugal.", "hs_lbl": "Your gate type:", "pill_1": "⬅➡ Sliding", "pill_2": "🚪 Swing", "pill_3": "🏠 Garage", "pill_4": "❓ Not sure", "trust_1": "Fast delivery", "trust_2": "2-year PPA warranty", "trust_3": "Local stock in Portugal", "trust_4": "Invoice on all orders", "trust_5": "Special conditions for installers", "sh_ey_1": "2026 Catalogue", "sh_t_1": "Choose your equipment", "tab_1": "Sliding gate", "tab_2": "Swing gate", "tab_3": "Garage door", "tab_4": "Accessories", "tab_5": "📷 CCTV", "tab_6": "🔐 Access control", "pc_plbl": "Price excl. VAT", "pc_inst_lbl": "Installer", "pc_inst_val": "Special price →", "btn_wa_card": "Order via WhatsApp", "sh_ey_2": "PPA Video Surveillance", "sh_t_2": "CCTV — Cameras", "sh_ey_3": "PPA Accessories", "sh_t_3": "Accessories & add-ons", "inst_ey": "Exclusive for installers", "inst_t": "Exclusive conditions<br>for installers.", "inst_lead": "Do you work with gate automation in the region? We have exclusive commercial conditions for installers and metalworkers. Register — we'll contact you within 24h.", "cond_1": "No monthly minimum", "cond_2": "Free shipping on orders over 450€", "cond_3": "Technical support included", "escassez": "We work with a maximum of 5 partners per municipality to ensure work volume for all.", "form_t": "Partner registration", "form_sub": "3 fields. Response in less than 24h with partner conditions.", "label_1": "Name and company", "label_2": "WhatsApp", "label_3": "Main area", "btn_sub": "I want to be a partner — reply in 24h", "fnota": "Your data is confidential and not shared with third parties.", "fok_h": "Registration received!", "fok_p": "We will contact you within 24h with your partner conditions. Welcome to the PPA Oeste network.", "fok_wa": "Join the installer group →", "cta_ey": "Ready to start?", "cta_h_text": "Any questions?", "cta_h_em": "Talk to us now.", "cta_p": "We always reply the same day — question, price or order.", "btn_wa_lg": "Order via WhatsApp", "btn_em": "📧 Send email", "foot_title_1": "Contact", "foot_title_2": "Delivery area", "foot_title_3": "Navigation", "fci_label_1": "WhatsApp / Phone", "fci_label_2": "Email", "fci_label_3": "Base of operations", "fci_label_4": "WhatsApp hours", "fci_val_3": "Peniche, Portugal", "fci_val_4": "Monday to Friday, 9am–6pm", "foot_entrega_titulo": "Direct delivery in the region:", "foot_fora": "Outside this area?", "foot_ctt": "", "foot_nav_1": "Motors", "foot_nav_2": "CCTV", "foot_nav_3": "Installers", "foot_nav_4": "Place order", "foot_copy": "© 2025 Oeste Automatismo · All rights reserved", "rgpd": "Data collected exclusively for commercial contact. We do not share information with third parties. Right of removal via geral@oesteautomatismo.com (GDPR — EU Reg. 2016/679). No advertising tracking cookies.", "pane_ft_1": "Can't find your model?", "pane_ft_1_link": "Talk to us →", "pane_ft_2": "Different gate?", "pane_ft_2_link": "Talk to us →", "pane_ft_3": "Other model?", "pane_ft_3_link": "Talk to us →", "pane_ft_4": "Other accessory?", "pane_ft_4_link": "Talk to us →", "pane_ft_5": "More cameras?", "pane_ft_5_link": "Request catalogue →", "pane_ft_6": "Other product?", "pane_ft_6_link": "Talk to us →", "ben_t_1": "Exclusive price list for professionals", "ben_d_1": "Differentiated conditions for registered installers. Receive the full list within 24h of registration.", "ben_t_2": "Direct WhatsApp line — no waiting", "ben_d_2": "Partners get priority response. Order in 1 message. Stock confirmed instantly.", "ben_t_3": "Store customers referred to you", "ben_d_3": "Customers who buy online and need installation are referred to local partners. Business in both directions."}, "es": {"ann_strong": "¿Instalador?", "ann_main": " Los precios mostrados son para el cliente final. ", "ann_link": "Haz clic para ver tus condiciones →", "btn_ghost": "Soy instalador", "btn_nav": "Hacer pedido", "nav_1": "Motores", "nav_2": "CCTV", "nav_3": "Accesorios", "nav_4": "Instaladores", "hs_title": "Automatismos PPA para puertas", "hs_tagline": "Confort con seguridad — los motores más rápidos del mundo en el Oeste de Portugal.", "hs_lbl": "Tipo de puerta:", "pill_1": "⬅➡ Corredera", "pill_2": "🚪 Batiente", "pill_3": "🏠 Garaje", "pill_4": "❓ No sé", "trust_1": "Entrega rápida", "trust_2": "Garantía 2 años PPA", "trust_3": "Stock local en Portugal", "trust_4": "Factura en todos los pedidos", "trust_5": "Condiciones especiales para instaladores", "sh_ey_1": "Catálogo 2026", "sh_t_1": "Elige tu equipo", "tab_1": "Puerta corredera", "tab_2": "Puerta batiente", "tab_3": "Puerta de garaje", "tab_4": "Accesorios", "tab_5": "📷 CCTV", "tab_6": "🔐 Control de acceso", "pc_plbl": "Precio s/ IVA", "pc_inst_lbl": "Instalador", "pc_inst_val": "Precio especial →", "btn_wa_card": "Pedir por WhatsApp", "sh_ey_2": "Videovigilancia PPA", "sh_t_2": "CCTV — Cámaras", "sh_ey_3": "Accesorios PPA", "sh_t_3": "Accesorios y complementos", "inst_ey": "Exclusivo para instaladores", "inst_t": "Condiciones exclusivas<br>para instaladores.", "inst_lead": "¿Trabajas con automatismos en la región? Tenemos condiciones comerciales exclusivas para instaladores. Regístrate — te contactamos en 24h.", "cond_1": "Sin mínimo mensual", "cond_2": "Envío gratis en pedidos +450€", "cond_3": "Soporte técnico incluido", "escassez": "Trabajamos con máximo 5 socios por municipio para garantizar volumen de trabajo a todos.", "form_t": "Registro de socio", "form_sub": "3 campos. Respuesta en menos de 24h.", "label_1": "Nombre y empresa", "label_2": "WhatsApp", "label_3": "Zona principal", "btn_sub": "Quiero ser socio — respuesta en 24h", "fnota": "Tus datos son confidenciales y no se comparten con terceros.", "fok_h": "¡Registro recibido!", "fok_p": "Te contactaremos en menos de 24h. Bienvenido a la red PPA Oeste.", "fok_wa": "Únete al grupo de instaladores →", "cta_ey": "¿Listo para empezar?", "cta_h_text": "¿Tienes dudas?", "cta_h_em": "Habla con nosotros.", "cta_p": "Siempre respondemos el mismo día — duda, precio o pedido.", "btn_wa_lg": "Pedir por WhatsApp", "btn_em": "📧 Enviar email", "foot_title_1": "Contacto", "foot_title_2": "Zona de entrega", "foot_title_3": "Navegación", "fci_label_1": "WhatsApp / Teléfono", "fci_label_2": "Email", "fci_label_3": "Base de operaciones", "fci_label_4": "Horario WhatsApp", "fci_val_3": "Peniche, Portugal", "fci_val_4": "Lunes a Viernes, 9h–18h", "foot_entrega_titulo": "Entrega directa en la región:", "foot_fora": "¿Fuera de esta área?", "foot_ctt": "", "foot_nav_1": "Motorización", "foot_nav_2": "CCTV", "foot_nav_3": "Instaladores", "foot_nav_4": "Hacer pedido", "foot_copy": "© 2025 Oeste Automatismo · Todos los derechos reservados", "rgpd": "Datos recogidos exclusivamente para contacto comercial. No compartimos información con terceros. Derecho de supresión vía geral@oesteautomatismo.com (RGPD — Reg. UE 2016/679). Sin cookies de seguimiento publicitario.", "pane_ft_1": "¿No encuentras tu modelo?", "pane_ft_1_link": "Habla con nosotros →", "pane_ft_2": "¿Puerta diferente?", "pane_ft_2_link": "Habla con nosotros →", "pane_ft_3": "¿Otro modelo?", "pane_ft_3_link": "Habla con nosotros →", "pane_ft_4": "¿Otro accesorio?", "pane_ft_4_link": "Habla con nosotros →", "pane_ft_5": "¿Más cámaras?", "pane_ft_5_link": "Solicita catálogo →", "pane_ft_6": "¿Otro producto?", "pane_ft_6_link": "Habla con nosotros →", "ben_t_1": "Lista de precios exclusiva para profesionales", "ben_d_1": "Condiciones diferenciadas para instaladores registrados. Recibe la lista completa en 24h.", "ben_t_2": "Línea directa WhatsApp — sin esperas", "ben_d_2": "Los socios tienen respuesta prioritaria. Pedido en 1 mensaje. Stock confirmado al instante.", "ben_t_3": "Clientes de la tienda derivados a ti", "ben_d_3": "Quien compra online y necesita instalación va a socios locales. Negocio en ambas direcciones."}, "it": {"ann_strong": "Installatore?", "ann_main": " I prezzi mostrati sono per il cliente finale. ", "ann_link": "Clicca per vedere le tue condizioni →", "btn_ghost": "Sono un installatore", "btn_nav": "Ordina ora", "nav_1": "Motori", "nav_2": "CCTV", "nav_3": "Accessori", "nav_4": "Installatori", "hs_title": "Automazioni PPA per cancelli", "hs_tagline": "Comfort con sicurezza — i motori più veloci del mondo nell'Ovest del Portogallo.", "hs_lbl": "Tipo di cancello:", "pill_1": "⬅➡ Scorrevole", "pill_2": "🚪 Battente", "pill_3": "🏠 Garage", "pill_4": "❓ Non so", "trust_1": "Consegna rapida", "trust_2": "Garanzia 2 anni PPA", "trust_3": "Stock locale in Portogallo", "trust_4": "Fattura su tutti gli ordini", "trust_5": "Condizioni speciali per installatori", "sh_ey_1": "Catalogo 2026", "sh_t_1": "Scegli il tuo equipaggiamento", "tab_1": "Cancello scorrevole", "tab_2": "Cancello battente", "tab_3": "Porta del garage", "tab_4": "Accessori", "tab_5": "📷 CCTV", "tab_6": "🔐 Controllo accessi", "pc_plbl": "Prezzo IVA escl.", "pc_inst_lbl": "Installatore", "pc_inst_val": "Prezzo speciale →", "btn_wa_card": "Ordina via WhatsApp", "sh_ey_2": "Videosorveglianza PPA", "sh_t_2": "CCTV — Telecamere", "sh_ey_3": "Accessori PPA", "sh_t_3": "Accessori e complementi", "inst_ey": "Esclusivo per installatori", "inst_t": "Condizioni esclusive<br>per installatori.", "inst_lead": "Lavori con l'automazione di cancelli nella regione? Abbiamo condizioni commerciali esclusive. Registrati — ti contattiamo entro 24h.", "cond_1": "Nessun minimo mensile", "cond_2": "Spedizione gratuita oltre 450€", "cond_3": "Supporto tecnico incluso", "escassez": "Lavoriamo con max 5 partner per comune per garantire volume di lavoro a tutti.", "form_t": "Registrazione partner", "form_sub": "3 campi. Risposta entro 24h.", "label_1": "Nome e azienda", "label_2": "WhatsApp", "label_3": "Zona principale", "btn_sub": "Voglio essere partner — risposta in 24h", "fnota": "I tuoi dati sono riservati e non vengono condivisi.", "fok_h": "Registrazione ricevuta!", "fok_p": "Ti contatteremo entro 24h. Benvenuto nella rete PPA Oeste.", "fok_wa": "Unisciti al gruppo installatori →", "cta_ey": "Pronto per iniziare?", "cta_h_text": "Hai domande?", "cta_h_em": "Contattaci ora.", "cta_p": "Rispondiamo sempre nella stessa giornata — domanda, prezzo o ordine.", "btn_wa_lg": "Ordina via WhatsApp", "btn_em": "📧 Invia email", "foot_title_1": "Contatto", "foot_title_2": "Area di consegna", "foot_title_3": "Navigazione", "fci_label_1": "WhatsApp / Telefono", "fci_label_2": "Email", "fci_label_3": "Base operativa", "fci_label_4": "Orario WhatsApp", "fci_val_3": "Peniche, Portogallo", "fci_val_4": "Lunedì a Venerdì, 9h–18h", "foot_entrega_titulo": "Consegna diretta nella regione:", "foot_fora": "Fuori da quest'area?", "foot_ctt": "", "foot_nav_1": "Motorizzazione", "foot_nav_2": "CCTV", "foot_nav_3": "Installatori", "foot_nav_4": "Ordina ora", "foot_copy": "© 2025 Oeste Automatismo · Tutti i diritti riservati", "rgpd": "Dati raccolti esclusivamente per contatto commerciale. Non condividiamo informazioni con terzi. Diritto di cancellazione via geral@oesteautomatismo.com (GDPR — Reg. UE 2016/679). Nessun cookie di tracciamento pubblicitario.", "pane_ft_1": "Non trovi il tuo modello?", "pane_ft_1_link": "Contattaci →", "pane_ft_2": "Cancello diverso?", "pane_ft_2_link": "Contattaci →", "pane_ft_3": "Altro modello?", "pane_ft_3_link": "Contattaci →", "pane_ft_4": "Altro accessorio?", "pane_ft_4_link": "Contattaci →", "pane_ft_5": "Più telecamere?", "pane_ft_5_link": "Richiedi catalogo →", "pane_ft_6": "Altro prodotto?", "pane_ft_6_link": "Contattaci →", "ben_t_1": "Listino prezzi esclusivo per professionisti", "ben_d_1": "Condizioni differenziate per installatori registrati. Ricevi il listino completo entro 24h.", "ben_t_2": "Linea diretta WhatsApp — senza attese", "ben_d_2": "I partner hanno risposta prioritaria. Ordine in 1 messaggio. Stock confermato subito.", "ben_t_3": "Clienti del negozio indirizzati a te", "ben_d_3": "Chi acquista online e ha bisogno di installazione viene indirizzato ai partner locali. Affari in entrambe le direzioni."}, "fr": {"ann_strong": "Installateur?", "ann_main": " Les prix affichés sont pour le client final. ", "ann_link": "Cliquez pour voir vos conditions →", "btn_ghost": "Je suis installateur", "btn_nav": "Passer commande", "nav_1": "Moteurs", "nav_2": "CCTV", "nav_3": "Accessoires", "nav_4": "Installateurs", "hs_title": "Automatismes PPA pour portails", "hs_tagline": "Confort avec sécurité — les moteurs les plus rapides du monde dans l'Ouest du Portugal.", "hs_lbl": "Type de portail:", "pill_1": "⬅➡ Coulissant", "pill_2": "🚪 Battant", "pill_3": "🏠 Garage", "pill_4": "❓ Je ne sais pas", "trust_1": "Livraison rapide", "trust_2": "Garantie 2 ans PPA", "trust_3": "Stock local au Portugal", "trust_4": "Facture sur toutes les commandes", "trust_5": "Conditions spéciales pour installateurs", "sh_ey_1": "Catalogue 2026", "sh_t_1": "Choisissez votre équipement", "tab_1": "Portail coulissant", "tab_2": "Portail battant", "tab_3": "Porte de garage", "tab_4": "Accessoires", "tab_5": "📷 CCTV", "tab_6": "🔐 Contrôle d'accès", "pc_plbl": "Prix HT", "pc_inst_lbl": "Installateur", "pc_inst_val": "Prix spécial →", "btn_wa_card": "Commander via WhatsApp", "sh_ey_2": "Vidéosurveillance PPA", "sh_t_2": "CCTV — Caméras", "sh_ey_3": "Accessoires PPA", "sh_t_3": "Accessoires et compléments", "inst_ey": "Exclusif pour installateurs", "inst_t": "Conditions exclusives<br>pour installateurs.", "inst_lead": "Vous travaillez avec l'automatisation de portails dans la région? Conditions commerciales exclusives pour installateurs. Inscrivez-vous — nous vous contactons sous 24h.", "cond_1": "Sans minimum mensuel", "cond_2": "Livraison gratuite dès 450€", "cond_3": "Support technique inclus", "escassez": "Nous travaillons avec max 5 partenaires par commune pour garantir le volume de travail.", "form_t": "Inscription partenaire", "form_sub": "3 champs. Réponse en moins de 24h.", "label_1": "Nom et entreprise", "label_2": "WhatsApp", "label_3": "Zone principale", "btn_sub": "Je veux être partenaire — réponse en 24h", "fnota": "Vos données sont confidentielles et ne sont pas partagées avec des tiers.", "fok_h": "Inscription reçue!", "fok_p": "Nous vous contacterons dans les 24h. Bienvenue dans le réseau PPA Oeste.", "fok_wa": "Rejoindre le groupe installateurs →", "cta_ey": "Prêt à commencer?", "cta_h_text": "Des questions?", "cta_h_em": "Contactez-nous maintenant.", "cta_p": "Nous répondons toujours le même jour — question, prix ou commande.", "btn_wa_lg": "Commander via WhatsApp", "btn_em": "📧 Envoyer un email", "foot_title_1": "Contact", "foot_title_2": "Zone de livraison", "foot_title_3": "Navigation", "fci_label_1": "WhatsApp / Téléphone", "fci_label_2": "Email", "fci_label_3": "Base d'opérations", "fci_label_4": "Horaires WhatsApp", "fci_val_3": "Peniche, Portugal", "fci_val_4": "Lundi à Vendredi, 9h–18h", "foot_entrega_titulo": "Livraison directe dans la région:", "foot_fora": "En dehors de cette zone?", "foot_ctt": "", "foot_nav_1": "Motorisation", "foot_nav_2": "CCTV", "foot_nav_3": "Installateurs", "foot_nav_4": "Passer commande", "foot_copy": "© 2025 Oeste Automatismo · Tous droits réservés", "rgpd": "Données collectées exclusivement pour contact commercial. Nous ne partageons pas d'informations avec des tiers. Droit de suppression via geral@oesteautomatismo.com (RGPD — Règl. UE 2016/679). Pas de cookies de suivi publicitaire.", "pane_ft_1": "Vous ne trouvez pas votre modèle?", "pane_ft_1_link": "Contactez-nous →", "pane_ft_2": "Portail différent?", "pane_ft_2_link": "Contactez-nous →", "pane_ft_3": "Autre modèle?", "pane_ft_3_link": "Contactez-nous →", "pane_ft_4": "Autre accessoire?", "pane_ft_4_link": "Contactez-nous →", "pane_ft_5": "Plus de caméras?", "pane_ft_5_link": "Demander le catalogue →", "pane_ft_6": "Autre produit?", "pane_ft_6_link": "Contactez-nous →", "ben_t_1": "Tarif exclusif pour professionnels", "ben_d_1": "Conditions différenciées pour installateurs enregistrés. Recevez le tarif complet sous 24h.", "ben_t_2": "Ligne directe WhatsApp — sans attente", "ben_d_2": "Les partenaires ont une réponse prioritaire. Commande en 1 message. Stock confirmé instantanément.", "ben_t_3": "Clients du site référés vers vous", "ben_d_3": "Ceux qui achètent en ligne et ont besoin d'une installation sont référés aux partenaires locaux. Affaires dans les deux sens."}};
let langAtual = 'pt';

function toggleLangMenu(){
  document.getElementById('lang-dropdown').classList.toggle('open');
}
document.addEventListener('click', function(e){
  const ls = document.getElementById('lang-sel');
  if(ls && !ls.contains(e.target))
    document.getElementById('lang-dropdown').classList.remove('open');
});

function setLang(lang, flag, code, el){
  langAtual = lang;
  document.getElementById('lang-flag').textContent = flag;
  document.getElementById('lang-code').textContent = code;
  document.getElementById('lang-dropdown').classList.remove('open');
  document.querySelectorAll('.lang-opt').forEach(o => o.classList.remove('active'));
  if(el) el.classList.add('active');
  traduzir(lang);
}

function t(k){ return (LANG[langAtual] || LANG['pt'])[k] || LANG['pt'][k] || ''; }

function setTxt(sel, key){
  const el = document.querySelector(sel);
  if(el) el.textContent = t(key);
}
function setHTML(sel, key){
  const el = document.querySelector(sel);
  if(el) el.innerHTML = t(key);
}

function traduzir(lang){
  langAtual = lang;

  // 1. ANNOUNCE BAR
  const annStrong = document.querySelector('.ann p strong');
  if(annStrong) annStrong.textContent = t('ann_strong');
  const annNodes = document.querySelector('.ann p');
  if(annNodes){
    // Actualizar o texto entre <strong> e <a>
    for(let node of annNodes.childNodes){
      if(node.nodeType === 3) node.textContent = t('ann_main');
    }
    const annA = annNodes.querySelector('a');
    if(annA) annA.textContent = t('ann_link');
  }

  // 2. NAV
  setTxt('.btn-ghost', 'btn_ghost');
  const btnNav = document.querySelector('.btn-nav');
  if(btnNav){
    const svg = btnNav.querySelector('svg');
    btnNav.textContent = ' ' + t('btn_nav');
    if(svg) btnNav.prepend(svg);
  }
  const navAs = document.querySelectorAll('.nav-ul li a');
  ['nav_1','nav_2','nav_3','nav_4'].forEach((k,i) => { if(navAs[i]) navAs[i].textContent = t(k); });

  // 3. HERO
  setTxt('.hs-title', 'hs_title');
  setTxt('.hs-tagline', 'hs_tagline');
  setTxt('.hs-lbl', 'hs_lbl');
  const pills = document.querySelectorAll('.hs-pill');
  ['pill_1','pill_2','pill_3','pill_4'].forEach((k,i) => { if(pills[i]) pills[i].textContent = t(k); });

  // 4. TRUST ITEMS (preservar o .hs-ck dentro)
  const trustItems = document.querySelectorAll('.hs-trust-item');
  ['trust_1','trust_2','trust_3','trust_4','trust_5'].forEach((k,i) => {
    if(!trustItems[i]) return;
    const ck = trustItems[i].querySelector('.hs-ck');
    trustItems[i].textContent = t(k);
    if(ck) trustItems[i].prepend(ck);
  });

  // 5. SECÇÃO PRODUTOS - título e eyebrow
  const shEys = document.querySelectorAll('.sh-ey');
  const shTs = document.querySelectorAll('.sh-t');
  if(shEys[0]) shEys[0].textContent = t('sh_ey_1');
  if(shTs[0]) shTs[0].textContent = t('sh_t_1');

  // 6. TABS (preservar .tab-dot dentro)
  const tabs = document.querySelectorAll('.tab-b');
  ['tab_1','tab_2','tab_3','tab_4','tab_5','tab_6'].forEach((k,i) => {
    if(!tabs[i]) return;
    const dot = tabs[i].querySelector('.tab-dot');
    tabs[i].textContent = t(k);
    if(dot) tabs[i].prepend(dot);
  });

  // 7. CARDS - labels (todos os cards de produto)
  document.querySelectorAll('.pc-plbl').forEach(el => el.textContent = t('pc_plbl'));
  document.querySelectorAll('.pc-inst-lbl').forEach(el => el.textContent = t('pc_inst_lbl'));
  document.querySelectorAll('.pc-inst-val').forEach(el => el.textContent = t('pc_inst_val'));
  document.querySelectorAll('.btn-wa').forEach(el => {
    const svg = el.querySelector('svg');
    el.textContent = ' ' + t('btn_wa_card');
    if(svg) el.prepend(svg);
  });

  // 8. SECÇÃO CCTV
  if(shEys[1]) shEys[1].textContent = t('sh_ey_2');
  if(shTs[1]) shTs[1].textContent = t('sh_t_2');

  // 9. SECÇÃO ACESSÓRIOS
  if(shEys[2]) shEys[2].textContent = t('sh_ey_3');
  if(shTs[2]) shTs[2].textContent = t('sh_t_3');

  // 10. SECÇÃO INSTALADORES
  setTxt('.inst-ey', 'inst_ey');
  setHTML('.inst-t', 'inst_t');
  setTxt('.inst-lead', 'inst_lead');
  const conds = document.querySelectorAll('.cond-item');
  ['cond_1','cond_2','cond_3'].forEach((k,i) => { if(conds[i]) conds[i].textContent = t(k); });
  setTxt('.escassez', 'escassez');

  // 11. FORM
  setTxt('.fbox h3', 'form_t');
  setTxt('.fbox .fsub', 'form_sub');
  const labels = document.querySelectorAll('.fg label');
  ['label_1','label_2','label_3'].forEach((k,i) => { if(labels[i]) labels[i].textContent = t(k); });
  setTxt('.btn-sub', 'btn_sub');
  setTxt('.fnota', 'fnota');

  // 12. FORM OK
  setTxt('.fok h4', 'fok_h');
  setTxt('.fok p', 'fok_p');
  const fokWa = document.querySelector('.fok-wa');
  if(fokWa) fokWa.textContent = t('fok_wa');

  // 13. CTA FINAL
  setTxt('.cta-ey', 'cta_ey');
  const ctaH = document.querySelector('.cta-h');
  if(ctaH){
    const em = ctaH.querySelector('em');
    ctaH.innerHTML = t('cta_h_text') + '<br><em>' + t('cta_h_em') + '</em>';
  }
  setTxt('.cta-p', 'cta_p');
  const btWaLg = document.querySelector('.btn-wa-lg');
  if(btWaLg){
    const svg = btWaLg.querySelector('svg');
    btWaLg.textContent = ' ' + t('btn_wa_lg');
    if(svg) btWaLg.prepend(svg);
  }
  setTxt('.btn-em', 'btn_em');

  // 14. FOOTER - títulos das colunas
  const footTitles = document.querySelectorAll('.foot-col-title');
  ['foot_title_1','foot_title_2','foot_title_3'].forEach((k,i) => { if(footTitles[i]) footTitles[i].textContent = t(k); });

  // 15. FOOTER - labels e valores do contacto
  const fciLabels = document.querySelectorAll('.fci-label');
  ['fci_label_1','fci_label_2','fci_label_3','fci_label_4'].forEach((k,i) => { if(fciLabels[i]) fciLabels[i].textContent = t(k); });
  const fciVals = document.querySelectorAll('.fci-val');
  if(fciVals[2]) fciVals[2].textContent = t('fci_val_3');
  if(fciVals[3]) fciVals[3].textContent = t('fci_val_4');

  // 16. FOOTER - zona de entrega
  const footEntregaTitulo = document.querySelector('.foot-col:nth-child(2) > div:first-of-type');
  // usar selector mais robusto baseado no texto conhecido
  document.querySelectorAll('.foot-col').forEach(col => {
    const firstDiv = col.querySelector('div[style*="font-size:13px"]');
    if(firstDiv && (firstDiv.textContent.includes('Entrega') || firstDiv.textContent.includes('delivery') || firstDiv.textContent.includes('livraison') || firstDiv.textContent.includes('Consegna') || firstDiv.textContent.includes('Entrega'))){
      firstDiv.textContent = t('foot_entrega_titulo');
    }
  });

  // 17. FOOTER - nav links
  const footNavAs = document.querySelectorAll('.foot-nav-list .fnl-item');
  ['foot_nav_1','foot_nav_2','foot_nav_3','foot_nav_4'].forEach((k,i) => {
    if(!footNavAs[i]) return;
    const ic = footNavAs[i].querySelector('.fnl-ic');
    footNavAs[i].textContent = t(k);
    if(ic) footNavAs[i].prepend(ic);
  });

  // 18. FOOTER BAR
  const footCopy = document.querySelector('.foot-bar p');
  if(footCopy) footCopy.textContent = t('foot_copy');


  // PANE-FT (textos no fundo de cada tab)
  const paneFts = document.querySelectorAll('.pane-ft');
  const paneFtKeys = ['pane_ft_1','pane_ft_2','pane_ft_3','pane_ft_4','pane_ft_5','pane_ft_6'];
  const paneFtLinkKeys = ['pane_ft_1_link','pane_ft_2_link','pane_ft_3_link','pane_ft_4_link','pane_ft_5_link','pane_ft_6_link'];
  paneFts.forEach((el, i) => {
    const a = el.querySelector('a');
    if(!paneFtKeys[i]) return;
    if(a) {
      // Actualizar texto antes do link
      for(let node of el.childNodes) {
        if(node.nodeType === 3) node.textContent = t(paneFtKeys[i]) + ' ';
      }
      a.textContent = t(paneFtLinkKeys[i]);
    } else {
      el.textContent = t(paneFtKeys[i]) + ' ' + t(paneFtLinkKeys[i]);
    }
  });

  // BEN-T e BEN-D (benefícios instaladores)
  const benTs = document.querySelectorAll('.ben-t');
  const benDs = document.querySelectorAll('.ben-d');
  ['ben_t_1','ben_t_2','ben_t_3'].forEach((k,i) => { if(benTs[i]) benTs[i].textContent = t(k); });
  ['ben_d_1','ben_d_2','ben_d_3'].forEach((k,i) => { if(benDs[i]) benDs[i].textContent = t(k); });

  // 19. RGPD nota
  document.querySelectorAll('p').forEach(p => {
    if(p.textContent.includes('RGPD') || p.textContent.includes('GDPR') || p.textContent.includes('2016/679')){
      p.textContent = t('rgpd');
    }
  });
}

// ── CARRINHO ──
const CART_FOTOS = {};
function atualizarCartFotos() {
  document.querySelectorAll('.pc').forEach(card => {
    const nome = card.querySelector('.pc-name');
    const img = card.querySelector('.pc-img img');
    if(nome && img) CART_FOTOS[nome.textContent.trim()] = img.src;
  });
}
document.addEventListener('DOMContentLoaded', function() {
  renderCarrinho();
});

let CARRINHO = [];

function adicionarAoCarrinho(btn) {
  const card = btn.closest('.pc');
  if(!card) return;
  const nomeEl = card.querySelector('.pc-name');
  const precoEl = card.querySelector('.pc-pval');
  if(!nomeEl || !precoEl) return;
  const nome = nomeEl.textContent.trim();
  const preco = parseFloat(precoEl.textContent.replace('€','').replace(',','.').trim()) || 0;
  const foto = CART_FOTOS[nome] || '';
  const existente = CARRINHO.find(i => i.nome === nome);
  if(existente) { existente.qty++; }
  else { CARRINHO.push({nome, preco, foto, qty:1}); }
  btn.textContent = '✓ No pedido';
  btn.classList.add('in-cart');
  renderCarrinho();
  // Feedback visual no botão
  btn.classList.add('added');
  const svgOrig = btn.innerHTML;
  btn.innerHTML = '✓ Adicionado';
  setTimeout(() => { btn.innerHTML = svgOrig; btn.classList.remove('added'); }, 1500);
  // Animação no float
  const fl = document.getElementById('cart-float');
  if(fl){ fl.classList.add('pop'); setTimeout(()=>fl.classList.remove('pop'),350); }
  abrirCarrinho();
}

function mudarQty(idx, delta) {
  if(!CARRINHO[idx]) return;
  CARRINHO[idx].qty += delta;
  if(CARRINHO[idx].qty <= 0) {
    const nome = CARRINHO[idx].nome;
    CARRINHO.splice(idx, 1);
    document.querySelectorAll('.btn-cart.in-cart').forEach(btn => {
      const n = btn.closest('.pc') && btn.closest('.pc').querySelector('.pc-name');
      if(n && n.textContent.trim() === nome) {
        btn.textContent = '🛒 Adicionar ao pedido';
        btn.classList.remove('in-cart');
      }
    });
  }
  renderCarrinho();
}

function renderCarrinho() {
  const total = CARRINHO.reduce((s,i) => s+i.preco*i.qty, 0);
  const n = CARRINHO.reduce((s,i) => s+i.qty, 0);
  const get = id => document.getElementById(id);
  get('cart-total').textContent = total.toFixed(2)+'€';
  get('cart-total-iva').textContent = (total*1.23).toFixed(2)+'€';
  get('cart-float-n').textContent = n;
  const floatBtn = get('cart-float');
  if(floatBtn) floatBtn.style.display = n>0 ? 'flex' : 'none';
  const envBtn = get('btn-enviar-wa');
  if(envBtn) { envBtn.disabled = n===0; envBtn.style.opacity = n===0 ? '.5' : '1'; }
  const emptyEl = get('cart-empty');
  if(emptyEl) emptyEl.style.display = CARRINHO.length===0 ? 'block' : 'none';
  const itemsEl = get('cart-items');
  if(itemsEl) itemsEl.innerHTML = CARRINHO.map((item,idx) => `
    <div class="cart-item">
      <div class="cart-item-img">${item.foto?`<img src="${item.foto}" alt="">`:'📦'}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nome}</div>
        <div class="cart-item-price">${item.preco}€/un × ${item.qty} = <strong>${(item.preco*item.qty).toFixed(2)}€</strong></div>
      </div>
      <div class="cart-qty">
        <button class="btn-qty" onclick="mudarQty(${idx},-1)">−</button>
        <span class="qty-n">${item.qty}</span>
        <button class="btn-qty" onclick="mudarQty(${idx},1)">+</button>
      </div>
    </div>
  `).join('');
}

function abrirCarrinho() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
}
function fecharCarrinho() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}
function limparCarrinho() {
  if(!confirm('Limpar o pedido?')) return;
  CARRINHO = [];
  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.textContent = '🛒 Adicionar ao pedido';
    btn.classList.remove('in-cart');
  });
  renderCarrinho();
}
function enviarWA() {
  if(!CARRINHO.length) return;
  const total = CARRINHO.reduce((s,i)=>s+i.preco*i.qty,0);
  const itens = CARRINHO.map(i=>`• ${i.nome} × ${i.qty} — ${(i.preco*i.qty).toFixed(2)}€ s/IVA`).join('\n');
  const msg = 'Olá, gostava de fazer o seguinte pedido:\n\n' + itens +
    '\n\nTotal: ' + total.toFixed(2) + '€ s/IVA (' + (total*1.23).toFixed(2) + '€ c/IVA)' +
    '\n\nPodem confirmar disponibilidade e prazo de entrega?';
  window.open('https://wa.me/351926961099?text=' + encodeURIComponent(msg), '_blank');
}




// ═══════════════════════════════════════════════
// SUPABASE — Carregamento dinâmico de produtos
// ═══════════════════════════════════════════════
const SUPABASE_URL = 'https://gpanomdrhvnqqdutdtfe.supabase.co';
const ANON_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYW5vbWRyaHZucXFkdXRkdGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTU5MTgsImV4cCI6MjA5Mjc5MTkxOH0.7OIm6W_MmFdASO3T6JfNw9wtv5o03ZxOkXt-Fu7PVSI';

// Mapeamento de tipo/subtipo para tab
const TIPO_PARA_TAB = {
  'correr':       'correr',
  'batente':      'batente',
  'garagem':      'garagem',
  'acess':        'acess',
  'acessorio':    'acess',
  'acessórios':   'acess',
  'cctv':         'cctv2',
  'cctv2':        'cctv2',
  'camara':       'cctv2',
  'câmara':       'cctv2',
  'acesso':       'acesso',
  'cancela':      'acesso',
  'barreira':     'acesso',
  'controladora': 'acesso',
  'controlo':     'acesso',
  'leitor':       'acesso',
};

function inferirTab(produto) {
  const nome  = (produto.nome  || '').toLowerCase();
  const tipo  = (produto.tipo  || '').toLowerCase();
  const sub   = (produto.subtipo || '').toLowerCase();
  const marca = (produto.marca || '').toLowerCase();

  // Por tipo explícito
  // Match exacto primeiro
  if (TIPO_PARA_TAB[tipo]) return TIPO_PARA_TAB[tipo];
  if (TIPO_PARA_TAB[sub]) return TIPO_PARA_TAB[sub];
  // Match parcial para compatibilidade
  for (const [key, tab] of Object.entries(TIPO_PARA_TAB)) {
    if (key.length > 4 && (tipo.includes(key) || sub.includes(key))) return tab;
  }
  // Por nome
  if (nome.includes('câmer') || nome.includes('camera') || nome.includes('dome') || nome.includes('360 mp') || nome.includes('ip dome')) return 'cctv2';
  if (nome.includes('cancela') || nome.includes('barreira') || nome.includes('controladora') || nome.includes('controlo') || nome.includes('control') || nome.includes('leitor') || nome.includes('rfid') || nome.includes('biometr')) return 'acesso';
  if (nome.startsWith('base ') || nome.startsWith('base ')) return 'acess';
  if (nome.includes('dz ') || nome.includes('dz-') || (nome.includes('hub') && !nome.startsWith('base')) || (nome.includes('cube') && !nome.startsWith('base')) || (nome.includes('stark') && !nome.startsWith('base')) || (nome.includes('rio') && !nome.startsWith('base')) || nome.includes('ind ') || nome.includes('brutalle')) return 'correr';
  if (nome.includes('bh ') || /^bh/.test(nome)) return 'garagem';
  if (nome.includes('pivo') || nome.includes('sk ') || nome.includes('sk-') || nome.includes('predial')) return 'batente';
  if (nome.includes('zap') || nome.includes('receptor') || nome.includes('fotoc') || nome.includes('programador') || nome.includes('contatto') || nome.includes('sinaleira') || nome.includes('base ') || nome.includes('cremalheira') || nome.includes('fechadura')) return 'acess';
  return 'correr';
}

function inferirPeso(produto) {
  const tags = produto.tags || [];
  const nome = (produto.nome || '').toLowerCase();
  for (const tag of tags) {
    const t = tag.toLowerCase();
    if (t.includes('550') || t.includes('400') || t.includes('350') || t.includes('leve')) return 'leve';
    if (t.includes('650') || t.includes('600') || t.includes('medio') || t.includes('médio')) return 'medio';
    if (t.includes('800') || t.includes('1000') || t.includes('2000') || t.includes('pesado')) return 'pesado';
  }
  return '';
}

function criarCardProduto(p) {
  const preco = p.preco_sem_iva || 0;
  const precoIva = p.preco_com_iva || (preco * 1.23);
  const peso = inferirPeso(p);
  const tab = inferirTab(p);

  const ribbon = p.ribbon
    ? `<div class="pc-ribbon ${p.ribbon.toLowerCase().includes('mais vendido') ? 'or' : p.ribbon.toLowerCase().includes('industrial') ? 'rec' : p.ribbon.toLowerCase().includes('alta') ? 'yw' : 'or'}">${p.ribbon}</div>`
    : '';

  const tags = (p.tags || []).map(t => `<span class="pc-tag">${t}</span>`).join('');

  const wifiBadge = p.tem_app
    ? `<div class="pc-wifi">📱 App PPA ON</div>`
    : '';

  const imgSrc = p.img_url || 'https://gpanomdrhvnqqdutdtfe.supabase.co/storage/v1/object/public/imagens-produtos/placeholder.png';

  return `
<div class="pc" data-peso="${peso}" data-tab="${tab}" data-id="${p.id}">
  ${ribbon}
  <div class="pc-img">
    <img src="${imgSrc}" alt="${p.nome}" loading="lazy" style="width:100%;height:136px;object-fit:contain"/>
  </div>
  <div class="pc-body">
    <div class="pc-brand">${p.marca}</div>
    <div class="pc-name">${p.nome}</div>
    ${tags ? `<div class="pc-tags">${tags}</div>` : ''}
    ${(function(){
      const lang = typeof langAtual !== 'undefined' ? langAtual : 'pt';
      const desc = (lang !== 'pt' && p['descricao_'+lang]) ? p['descricao_'+lang] : p.descricao;
      return desc ? `<div class="pc-desc">${desc}</div>` : '';
    })()}
    ${wifiBadge}
    <div class="pc-price-row">
      <div class="pc-price">
        <span class="pc-plbl">S/ IVA</span>
        <span class="pc-pval">${preco.toFixed(2)}€</span>
      </div>
      <div class="pc-price">
        <span class="pc-plbl">C/ IVA</span>
        <span class="pc-piva">${precoIva.toFixed(2)}€</span>
      </div>
    </div>
    
  </div>
  <div class="pc-foot">
    <button class="btn-cart" onclick="adicionarAoCarrinho(this)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      Adicionar ao pedido
    </button>
    <a class="btn-wa-prod" href="https://wa.me/351926961099?text=${encodeURIComponent('Olá! Tenho interesse no produto: ' + p.nome + ' — ' + preco.toFixed(2) + '€ s/IVA. Podem confirmar disponibilidade?')}" target="_blank" rel="noopener">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.549 4.116 1.512 5.85L.057 23.04a.75.75 0 0 0 .906.906l5.19-1.455A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 0 1-4.952-1.352l-.356-.213-3.683 1.032 1.033-3.683-.213-.356A9.75 9.75 0 1 1 12 21.75z"/></svg>
    </a>
  </div>
</div>`;
}

async function carregarProdutos() {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/produtos?select=*&ativo=eq.true&order=ordem.asc&limit=200`, {
      headers: { 'apikey': ANON_KEY, 'Authorization': `Bearer ${ANON_KEY}` }
    });
    if (!r.ok) throw new Error('Erro ' + r.status);
    const produtos = await r.json();

    // Agrupar por tab
    const grupos = {};
    produtos.forEach(p => {
      const tab = inferirTab(p);
      if (!grupos[tab]) grupos[tab] = [];
      grupos[tab].push(p);
    });

    // Preencher cada grid
    const grids = {
      'correr':  'grid-correr',
      'batente': 'grid-batente',
      'garagem': 'grid-garagem',
      'acess':   'grid-acess',
      'cctv2':   'grid-cctv2',
      'acesso':  'grid-acesso',
    };

    for (const [tab, gridId] of Object.entries(grids)) {
      const grid = document.getElementById(gridId);
      if (!grid) continue;
      const prods = grupos[tab] || [];
      grid.innerHTML = prods.map(criarCardProduto).join('');
    }

    // Mostrar contagens nas tabs
    document.querySelectorAll('.tab-b').forEach(btn => {
      const onclick = btn.getAttribute('onclick') || '';
      const m = onclick.match(/showTab\('(\w+)'/);
      if (m) {
        const tab = m[1];
        const n = (grupos[tab] || []).length;
        if (n > 0) {
          const dot = btn.querySelector('.tab-dot');
          if (dot && !btn.querySelector('.tab-count')) {
            const counter = document.createElement('span');
            counter.className = 'tab-count';
            counter.textContent = n;
            btn.appendChild(counter);
          }
        }
      }
    });

    // Actualizar fotos do carrinho após render
    atualizarCartFotos();

  } catch(e) {
    console.error('Erro a carregar produtos:', e);
    // Mostrar mensagem de erro nos grids
    document.querySelectorAll('[id^="grid-"]').forEach(g => {
      g.innerHTML = '<div style="padding:40px;text-align:center;color:#999">Erro a carregar produtos. Tenta de novo.</div>';
    });
  }
}

// Adicionar CSS para tab-count
const tabCountStyle = document.createElement('style');
tabCountStyle.textContent = '.tab-count{background:var(--or);color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:100px;margin-left:5px;}';
document.head.appendChild(tabCountStyle);

// Carregar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', carregarProdutos);
} else {
  carregarProdutos();
}
