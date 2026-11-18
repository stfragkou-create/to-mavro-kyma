const startOrder=[8,3,5,2,4,7,1,6];
let pool=[],positions=[],selected=null,dragged=null;
const cardArea=document.getElementById('cards'),slotArea=document.getElementById('slots'),status=document.getElementById('status');
function card(n){const b=document.createElement('button');b.type='button';b.className='card'+(selected===n?' selected':'');b.draggable=true;b.setAttribute('aria-label','Κάρτα με εικόνα και κείμενο, επιλογή για μετακίνηση');b.innerHTML='<span class="grab" aria-hidden="true">Σύρε</span><img src="assets/karta_'+n+'.jpg" alt="Εικόνα και κείμενο της περίληψης">';b.addEventListener('click',()=>{selected=selected===n?null:n;render()});b.addEventListener('dragstart',e=>{dragged=n;e.dataTransfer.setData('text/plain',String(n))});return b}
function drawSlot(n,i){let s=document.createElement('button');s.type='button';s.className='slot'+(n!==null?' filled':'');s.setAttribute('aria-label','Θέση '+(i+1)+(n!==null?', έχει κάρτα':' — κενή'));s.innerHTML='<b>'+(i+1)+'</b>'+(n!==null?'<img src="assets/karta_'+n+'.jpg" alt="Τοποθετημένη κάρτα">':'<span>Τοποθέτησε εδώ</span>');s.addEventListener('click',()=>place(i));s.addEventListener('dragover',e=>e.preventDefault());s.addEventListener('drop',e=>{e.preventDefault();if(dragged!==null){selected=dragged;place(i);dragged=null}});return s}
function render(){cardArea.replaceChildren(...pool.map(card));slotArea.replaceChildren(...positions.map(drawSlot))}
function place(i){if(selected===null){if(positions[i]!==null){selected=positions[i];positions[i]=null;pool.push(selected);status.textContent='Η κάρτα επέστρεψε επάνω. Διάλεξε μια θέση για να την τοποθετήσεις ξανά.';render()}return}
// Επιτρέπεται να μετακινηθεί κάρτα και από μια ήδη γεμάτη θέση.
let previous=positions[i];let oldIndex=positions.indexOf(selected);if(oldIndex>=0)positions[oldIndex]=null;
pool=pool.filter(n=>n!==selected);positions[i]=selected;if(previous!==null&&previous!==selected)pool.push(previous);
selected=null;status.textContent='';render()}
function reset(){pool=startOrder.slice();positions=Array(8).fill(null);selected=null;dragged=null;status.textContent='';render()}
document.getElementById('reset').addEventListener('click',reset);
document.getElementById('check').addEventListener('click',()=>{if(positions.some(n=>n===null)){status.textContent='Συμπλήρωσε πρώτα και τις οκτώ θέσεις.';status.style.color='#ffe2a9';return}const ok=positions.every((n,i)=>n===i+1);status.textContent=ok?'Μπράβο! Έβαλες την ιστορία στη σωστή σειρά!':'Η σειρά δεν είναι ακόμη σωστή. Δοκίμασε ξανά!';status.style.color=ok?'#b5ffbc':'#ffe2a9'});
document.getElementById('hint').addEventListener('click',()=>{const i=positions.findIndex((n,i)=>n!==i+1);status.textContent=i<0?'Όλες οι κάρτες είναι στη σωστή θέση!':'Υπόδειξη: η θέση '+(i+1)+' χρειάζεται άλλη εικόνα.';status.style.color='#ffe2a9'});
reset();