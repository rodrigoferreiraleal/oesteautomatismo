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
  const precoBase = p.preco_sem_iva || 0;
  const precoIvaBase = p.preco_com_iva || (precoBase * 1.23);
  const peso = inferirPeso(p);
  const tab = inferirTab(p);

  // ── PROMOÇÃO: verificar se está activa e dentro do período ──
  const agora = new Date();
  const inicio = p.promo_inicio ? new Date(p.promo_inicio) : null;
  const fim = p.promo_fim ? new Date(p.promo_fim) : null;
  // Se promo_fim não tem hora (vem como 'YYYY-MM-DD'), considerar fim do dia
  if (fim && p.promo_fim && p.promo_fim.length <= 10) fim.setHours(23,59,59,999);
  const promoNoPeriodo =
    p.promo_ativa &&
    p.promo_desconto_pct > 0 &&
    (!inicio || agora >= inicio) &&
    (!fim || agora <= fim);

  const desconto = promoNoPeriodo ? Number(p.promo_desconto_pct) : 0;
  const preco = promoNoPeriodo ? precoBase * (1 - desconto/100) : precoBase;
  const precoIva = promoNoPeriodo ? precoIvaBase * (1 - desconto/100) : precoIvaBase;

  const ribbon = p.ribbon
    ? `<div class="pc-ribbon ${p.ribbon.toLowerCase().includes('mais vendido') ? 'or' : p.ribbon.toLowerCase().includes('industrial') ? 'rec' : p.ribbon.toLowerCase().includes('alta') ? 'yw' : 'or'}">${p.ribbon}</div>`
    : '';

  // ── BADGE de % desconto sobre a imagem ──
  const promoBadge = promoNoPeriodo
    ? `<div class="pc-promo-badge">${(p.promo_badge && p.promo_badge.trim()) ? p.promo_badge : '-' + Math.round(desconto) + '%'}</div>`
    : '';

  // ── FITA diagonal "OFERTA" no canto superior direito ──
  const promoFita = promoNoPeriodo
    ? `<div class="pc-promo-fita"><span>OFERTA</span></div>`
    : '';

  // ── COUNTDOWN se houver data fim ──
  const promoTimer = (promoNoPeriodo && fim)
    ? `<div class="pc-promo-timer" data-fim="${fim.getTime()}" data-id="${p.id}">
         <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
         <span class="pc-promo-timer-txt">A calcular...</span>
       </div>`
    : '';

  const tags = (p.tags || []).map(t => `<span class="pc-tag">${t}</span>`).join('');

  const wifiBadge = p.tem_app
    ? `<div class="pc-wifi">📱 App PPA ON</div>`
    : '';

  const imgSrc = p.img_url || 'https://gpanomdrhvnqqdutdtfe.supabase.co/storage/v1/object/public/imagens-produtos/placeholder.png';

  // ── BLOCO DE PREÇO: com ou sem promo ──
  const precoHTML = promoNoPeriodo ? `
    <div class="pc-price-row pc-price-promo">
      <div class="pc-price">
        <span class="pc-plbl">S/ IVA</span>
        <span class="pc-pold"><s>${precoBase.toFixed(2)}€</s></span>
        <span class="pc-pval pc-pnew">${preco.toFixed(2)}€</span>
      </div>
      <div class="pc-price">
        <span class="pc-plbl">C/ IVA</span>
        <span class="pc-pold"><s>${precoIvaBase.toFixed(2)}€</s></span>
        <span class="pc-piva pc-pnew">${precoIva.toFixed(2)}€</span>
      </div>
    </div>` : `
    <div class="pc-price-row">
      <div class="pc-price">
        <span class="pc-plbl">S/ IVA</span>
        <span class="pc-pval">${preco.toFixed(2)}€</span>
      </div>
      <div class="pc-price">
        <span class="pc-plbl">C/ IVA</span>
        <span class="pc-piva">${precoIva.toFixed(2)}€</span>
      </div>
    </div>`;

  // Classe extra "pc-promo-on" quando há promoção activa
  const cardCls = 'pc' + (promoNoPeriodo ? ' pc-promo-on' : '');

  return `
<div class="${cardCls}" data-peso="${peso}" data-tab="${tab}" data-id="${p.id}">
  ${ribbon}
  ${promoFita}
  ${promoBadge}
  <button class="pc-share-btn" type="button" onclick="abrirPartilha(${p.id});event.stopPropagation()" title="Partilhar produto" aria-label="Partilhar">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
  </button>
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
    ${precoHTML}
    ${promoTimer}
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
    // Guardar globalmente para uso na partilha
    window.__produtosLoja = produtos;

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



// ═══ CALCULADORA DE MOTOR ═══
const CALC_STATE = {tipo: null, peso: null, uso: null};

// Dados técnicos reais dos motores PPA
const CALC_MOTORES = {
  correr: {
    leve_residencial:    {nome:'DZ Hub 550 Jetflex', desc:'Motor de correr ideal para portões até 300kg em uso residencial. Silencioso, compacto e com controlo via app.', peso:'até 300 kg'},
    leve_intensivo:      {nome:'DZ Cube 550 Mono',   desc:'Versão robusta para uso intensivo até 550kg. Ideal para escritórios e pequenos comércios com bastante movimento.', peso:'até 550 kg'},
    medio_residencial:   {nome:'DZ Stark 650 Jetflex',desc:'Potência e velocidade para portões médios. Sistema Jetflex garante abertura ultra-rápida e travamento automático.', peso:'até 650 kg'},
    medio_intensivo:     {nome:'DZ Rio 800 Jetflex',  desc:'O mais vendido da linha PPA. Suporta até 800kg com velocidade de 3,5s para 3m. Recomendado para uso intensivo.', peso:'até 800 kg'},
    pesado_residencial:  {nome:'DZ Rio 800 Jetflex',  desc:'Fiável e robusto para portões pesados em uso residencial. O melhor custo-benefício da gama PPA.', peso:'até 800 kg'},
    pesado_intensivo:    {nome:'DZ Brutalle 2.0',     desc:'A solução industrial PPA para portões pesados em ambientes de alta exigência. Até 1000kg com durabilidade máxima.', peso:'até 1000 kg'},
  },
  batente: {
    leve_residencial:    {nome:'Pivo Home Braço Standard', desc:'Automatismo de batente para uso doméstico. Instalação simples, silenciosa e fiável para portões até 250kg por folha.', peso:'até 250 kg/folha'},
    leve_intensivo:      {nome:'SK Predial Jetflex Standard', desc:'Versão profissional para condomínios e uso intensivo. Motor robusto com sistema de segurança integrado.', peso:'até 300 kg/folha'},
    medio_residencial:   {nome:'SK Predial Braço Super', desc:'Braço de alta resistência para portões de batente médios. Velocidade superior e travamento automático reforçado.', peso:'até 400 kg/folha'},
    medio_intensivo:     {nome:'Pivo Condomínio Jetflex', desc:'Desenhado para acesso em condomínios e instalações comerciais com fluxo constante de veículos.', peso:'até 500 kg/folha'},
    pesado_residencial:  {nome:'Pivo Condomínio Jetflex', desc:'O automatismo de batente mais robusto da gama PPA para uso residencial exigente.', peso:'até 500 kg/folha'},
    pesado_intensivo:    {nome:'Pivo Condomínio Jetflex', desc:'Ideal para portões pesados em locais comerciais ou industriais com uso intensivo diário.', peso:'até 500 kg/folha'},
  },
  garagem: {
    leve_residencial:    {nome:'BH Urus 24v 800N', desc:'Motor de garagem silencioso e potente para uso doméstico. Sistema de destravamento manual em caso de falha eléctrica.', peso:'até 800N de força'},
    leve_intensivo:      {nome:'BH Urus 24v 800N', desc:'Fiabilidade comprovada para uso intensivo em garagens comerciais ou de condomínio. Força de 800N garante abertura rápida.', peso:'até 800N de força'},
    medio_residencial:   {nome:'BH Urus 24v 800N', desc:'O motor de garagem PPA cobre a maioria das portas residenciais e comerciais com excelente desempenho.', peso:'até 800N de força'},
    medio_intensivo:     {nome:'BH Urus 24v 800N', desc:'Para garagens com uso frequente — robusto e silencioso com garantia PPA oficial.', peso:'até 800N de força'},
    pesado_residencial:  {nome:'BH Urus 24v 800N', desc:'Para portas de garagem de grandes dimensões. Motor potente com sistema de segurança integrado.', peso:'até 800N de força'},
    pesado_intensivo:    {nome:'BH Urus 24v 800N', desc:'Solução robusta para portões de garagem industriais e de grande utilização. Contacte-nos para soluções especiais.', peso:'até 800N de força'},
  }
};

const CALC_PESOS = {
  correr: [
    {ic:'🏠', t:'Leve — até 300 kg', d:'Portão de ferro simples ou alumínio', v:'leve'},
    {ic:'⚖️', t:'Médio — 300 a 600 kg', d:'Portão de ferro reforçado', v:'medio'},
    {ic:'🏗️', t:'Pesado — acima de 600 kg', d:'Portão industrial ou muito grande', v:'pesado'},
  ],
  batente: [
    {ic:'🏠', t:'Leve — até 200 kg/folha', d:'Portão simples, 1 folha', v:'leve'},
    {ic:'⚖️', t:'Médio — 200 a 400 kg/folha', d:'Portão de ferro, 2 folhas', v:'medio'},
    {ic:'🏗️', t:'Pesado — acima de 400 kg', d:'Portão grande ou reforçado', v:'pesado'},
  ],
  garagem: [
    {ic:'🚗', t:'Pequena — uso normal', d:'Garagem 1 carro, porta standard', v:'leve'},
    {ic:'🚙', t:'Média — porta grande', d:'Garagem 2 carros ou porta alta', v:'medio'},
    {ic:'🚛', t:'Grande / Industrial', d:'Porta muito pesada ou alta utilização', v:'pesado'},
  ],
};

function calcEscolha(campo, valor, btn) {
  CALC_STATE[campo] = valor;
  // Highlight da opção
  btn.closest('.calc-opts').querySelectorAll('.calc-opt').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');

  setTimeout(() => {
    if (campo === 'tipo') {
      // Mostrar step 2 com opções de peso
      const pesosOpts = CALC_PESOS[valor];
      document.getElementById('calc-opts2').innerHTML = pesosOpts.map(p=>
        `<button class="calc-opt" onclick="calcEscolha('peso','${p.v}',this)">
          <span class="calc-opt-ic">${p.ic}</span>
          <span class="calc-opt-t">${p.t}</span>
          <span class="calc-opt-d">${p.d}</span>
        </button>`
      ).join('');
      calcMostrarStep(2);
    } else if (campo === 'peso') {
      calcMostrarStep(3);
    } else if (campo === 'uso') {
      calcMostrarResultado();
    }
  }, 200);
}

function calcMostrarStep(n) {
  document.querySelectorAll('.calc-step').forEach(s=>s.classList.remove('on'));
  document.getElementById('cs-'+n).classList.add('on');
  const pct = {1:33, 2:66, 3:90, result:100}[n === 'result' ? 'result' : n];
  document.getElementById('calc-prog-fill').style.width = (pct||33)+'%';
}

function calcMostrarResultado() {
  const {tipo, peso, uso} = CALC_STATE;
  const key = `${peso}_${uso}`;
  const motor = CALC_MOTORES[tipo]?.[key];
  if (!motor) { calcReset(); return; }

  document.getElementById('calc-result-prod').textContent = motor.nome;
  document.getElementById('calc-result-why').textContent = motor.desc;
  document.getElementById('calc-result-t').textContent = '✅ Motor recomendado para si';

  const msg = `Olá! Usei a calculadora e preciso de informação sobre o motor ${motor.nome}. Portão: ${tipo}, ${motor.peso}, uso ${uso}.`;
  document.getElementById('calc-wa-btn').href = 'https://wa.me/351926961099?text='+encodeURIComponent(msg);

  calcMostrarStep('result');
  document.getElementById('calc-prog-fill').style.width = '100%';
}

function calcReset() {
  CALC_STATE.tipo = CALC_STATE.peso = CALC_STATE.uso = null;
  document.querySelectorAll('.calc-opt').forEach(b=>b.classList.remove('sel'));
  calcMostrarStep(1);
}

// PESQUISA DE PRODUTOS
function pesquisarProdutos(q) {
  q = (q || '').toLowerCase().trim();
  const cards = document.querySelectorAll('.pc');
  let visiveis = 0;
  cards.forEach(card => {
    const nome = (card.querySelector('.pc-name')?.textContent || '').toLowerCase();
    const tags = (card.dataset.tags || '').toLowerCase();
    const tipo = (card.dataset.tipo || '').toLowerCase();
    const match = !q || nome.includes(q) || tags.includes(q) || tipo.includes(q);
    card.style.display = match ? '' : 'none';
    if (match) visiveis++;
  });
  // Mostrar/ocultar mensagem de sem resultados
  let semResultados = document.getElementById('sem-resultados-pesquisa');
  if (!semResultados) {
    semResultados = document.createElement('div');
    semResultados.id = 'sem-resultados-pesquisa';
    semResultados.style.cssText = 'text-align:center;padding:40px;color:var(--mu);font-size:14px;display:none';
    semResultados.textContent = '🔍 Sem resultados para "' + q + '"';
    const grid = document.querySelector('.pc-grid');
    if (grid) grid.after(semResultados);
  }
  if (q && visiveis === 0) {
    semResultados.textContent = '🔍 Sem resultados para "' + q + '"';
    semResultados.style.display = 'block';
  } else {
    semResultados.style.display = 'none';
  }
  if (q) {
    document.querySelectorAll('.tipo-tab-panel').forEach(p => p.style.display = 'block');
    document.querySelectorAll('.tab-b').forEach(b => b.classList.remove('on'));
  } else {
    const firstTab = document.querySelector('.tab-b');
    if (firstTab && !document.querySelector('.tab-b.on')) firstTab.click();
  }
}

// ═══════════════════════════════════════════════════════════════════
// SIMULADOR DE MOTOR PPA — Dados técnicos verificados (PPA oficial)
// ═══════════════════════════════════════════════════════════════════

const CSIM = {tipo:null, material:null, uso:null, largura:3.0, altura:1.8};

// Densidades reais (kg/m²) — fontes: engenharia metalúrgica
const DENS = {ferro_gradil:25, ferro_chapa:45, aluminio:10, madeira:22};
const DENS_NOME = {ferro_gradil:'Ferro c/ gradil', ferro_chapa:'Ferro chapa', aluminio:'Alumínio', madeira:'Madeira'};

// Base técnica PPA verificada:
// DZ Hub 550 Jetflex: 550kg max, 4s/3m, 40 ciclos/h, 1/4HP trifásico bivolt
// DZ Stark 650 Jetflex: 650kg (Z14)/600kg (Z18), 5.5s/4s, 25 ciclos/h, 1/3HP trifásico bivolt
// DZ Rio 800 Jetflex: 800kg, 3.5s/3m (Z18), 70 ciclos/h, 1/2HP trifásico bivolt
// DZ Brutalle 2.0T: 2000kg, 70 ciclos/h, trifásico bivolt
// Pivo Home Jetflex: 125kg/folha, 40 ciclos/h, residencial
// SK Predial Standard: 250kg/folha, 60 ciclos/h, 230V, abertura 90° em 6s
// BV Home Mono: 300kg, 30 ciclos/h, monofásico bivolt

const MOTORES_SIM = {
  correr:{
    // Portões até 300kg residencial
    leve_r:{
      nome:'DZ Hub 550 Jetflex',
      specs:['Até 550 kg','4s por 3m','40 ciclos/h','1/4 HP Trifásico','Bivolt 127/220V'],
      why:'Motor ideal para portões leves em uso residencial. Ultra-rápido com abertura em 4 segundos para 3 metros. Central Triflex Facility integrada com controlo por app.',
      acess:['Cremalheira PPA 1m','Fotocélula F32 Plus','Zap 2 botões','Sinaleira Lux'],
      cor:'#1D4ED8'
    },
    // Portões 300-500kg residencial  
    medio_r:{
      nome:'DZ Stark 650 Jetflex',
      specs:['Até 650 kg','4 a 5.5s por 3m','25 ciclos/h','1/3 HP Trifásico','Bivolt 127/220V'],
      why:'Potência e velocidade para portões médios. Abertura entre 4 e 5.5 segundos. Sistema Jetflex com travamento automático de alta precisão. Recomendado para portões de ferro com gradil até 650 kg.',
      acess:['Cremalheira PPA 1m','Fotocélula F32 Plus','Zap 4 botões','Sinaleira Lux'],
      cor:'#E8580A'
    },
    // Portões 500-700kg residencial / 300-500kg intensivo
    pesado_r:{
      nome:'DZ Rio 800 Jetflex',
      specs:['Até 800 kg','3.5s por 3m (Z18)','70 ciclos/h','1/2 HP Trifásico','Bivolt 127/220V'],
      why:'O mais vendido da gama PPA. Abre 3 metros em apenas 3.5 segundos — um dos mais rápidos do mundo. 70 ciclos por hora. Indicado para portões pesados em residência ou uso semi-intensivo.',
      acess:['Cremalheira PPA 1m','Fotocélula Reflexiva F-10R','Zap 4 botões','Sinaleira Lux','Contatto Wi-Fi'],
      cor:'#E8580A'
    },
    // Portões >700kg ou intensivo médio/pesado
    intensivo:{
      nome:'DZ Rio 800 Jetflex',
      specs:['Até 800 kg','3.5s por 3m','70 ciclos/h','1/2 HP Trifásico','Bivolt 127/220V'],
      why:'Para uso intensivo até 800 kg com 70 ciclos por hora. Robusto, ultra-rápido e fiável para condomínios ou empresas com alto tráfego de veículos diário.',
      acess:['Cremalheira PPA 1m','Fotocélula Reflexiva F-10R','Contatto Wi-Fi','Sinaleira Lux'],
      cor:'#E8580A'
    },
    // Industrial / >800kg qualquer uso
    industrial:{
      nome:'DZ Brutalle 2.0T Jetflex',
      specs:['Até 2000 kg','70 ciclos/h','Motor com ventoinha','Engrenagem alumínio','Bivolt 127/220V'],
      why:'Solução industrial PPA para portões muito pesados. Carenagem em aço com pintura eletrostática, motorredutor com bico de engraxadeira e acesso externo ao PROG. Para portões acima de 800 kg.',
      acess:['Fotocélula Reflexiva F-10R','Contatto Wi-Fi','Receptor 433MHz','Sinaleira Lux'],
      cor:'#7C3AED'
    }
  },
  batente:{
    leve_r:{
      nome:'Pivo Home Jetflex',
      specs:['Até 125 kg/folha','40 ciclos/h','Trilho centralizado','1/4 HP','Residencial'],
      why:'Automatismo para portões de batente residenciais leves. Trilho centralizado permite instalação em qualquer lado da folha. Silencioso, rápido e preciso. Ideal para folhas até 1.5m.',
      acess:['Fotocélula F32 Plus','Zap 2 botões'],
      cor:'#1D4ED8'
    },
    medio_r:{
      nome:'SK Predial Jetflex Standard',
      specs:['Até 250 kg/folha','60 ciclos/h','90° em 6s','IP54','230V / 50Hz'],
      why:'Motor profissional para portões de batente até 250 kg por folha. Proteção IP54 para condições externas adversas (-20°C a +50°C). Ideal para portões de 2 folhas de tamanho médio.',
      acess:['Fotocélula F32 Plus','Zap 4 botões','Sinaleira Lux'],
      cor:'#E8580A'
    },
    pesado_r:{
      nome:'SK Predial Jetflex Super',
      specs:['Até 250 kg/folha','60 ciclos/h','90° em 11.5s','IP54 industrial','230V / 50Hz'],
      why:'Versão Super do SK Predial, com trilho mais longo (3.5m) para portões com maiores dimensões. Máxima robustez para uso intensivo ou portões de folha grande.',
      acess:['Fotocélula Reflexiva F-10R','Contatto Wi-Fi','Sinaleira Lux'],
      cor:'#E8580A'
    }
  },
  garagem:{
    leve_r:{
      nome:'BV Home Mono',
      specs:['Até 300 kg','30 ciclos/h','13 a 16s','Monofásico bivolt','Residencial'],
      why:'Motor de garagem basculante para uso doméstico. Trilho centralizado e destravamento manual em caso de falta de energia. Fechamento suave e silencioso que prolonga a vida útil.',
      acess:['Fotocélula F32 Plus','Zap 2 botões'],
      cor:'#1D4ED8'
    },
    pesado_r:{
      nome:'BV Home Mono',
      specs:['Até 300 kg','30 ciclos/h','13 a 16s','Monofásico bivolt','Residencial'],
      why:'Para portas de garagem maiores dentro da capacidade residencial. Instalação versátil em qualquer lado da folha. Contacte-nos para portas acima de 300 kg.',
      acess:['Fotocélula F32 Plus','Zap 4 botões','Sinaleira Lux'],
      cor:'#1D4ED8'
    },
    intensivo:{
      nome:'BV Home Mono',
      specs:['Até 300 kg','30 ciclos/h','Bivolt','Residencial/Leve comercial',''],
      why:'Para garagens com uso moderado. Para uso verdadeiramente intensivo (condomínio, garagem comercial) com mais de 30 ciclos/dia, é necessária uma análise técnica no local. Contacte-nos.',
      acess:['Fotocélula F32 Plus','Contatto Wi-Fi'],
      cor:'#D97706'
    }
  }
};

function calcGetMotor(){
  const {tipo, material, uso} = CSIM;
  const l = CSIM.largura, h = CSIM.altura;
  const area = l * h;
  const dens = DENS[material] || 25;
  const pesoEst = Math.round(area * dens);
  // Margem de segurança de 25% (boa prática de instalação)
  const pesoComMargem = Math.round(pesoEst * 1.25);

  if(!tipo || !material || !uso) return null;

  const m = MOTORES_SIM[tipo];
  if(!m) return null;

  if(tipo==='correr'){
    if(pesoComMargem > 800) return {...m.industrial, pesoEst, pesoComMargem};
    if(uso==='intensivo') return {...m.intensivo, pesoEst, pesoComMargem};
    if(pesoComMargem <= 375) return {...m.leve_r, pesoEst, pesoComMargem};
    if(pesoComMargem <= 650) return {...m.medio_r, pesoEst, pesoComMargem};
    return {...m.pesado_r, pesoEst, pesoComMargem};
  }
  if(tipo==='batente'){
    // Batente: o peso é por folha (dividir por 2 se for 2 folhas)
    // Assumir 2 folhas para portão com largura >= 2m
    const pesoFolha = l >= 2 ? pesoEst/2 : pesoEst;
    const pesoFolhaMargem = Math.round(pesoFolha * 1.25);
    if(pesoFolhaMargem <= 125) return {...m.leve_r, pesoEst:Math.round(pesoFolha), pesoComMargem:pesoFolhaMargem, infoFolha:true};
    if(pesoFolhaMargem <= 250) return {...m.medio_r, pesoEst:Math.round(pesoFolha), pesoComMargem:pesoFolhaMargem, infoFolha:true};
    return {...m.pesado_r, pesoEst:Math.round(pesoFolha), pesoComMargem:pesoFolhaMargem, infoFolha:true};
  }
  if(tipo==='garagem'){
    if(uso==='intensivo') return {...m.intensivo, pesoEst, pesoComMargem};
    if(pesoEst > 200) return {...m.pesado_r, pesoEst, pesoComMargem};
    return {...m.leve_r, pesoEst, pesoComMargem};
  }
  return null;
}

// ── Animação canvas ──
let _calcAnimFrame = null;
let _calcAnimProg = 0;
let _calcAnimDir = 1;
let _calcAnimRunning = false;

function calcDesenharPortao(canvasId, tipo, material, largura, altura, progAbrir){
  const cv = document.getElementById(canvasId);
  if(!cv) return;
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  ctx.clearRect(0,0,W,H);

  const cores = {
    ferro_gradil: {fill:'rgba(85,90,100,0.85)', grad:'rgba(110,115,125,0.45)'},
    ferro_chapa:  {fill:'rgba(68,72,82,0.92)',  grad:'rgba(90,95,105,0.3)'},
    aluminio:     {fill:'rgba(175,185,200,0.88)',grad:'rgba(195,205,215,0.4)'},
    madeira:      {fill:'rgba(135,90,45,0.88)',  grad:'rgba(158,108,60,0.4)'},
  };
  const cor = cores[material] || cores.ferro_gradil;
  const OR  = 'rgba(232,88,10,';

  const maxW = W * 0.70, maxH = H * 0.66;
  const escala = Math.min(maxW/largura, maxH/altura);
  const gW = largura * escala, gH = altura * escala;
  const gX = (W - gW) / 2, gY = H * 0.10;

  const p = (progAbrir !== undefined ? Math.max(0,Math.min(1,progAbrir)) : 0);

  // Chão
  ctx.strokeStyle = 'rgba(160,160,160,0.22)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(gX-18, gY+gH+7); ctx.lineTo(gX+gW+18, gY+gH+7); ctx.stroke();

  // Pilares
  ctx.fillStyle = 'rgba(115,120,130,0.5)';
  ctx.fillRect(gX-9, gY-4, 7, gH+10);
  ctx.fillRect(gX+gW+2, gY-4, 7, gH+10);

  // ─── PORTÃO DE CORRER ───
  if(tipo === 'correr'){
    const slide = gW * 0.60 * p;
    ctx.save();
    ctx.beginPath(); ctx.rect(gX-1, gY-1, gW+2, gH+2); ctx.clip();
    ctx.fillStyle = cor.fill;
    ctx.fillRect(gX - slide, gY, gW, gH);
    ctx.strokeStyle = cor.grad; ctx.lineWidth = 0.9;
    const cols = Math.max(3, Math.round(largura*2));
    const rows = Math.max(2, Math.round(altura*1.5));
    if(material !== 'ferro_chapa'){
      for(let i=1;i<cols;i++){ctx.beginPath();ctx.moveTo(gX-slide+gW/cols*i,gY);ctx.lineTo(gX-slide+gW/cols*i,gY+gH);ctx.stroke();}
      for(let i=1;i<rows;i++){ctx.beginPath();ctx.moveTo(gX-slide,gY+gH/rows*i);ctx.lineTo(gX-slide+gW,gY+gH/rows*i);ctx.stroke();}
    }
    ctx.restore();
    // Carril
    ctx.strokeStyle = OR+'0.4)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(gX-18,gY+gH+3); ctx.lineTo(gX+gW+6,gY+gH+3); ctx.stroke();
    // Motor
    ctx.fillStyle = OR+'0.92)';
    const mx = Math.max(gX+4, gX+gW-24-slide), my = gY+gH/2-8;
    if(ctx.roundRect) ctx.roundRect(mx,my,17,16,4); else ctx.rect(mx,my,17,16);
    ctx.fill();
    // Setas de movimento
    if(p > 0 && p < 1){
      for(let i=0;i<3;i++){
        const ax = gX + gW*0.3 + i*18;
        const ay = gY + gH*0.5;
        ctx.beginPath();
        ctx.moveTo(ax, ay-7); ctx.lineTo(ax+9, ay); ctx.lineTo(ax, ay+7);
        ctx.strokeStyle = OR+(0.5-i*0.15)+')'; ctx.lineWidth=1.5; ctx.stroke();
      }
    }
  }

  // ─── PORTÃO DE BATENTE ───
  // Abre como porta normal: eixo no pilar esquerdo, folha gira para fora (perspectiva)
  else if(tipo === 'batente'){
    const fold = p; // 0 = fechado, 1 = 90° aberto

    if(largura >= 2.5){
      // 2 folhas: cada uma abre pelo seu lado para fora
      const fw = gW/2;

      // Folha esquerda — eixo no pilar esquerdo, abre para a esquerda
      ctx.save();
      // Perspectiva: a folha fica mais curta horizontalmente ao abrir (projeção)
      const leftW = fw * Math.cos(fold * Math.PI/2);
      ctx.fillStyle = cor.fill;
      ctx.beginPath();
      ctx.moveTo(gX, gY);
      ctx.lineTo(gX + leftW, gY);
      ctx.lineTo(gX + leftW, gY + gH);
      ctx.lineTo(gX, gY + gH);
      ctx.closePath();
      ctx.fill();
      if(material !== 'ferro_chapa' && leftW > 10){
        ctx.strokeStyle = cor.grad; ctx.lineWidth = 0.9;
        const cols2 = Math.max(2, Math.round(largura/2));
        for(let i=1;i<cols2;i++){ctx.beginPath();ctx.moveTo(gX+leftW/cols2*i,gY);ctx.lineTo(gX+leftW/cols2*i,gY+gH);ctx.stroke();}
        for(let i=1;i<3;i++){ctx.beginPath();ctx.moveTo(gX,gY+gH/3*i);ctx.lineTo(gX+leftW,gY+gH/3*i);ctx.stroke();}
      }
      // Sombra da folha no chão (profundidade)
      if(fold > 0.1){
        const shadowLen = fw * Math.sin(fold * Math.PI/2) * 0.4;
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        ctx.beginPath();
        ctx.moveTo(gX, gY+gH+7);
        ctx.lineTo(gX + leftW, gY+gH+7);
        ctx.lineTo(gX + leftW - shadowLen, gY+gH+7+shadowLen*0.3);
        ctx.lineTo(gX - shadowLen, gY+gH+7+shadowLen*0.3);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();

      // Folha direita — eixo no pilar direito, abre para a direita
      ctx.save();
      const rightW = fw * Math.cos(fold * Math.PI/2);
      const rx = gX + gW - rightW;
      ctx.fillStyle = cor.fill;
      ctx.beginPath();
      ctx.moveTo(rx, gY);
      ctx.lineTo(rx + rightW, gY);
      ctx.lineTo(rx + rightW, gY + gH);
      ctx.lineTo(rx, gY + gH);
      ctx.closePath();
      ctx.fill();
      if(material !== 'ferro_chapa' && rightW > 10){
        ctx.strokeStyle = cor.grad; ctx.lineWidth = 0.9;
        const cols3 = Math.max(2, Math.round(largura/2));
        for(let i=1;i<cols3;i++){ctx.beginPath();ctx.moveTo(rx+rightW/cols3*i,gY);ctx.lineTo(rx+rightW/cols3*i,gY+gH);ctx.stroke();}
        for(let i=1;i<3;i++){ctx.beginPath();ctx.moveTo(rx,gY+gH/3*i);ctx.lineTo(rx+rightW,gY+gH/3*i);ctx.stroke();}
      }
      ctx.restore();

    } else {
      // 1 folha — eixo no pilar esquerdo, abre para fora (perspectiva)
      const foldW = gW * Math.cos(fold * Math.PI/2);
      ctx.save();
      ctx.fillStyle = cor.fill;
      ctx.beginPath();
      ctx.moveTo(gX, gY);
      ctx.lineTo(gX + foldW, gY);
      ctx.lineTo(gX + foldW, gY + gH);
      ctx.lineTo(gX, gY + gH);
      ctx.closePath(); ctx.fill();
      if(material !== 'ferro_chapa' && foldW > 10){
        ctx.strokeStyle = cor.grad; ctx.lineWidth = 0.9;
        const cols4 = Math.max(2, Math.round(largura));
        for(let i=1;i<cols4;i++){ctx.beginPath();ctx.moveTo(gX+foldW/cols4*i,gY);ctx.lineTo(gX+foldW/cols4*i,gY+gH);ctx.stroke();}
        for(let i=1;i<3;i++){ctx.beginPath();ctx.moveTo(gX,gY+gH/3*i);ctx.lineTo(gX+foldW,gY+gH/3*i);ctx.stroke();}
      }
      ctx.restore();
    }

    // Motors (braços PPA no topo interno das folhas)
    ctx.fillStyle = OR+'0.92)';
    const mSize = 12;
    if(ctx.roundRect) ctx.roundRect(gX+2,gY+gH/2-mSize/2,mSize,mSize,3); else ctx.rect(gX+2,gY+gH/2-mSize/2,mSize,mSize);
    ctx.fill();
    if(largura >= 2.5){
      if(ctx.roundRect) ctx.roundRect(gX+gW-mSize-2,gY+gH/2-mSize/2,mSize,mSize,3); else ctx.rect(gX+gW-mSize-2,gY+gH/2-mSize/2,mSize,mSize);
      ctx.fill();
    }
  }

  // ─── PORTA DE GARAGEM (basculante) ───
  // Movimento: porta sobe em linha recta, desaparece para dentro do tecto
  else if(tipo === 'garagem'){
    // p=0: fechada (porta visível na vertical)
    // p=1: aberta (porta subiu para dentro do tecto, apenas fundo da garagem visível)

    // A porta sobe linearmente: translação vertical pura, sem rotações
    const rise = gH * p; // quanto já subiu (pixeis)
    // A parte visível da porta vai de (gY + rise) até (gY + gH)
    // Quando rise >= gH a porta está completamente dentro do tecto
    const doorTop  = gY - rise + gH * 0; // topo da porta (sobe)
    const doorBot  = gY + gH - rise;     // base da porta (sobe também)
    const visTop   = Math.max(gY, doorTop);       // clip: parte visível começa em gY
    const visBot   = Math.min(gY + gH, doorBot);  // clip: parte visível termina em gY+gH

    // Trilhos laterais (guias fixas na parede)
    ctx.strokeStyle = OR+'0.28)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(gX-5, gY-12); ctx.lineTo(gX-5, gY+gH+8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gX+gW+5, gY-12); ctx.lineTo(gX+gW+5, gY+gH+8); ctx.stroke();

    // Fundo da garagem (aparece à medida que a porta sobe)
    if(p > 0){
      const interiorH = rise;
      ctx.fillStyle = 'rgba(30,30,35,0.65)';
      ctx.fillRect(gX, gY, gW, Math.min(interiorH, gH));
      // Linha de piso interior
      if(interiorH > 10){
        ctx.strokeStyle = 'rgba(100,100,110,0.3)'; ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(gX, gY + Math.min(interiorH, gH)*0.85);
        ctx.lineTo(gX+gW, gY + Math.min(interiorH, gH)*0.85);
        ctx.stroke();
      }
    }

    // Desenhar a parte visível da porta (sobe em linha recta)
    if(visBot > visTop + 2){
      // Clip: só mostrar entre gY e gY+gH
      ctx.save();
      ctx.beginPath(); ctx.rect(gX, gY, gW, gH); ctx.clip();

      // Porta — posicionada em doorTop (que vai subindo)
      ctx.fillStyle = cor.fill;
      ctx.fillRect(gX, doorTop, gW, gH);

      // Painéis horizontais (seccional)
      if(material !== 'ferro_chapa'){
        ctx.strokeStyle = cor.grad; ctx.lineWidth = 1.2;
        const panels = 4;
        for(let i=1;i<panels;i++){
          const py = doorTop + gH/panels*i;
          ctx.beginPath(); ctx.moveTo(gX, py); ctx.lineTo(gX+gW, py); ctx.stroke();
        }
        // Painéis verticais subtis
        ctx.lineWidth = 0.6;
        const cols6 = Math.max(2, Math.round(largura));
        for(let i=1;i<cols6;i++){
          ctx.beginPath(); ctx.moveTo(gX+gW/cols6*i, doorTop); ctx.lineTo(gX+gW/cols6*i, doorTop+gH); ctx.stroke();
        }
      }
      ctx.restore();
    }

    // Motor/accionador (fixo no tecto, não se move)
    ctx.fillStyle = OR+'0.90)';
    const motorX = gX + gW/2 - 8;
    if(ctx.roundRect) ctx.roundRect(motorX, gY-14, 16, 12, 3);
    else ctx.rect(motorX, gY-14, 16, 12);
    ctx.fill();

    // Cabo do motor (linha do motor à porta)
    if(p < 0.95){
      const cableY = Math.max(gY, doorTop + 4);
      ctx.strokeStyle = OR+'0.35)'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(gX + gW/2, gY - 2);
      ctx.lineTo(gX + gW/2, cableY);
      ctx.stroke();
    }
  }

  // Dimensões
  ctx.fillStyle = 'rgba(150,150,150,0.7)';
  ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(largura.toFixed(1)+'m', gX+gW/2, gY+gH+20);
  ctx.save();
  ctx.translate(gX-14, gY+gH/2);
  ctx.rotate(-Math.PI/2);
  ctx.fillText(altura.toFixed(1)+'m', 0, 0);
  ctx.restore();
}

function calcAnimar(canvasId){
  if(_calcAnimFrame){ cancelAnimationFrame(_calcAnimFrame); _calcAnimFrame=null; }
  _calcAnimProg = 0; _calcAnimDir = 1;
  function tick(){
    calcDesenharPortao(canvasId, CSIM.tipo, CSIM.material, CSIM.largura, CSIM.altura, _calcAnimProg);
    _calcAnimProg += _calcAnimDir * 0.014;
    if(_calcAnimProg >= 1){ _calcAnimProg=1; _calcAnimDir=-1; }
    else if(_calcAnimProg <= 0){
      _calcAnimDir = 1;
      // Pausa antes de recomeçar
      setTimeout(()=>{ _calcAnimFrame = requestAnimationFrame(tick); }, 800);
      return;
    }
    _calcAnimFrame = requestAnimationFrame(tick);
  }
  _calcAnimFrame = requestAnimationFrame(tick);
}

function calcStopAnim(){
  if(_calcAnimFrame){ cancelAnimationFrame(_calcAnimFrame); _calcAnimFrame=null; }
}

// ── Preview nos cards do passo 1 ──
function calcDesenharPreviews(){
  [
    {id:'ct-cv-correr',   tipo:'correr'},
    {id:'ct-cv-batente',  tipo:'batente'},
    {id:'ct-cv-garagem',  tipo:'garagem'},
  ].forEach(({id, tipo})=>{
    const cv = document.getElementById(id);
    if(!cv) return;
    calcDesenharPortao(id, tipo, 'ferro_gradil', 3, 1.8, 0.4);
  });
}

// ── Navegação ──
function calcIrPasso(n){
  ['cp1','cp2','cp3','cp4'].forEach((id,i)=>{
    document.getElementById(id)?.classList.toggle('on', i===n-1);
  });
  const progs = {1:8, 2:38, 3:70, 4:100};
  const fill = document.getElementById('cpf');
  if(fill) fill.style.width = (progs[n]||8)+'%';

  for(let i=1;i<=4;i++){
    const dot = document.getElementById('csd'+i);
    if(!dot) continue;
    if(i < n){ dot.className='csd done'; dot.querySelector('span').textContent='✓'; }
    else if(i===n){ dot.className='csd on'; dot.querySelector('span').textContent=i<4?String(i):'✓'; }
    else{ dot.className='csd'; dot.querySelector('span').textContent=i<4?String(i):'✓'; }
    const line = document.getElementById('csl'+i);
    if(line) line.className='csd-line'+(i<n?' done':'');
  }

  if(n===2){
    setTimeout(()=>{
      calcDesenharPortao('calc-anim', CSIM.tipo, CSIM.material||'ferro_gradil', CSIM.largura, CSIM.altura, 0);
    },50);
  }
  if(n===3) calcStopAnim();
  if(n===4){
    calcMostrarResultado();
    setTimeout(()=>calcAnimar('calc-anim-res'), 300);
  }
}

function calcTipo(tipo, btn){
  CSIM.tipo = tipo;
  document.querySelectorAll('.ct-btn').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  setTimeout(()=>calcIrPasso(2), 220);
}

function calcMaterial(mat, btn){
  CSIM.material = mat;
  document.querySelectorAll('.cm-btn').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  calcAtualizaDims();
  const next = document.getElementById('calc-next2');
  if(next){ next.disabled=false; }
  // Animar portão
  calcAnimar('calc-anim');
}

function calcAtualizaDims(){
  const l = parseFloat(document.getElementById('sl-larg')?.value||3);
  const h = parseFloat(document.getElementById('sl-alt')?.value||1.8);
  CSIM.largura = l; CSIM.altura = h;
  const lv = document.getElementById('sl-larg-val');
  const hv = document.getElementById('sl-alt-val');
  if(lv) lv.textContent = l.toFixed(1).replace('.',',')+' m';
  if(hv) hv.textContent = h.toFixed(1).replace('.',',')+' m';
  if(CSIM.material){
    const p = Math.round(l * h * (DENS[CSIM.material]||25));
    const chip = document.getElementById('cpc-val');
    if(chip) chip.textContent = p + ' kg (est.)';
  }
  calcDesenharPortao('calc-anim', CSIM.tipo, CSIM.material||'ferro_gradil', l, h, 0.3);
}

function calcUso(uso, btn){
  CSIM.uso = uso;
  document.querySelectorAll('.cu-btn').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  setTimeout(()=>calcIrPasso(4), 220);
}

function calcMostrarResultado(){
  const motor = calcGetMotor();
  if(!motor){ calcReset(); return; }

  const tipoNome = {correr:'Portão de correr', batente:'Portão de batente', garagem:'Porta de garagem'};

  document.getElementById('cr-motor').textContent = motor.nome;
  document.getElementById('cr-badge').textContent = '✅ Motor recomendado';

  // Specs chips
  const specsEl = document.getElementById('cr-specs');
  if(specsEl) specsEl.innerHTML = motor.specs.filter(Boolean).map(s=>`<span class="crs-chip">${s}</span>`).join('');

  document.getElementById('cr-why').textContent = motor.why;

  // Acessórios
  const acessEl = document.getElementById('cr-acess');
  if(acessEl && motor.acess?.length){
    acessEl.innerHTML = '<div class="calc-res-acess-t">Acessórios recomendados</div><div class="calc-res-acess-tags">'+
      motor.acess.map(a=>`<span class="cra-tag">${a}</span>`).join('')+'</div>';
  }

  // Resumo
  document.getElementById('crr-tipo').textContent = tipoNome[CSIM.tipo]||CSIM.tipo;
  document.getElementById('crr-dims').textContent = CSIM.largura.toFixed(1)+'m × '+CSIM.altura.toFixed(1)+'m';
  document.getElementById('crr-mat').textContent = DENS_NOME[CSIM.material]||CSIM.material;
  const pesoTxt = motor.infoFolha
    ? motor.pesoEst+' kg/folha (est.)'
    : motor.pesoEst+' kg (est.)';
  document.getElementById('crr-peso').textContent = pesoTxt;
  document.getElementById('crr-uso').textContent = CSIM.uso==='residencial'?'Residencial':'Intensivo';

  // WhatsApp pré-preenchido
  const msg = `Olá! Usei o simulador do site Oeste Automatismos e preciso de informação sobre o motor ${motor.nome}.`
    +`\n\nPortão: ${tipoNome[CSIM.tipo]||CSIM.tipo}`
    +`\nDimensões: ${CSIM.largura.toFixed(1)}m × ${CSIM.altura.toFixed(1)}m`
    +`\nMaterial: ${DENS_NOME[CSIM.material]||CSIM.material}`
    +`\nPeso estimado: ${motor.pesoEst} kg`
    +`\nUso: ${CSIM.uso==='residencial'?'Residencial':'Intensivo'}`
    +`\n\nPosso pedir orçamento?`;
  const wa = document.getElementById('cr-wa');
  if(wa) wa.href = 'https://wa.me/351926961099?text='+encodeURIComponent(msg);
}

function calcReset(){
  CSIM.tipo=null; CSIM.material=null; CSIM.uso=null; CSIM.largura=3; CSIM.altura=1.8;
  calcStopAnim();
  const sl = document.getElementById('sl-larg'); if(sl) sl.value=3;
  const sa = document.getElementById('sl-alt'); if(sa) sa.value=1.8;
  const next = document.getElementById('calc-next2'); if(next) next.disabled=true;
  const chip = document.getElementById('cpc-val'); if(chip) chip.textContent='—';
  document.querySelectorAll('.ct-btn,.cm-btn,.cu-btn').forEach(b=>b.classList.remove('sel'));
  calcIrPasso(1);
  setTimeout(calcDesenharPreviews, 100);
}

// Inicializar previews quando a secção estiver visível
document.addEventListener('DOMContentLoaded', ()=>{
  setTimeout(calcDesenharPreviews, 500);
});
if(document.readyState==='complete'||document.readyState==='interactive'){
  setTimeout(calcDesenharPreviews, 600);
}

/* ════════════════════ PARTILHA DE PRODUTOS ════════════════════ */
function abrirPartilha(produtoId){
  const produtos = window.__produtosLoja || [];
  const p = produtos.find(x => x.id === produtoId);
  if(!p){ console.warn('Produto não encontrado para partilha:', produtoId); return; }

  // Calcular preço atual (com promo se aplicável)
  const precoBase = p.preco_sem_iva || 0;
  const precoIvaBase = p.preco_com_iva || (precoBase * 1.23);
  const agora = new Date();
  const inicio = p.promo_inicio ? new Date(p.promo_inicio) : null;
  const fim = p.promo_fim ? new Date(p.promo_fim) : null;
  if (fim && p.promo_fim && p.promo_fim.length <= 10) fim.setHours(23,59,59,999);
  const promoOn = p.promo_ativa && p.promo_desconto_pct > 0
    && (!inicio || agora >= inicio) && (!fim || agora <= fim);
  const precoFinal = promoOn ? precoBase * (1 - Number(p.promo_desconto_pct)/100) : precoBase;
  const precoIvaFinal = promoOn ? precoIvaBase * (1 - Number(p.promo_desconto_pct)/100) : precoIvaBase;

  // URL canónica do produto (link para a loja com âncora)
  const baseUrl = location.origin + location.pathname.replace(/\/(index\.html)?$/, '/');
  const urlProduto = baseUrl + 'index.html#produto-' + p.id;

  // Texto da partilha
  const linhas = [];
  linhas.push('🛒 ' + p.nome + ' — ' + (p.marca || 'PPA'));
  if(promoOn){
    linhas.push('🔥 PROMOÇÃO: ' + precoBase.toFixed(2) + '€ → ' + precoFinal.toFixed(2) + '€ s/IVA');
    linhas.push('   (' + precoIvaFinal.toFixed(2) + '€ c/IVA)');
  } else {
    linhas.push('💶 ' + precoFinal.toFixed(2) + '€ s/IVA · ' + precoIvaFinal.toFixed(2) + '€ c/IVA');
  }
  if(p.descricao) linhas.push('\n' + p.descricao.substring(0, 140) + (p.descricao.length > 140 ? '...' : ''));
  linhas.push('\n' + urlProduto);
  linhas.push('\nOeste Automatismo · oesteautomatismo.com');
  const texto = linhas.join('\n');
  const textoUrlEnc = encodeURIComponent(texto);
  const urlEnc = encodeURIComponent(urlProduto);

  // Construir overlay
  let ov = document.getElementById('partilha-overlay');
  if(ov) ov.remove();
  ov = document.createElement('div');
  ov.id = 'partilha-overlay';
  ov.className = 'partilha-ov';
  ov.innerHTML = `
    <div class="partilha-bx" onclick="event.stopPropagation()">
      <div class="partilha-hd">
        <div>
          <div class="partilha-tit">Partilhar produto</div>
          <div class="partilha-sub">${p.nome}</div>
        </div>
        <button class="partilha-x" onclick="fecharPartilha()" aria-label="Fechar">✕</button>
      </div>
      <div class="partilha-grid">
        <a class="partilha-btn pbt-wa" href="https://wa.me/?text=${textoUrlEnc}" target="_blank" rel="noopener" onclick="fecharPartilha()">
          <div class="partilha-ico" style="background:#25D366">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.549 4.116 1.512 5.85L.057 23.04a.75.75 0 0 0 .906.906l5.19-1.455A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 0 1-4.952-1.352l-.356-.213-3.683 1.032 1.033-3.683-.213-.356A9.75 9.75 0 1 1 12 21.75z"/></svg>
          </div>
          <span>WhatsApp</span>
        </a>
        <a class="partilha-btn pbt-fb" href="https://www.facebook.com/sharer/sharer.php?u=${urlEnc}&quote=${textoUrlEnc}" target="_blank" rel="noopener" onclick="fecharPartilha()">
          <div class="partilha-ico" style="background:#1877F2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </div>
          <span>Facebook</span>
        </a>
        <button class="partilha-btn pbt-ig" type="button" onclick="partilharInstagram(${p.id})">
          <div class="partilha-ico" style="background:linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </div>
          <span>Instagram</span>
        </button>
        <button class="partilha-btn pbt-cp" type="button" onclick="partilharCopiar(${p.id})">
          <div class="partilha-ico" style="background:#1F2937">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </div>
          <span>Copiar link</span>
        </button>
      </div>
      <div class="partilha-link">
        <input type="text" id="partilha-url-input" value="${urlProduto}" readonly onclick="this.select()">
      </div>
    </div>
  `;
  ov.addEventListener('click', fecharPartilha);
  document.body.appendChild(ov);
  // Forçar reflow para animação
  requestAnimationFrame(()=> ov.classList.add('show'));
  // Guardar dados para usos seguintes
  window.__partilhaDados = { texto, urlProduto, produto: p };
}

function fecharPartilha(){
  const ov = document.getElementById('partilha-overlay');
  if(!ov) return;
  ov.classList.remove('show');
  setTimeout(()=> ov.remove(), 200);
}

function partilharCopiar(produtoId){
  const dados = window.__partilhaDados;
  if(!dados) return;
  const tex = dados.texto;
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(tex).then(()=>{
      partilhaToast('✓ Link e texto copiados — cola onde quiseres');
    }).catch(()=> _copiarFallback(tex));
  } else {
    _copiarFallback(tex);
  }
}
function _copiarFallback(tex){
  const ta = document.createElement('textarea');
  ta.value = tex; ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); partilhaToast('✓ Texto copiado'); }
  catch(e){ partilhaToast('Não foi possível copiar — selecciona manualmente'); }
  document.body.removeChild(ta);
}

function partilharInstagram(produtoId){
  // Instagram não tem API web de partilha directa.
  // Estratégia: tentar Web Share API (no telemóvel mostra o Instagram entre as opções),
  // e em paralelo copiar o texto para o clipboard para colar no Instagram.
  const dados = window.__partilhaDados;
  if(!dados) return;

  // Copiar texto para clipboard primeiro
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(dados.texto).catch(()=>{});
  }

  // No telemóvel: tentar Web Share API
  if(navigator.share){
    navigator.share({
      title: dados.produto.nome,
      text: dados.texto,
      url: dados.urlProduto
    }).then(()=> fecharPartilha())
      .catch(()=>{
        // Utilizador cancelou ou erro — mostrar instruções
        partilhaToast('Texto copiado — abre o Instagram e cola na publicação ou story');
      });
  } else {
    // Desktop: não há partilha directa para Instagram, abrir Instagram numa nova tab
    partilhaToast('Texto copiado — cola no Instagram');
    setTimeout(()=> window.open('https://www.instagram.com/', '_blank'), 800);
  }
}

function partilhaToast(msg){
  let t = document.getElementById('partilha-toast');
  if(t) t.remove();
  t = document.createElement('div');
  t.id = 'partilha-toast';
  t.className = 'partilha-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=> t.classList.add('show'));
  setTimeout(()=>{
    t.classList.remove('show');
    setTimeout(()=> t.remove(), 300);
  }, 2800);
}

/* ════════════════════ COUNTDOWN PROMOÇÕES ════════════════════ */
function formatarTempoRestante(ms){
  if(ms <= 0) return null;
  const seg = Math.floor(ms/1000);
  const min = Math.floor(seg/60);
  const horas = Math.floor(min/60);
  const dias = Math.floor(horas/24);

  if(dias >= 2){
    return `Termina em ${dias}d ${horas % 24}h`;
  }
  if(dias === 1){
    return `Termina em 1d ${horas % 24}h`;
  }
  if(horas >= 1){
    return `Termina em ${horas}h ${min % 60}m`;
  }
  if(min >= 1){
    return `Termina em ${min}m`;
  }
  return `Termina em ${seg}s`;
}

function actualizarCountdownsPromo(){
  const timers = document.querySelectorAll('.pc-promo-timer');
  if(!timers.length) return;
  const agora = Date.now();
  let algumExpirou = false;
  timers.forEach(t => {
    const fim = parseInt(t.getAttribute('data-fim'), 10);
    if(!fim) return;
    const restante = fim - agora;
    const txt = t.querySelector('.pc-promo-timer-txt');
    if(restante <= 0){
      // Promo expirou — marcar para recarregar
      algumExpirou = true;
      if(txt) txt.textContent = 'Promoção terminada';
      t.classList.add('expirado');
    } else {
      if(txt) txt.textContent = formatarTempoRestante(restante);
      // Pulsar mais forte se faltar menos de 24h
      if(restante < 24*60*60*1000){
        t.classList.add('urgente');
      }
    }
  });
  // Se alguma promo expirou, recarregar produtos para atualizar UI
  if(algumExpirou){
    if(typeof carregarProdutos === 'function'){
      setTimeout(()=> carregarProdutos(), 1500);
    }
  }
}

// Iniciar o ciclo de actualização — corre a cada 30 segundos
let _promoTimerInterval = null;
function iniciarCountdownPromos(){
  // Actualizar imediatamente
  actualizarCountdownsPromo();
  // Limpar interval anterior se existir (em caso de re-render)
  if(_promoTimerInterval) clearInterval(_promoTimerInterval);
  _promoTimerInterval = setInterval(actualizarCountdownsPromo, 30000); // a cada 30s
}

// Auto-iniciar quando os produtos carregarem
document.addEventListener('DOMContentLoaded', ()=>{
  // Iniciar após pequeno delay para garantir que os cards já foram renderizados
  setTimeout(iniciarCountdownPromos, 1500);
});
// Re-iniciar sempre que os produtos forem recarregados
const _origCarregar = typeof carregarProdutos === 'function' ? carregarProdutos : null;
if(_origCarregar){
  carregarProdutos = async function(){
    const r = await _origCarregar.apply(this, arguments);
    setTimeout(iniciarCountdownPromos, 300);
    return r;
  };
}
