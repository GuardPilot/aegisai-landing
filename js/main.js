document.addEventListener('DOMContentLoaded',() => {
  const header = document.querySelector('header');
  function onScroll(){
    if(window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const toast = document.getElementById('toast');
  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),4000);
  }

  function checkDeck(e){
    const url = e.currentTarget.getAttribute('href');
    fetch(url,{method:'HEAD'}).then(res=>{
      if(!res.ok){
        e.preventDefault();
        showToast('File temporarily unavailable. Please contact us via Telegram or Email.');
      }
    }).catch(()=>{
      e.preventDefault();
      showToast('File temporarily unavailable. Please contact us via Telegram or Email.');
    });
  }
  document.querySelectorAll('.download-deck').forEach(btn => btn.addEventListener('click', checkDeck));

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      status.textContent = '';
      if(!form.checkValidity()){
        status.textContent = 'Please fill in required fields.';
        return;
      }
      const data = new FormData(form);
      const email = data.get('email');
      const name = data.get('name') || '';
      const message = data.get('message');
      const mailto = `mailto:2025pilot.guard@gmail.com?subject=AegisAI%20Contact%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(email)}`;
      window.location.href = mailto;
      status.textContent = 'Message composed in your email client.';
      form.reset();
    });
  }

  const privacyLink = document.getElementById('privacy-link');
  const privacyDialog = document.getElementById('privacy-dialog');
  const closePrivacy = document.getElementById('close-privacy');
  privacyLink.addEventListener('click', e => { e.preventDefault(); privacyDialog.showModal(); });
  closePrivacy.addEventListener('click', () => privacyDialog.close());
});
