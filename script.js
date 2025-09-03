
// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    if(!id) return;
    const el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

const form = document.getElementById('order-form');
const progressBox = document.getElementById('progress');
const barInner = document.getElementById('bar-inner');
const progressPct = document.getElementById('progress-pct');
const progressText = document.getElementById('progress-text');
const resultBox = document.getElementById('order-result');
const orderIdEl = document.getElementById('order-id');
const checkBtn = document.getElementById('check-status');

function simulateProgress(cb){
  progressBox.classList.remove('hidden');
  resultBox.classList.add('hidden');
  let pct = 0;
  const steps = [
    'Khởi tạo đơn...',
    'Xác thực username...',
    'Đưa vào hàng đợi...',
    'Kết nối nhà cung cấp...',
    'Hoàn tất!'
  ];
  let step = 0;
  const timer = setInterval(()=>{
    pct += Math.random()*14+4; // 4-18%
    if(pct>=100){pct=100;}
    barInner.style.width = pct+'%';
    progressPct.textContent = Math.floor(pct)+'%';
    if(pct>=(step+1)*20 && step<steps.length){ progressText.textContent = steps[step++]; }
    if(pct===100){ clearInterval(timer); cb && cb(); }
  }, 350);
}

async function callFunction(name, payload){
  try{
    const res = await fetch('/.netlify/functions/'+name, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)});
    if(res.ok){ return await res.json(); }
    throw new Error('HTTP '+res.status);
  }catch(err){
    // If functions are not enabled (manual drag&drop), fall back to demo
    return null;
  }
}

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const pkg = document.getElementById('package').value;
  if(!/^[A-Za-z0-9._]{2,24}$/.test(username)){
    alert('Username không hợp lệ. Chỉ gồm chữ, số, dấu chấm hoặc gạch dưới (2–24 ký tự).');
    return;
  }
  simulateProgress(async ()=>{
    const resp = await callFunction('create-order', { username, pkg });
    const orderId = (resp && resp.orderId) || ('DEMO-' + Math.random().toString(36).slice(2,8).toUpperCase());
    orderIdEl.textContent = orderId;
    progressBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
  });
});

checkBtn.addEventListener('click', async ()=>{
  const id = orderIdEl.textContent || 'DEMO';
  const resp = await callFunction('check-order', { orderId: id });
  alert(resp ? ('Trạng thái đơn '+id+': '+resp.status) : 'Chế độ demo: đơn đã hoàn tất (giả lập).');
});
