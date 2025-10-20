const Storage = {
  getUsers(){ return JSON.parse(localStorage.getItem('ps_users')||'[]'); },
  saveUsers(u){ localStorage.setItem('ps_users', JSON.stringify(u)); },
  getPurchases(){ return JSON.parse(localStorage.getItem('ps_purchases')||'[]'); },
  savePurchases(p){ localStorage.setItem('ps_purchases', JSON.stringify(p)); },
  setCurrent(email){ localStorage.setItem('ps_current', email); },
  getCurrent(){ return localStorage.getItem('ps_current'); },
  clearCurrent(){ localStorage.removeItem('ps_current'); }
};

function isEmailValid(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function nameValid(name){
  return /^[A-Za-z\s]{3,32}$/.test(name);
}
function phoneValid(phone){
  return /^08\d{8,14}$/.test(phone);
}

function readFilesAndPreview(inputEl, previewContainer){
  const files = Array.from(inputEl.files);
  previewContainer.innerHTML = '';
  files.forEach(f=>{
    const reader = new FileReader();
    reader.onload = e=>{
      const img = document.createElement('img');
      img.src = e.target.result;
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(f);
  });
}

function requireLogin(redirectTo='index.html'){
  const cur = Storage.getCurrent();
  if(!cur){ window.location.href = redirectTo; return null;}
  const users = Storage.getUsers();
  return users.find(u=>u.email===cur);
}

function formatIDR(v){
  return 'Rp' + Number(v).toLocaleString('id-ID');
}
