for(const group of document.querySelectorAll('[role=tablist]')){
 const tabs=[...group.querySelectorAll('[role=tab]')];
 const activate=t=>{for(const b of tabs){const chosen=b===t;b.setAttribute('aria-selected',chosen);b.tabIndex=chosen?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!chosen;}};
 for(const t of tabs){t.addEventListener('click',()=>activate(t));t.addEventListener('keydown',e=>{let n=tabs.indexOf(t);if(e.key==='ArrowRight')n++;else if(e.key==='ArrowLeft')n--;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();const next=tabs[(n+tabs.length)%tabs.length];activate(next);next.focus();});}
 activate(tabs[0]);
}
let toastTimer;
const status=document.getElementById('copy-status');
for(const b of document.querySelectorAll('[data-copy]'))b.addEventListener('click',async()=>{
 const value=b.dataset.copy;
 try{await navigator.clipboard.writeText(value);status.textContent='Copied '+value;clearTimeout(toastTimer);toastTimer=setTimeout(()=>status.textContent='',3500);}
 catch{const d=document.getElementById('manual-copy');d.querySelector('textarea').value=value;d.showModal();d.querySelector('textarea').select();}
});
const close=document.querySelector('#manual-copy button');if(close)close.addEventListener('click',()=>document.getElementById('manual-copy').close());
for(const c of document.querySelectorAll('[data-check]')){const k='odyssey-0.2.0-'+c.dataset.check;try{c.checked=localStorage.getItem(k)==='true';}catch{}c.addEventListener('change',()=>{try{localStorage.setItem(k,String(c.checked));}catch{}});}
const q=document.getElementById('q'),category=document.getElementById('category');
if(q&&category){const rows=[...document.querySelectorAll('#catalogue-table tbody tr')];const filter=()=>{let n=0;for(const r of rows){const visible=r.textContent.toLowerCase().includes(q.value.trim().toLowerCase())&&(!category.value||r.cells[0].textContent===category.value);r.hidden=!visible;if(visible)n++;}document.getElementById('total').textContent=n+' of '+rows.length+' entries';document.getElementById('empty').hidden=n>0;};q.addEventListener('input',filter);category.addEventListener('change',filter);document.getElementById('clear-search').addEventListener('click',()=>{q.value='';category.value='';filter();q.focus();});filter();}

