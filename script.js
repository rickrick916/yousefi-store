const products=[
 {id:1,name:'آیفون ۱۵ پرو مکس',cat:'موبایل',price:84900000,image:'https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_15_Pro_Max.jpg?width=1800',discount:'۱۲٪',reviews:52},
 {id:2,name:'Samsung Galaxy S24 Ultra',cat:'موبایل',price:68900000,image:'https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_Galaxy_S24_Ultra_2024.jpg?width=1800',discount:'۸٪',reviews:68},
 {id:3,name:'Apple AirPods Pro 2',cat:'هدفون',price:8490000,image:'https://commons.wikimedia.org/wiki/Special:FilePath/AirPods_Pro_(2nd_generation).jpg?width=1800',discount:'۱۵٪',reviews:76},
 {id:4,name:'Samsung Galaxy Watch 6',cat:'ساعت',price:17900000,image:'assets/watch.jpg',discount:'۱۰٪',reviews:44},
 {id:5,name:'MacBook Air M2 Midnight',cat:'لپ‌تاپ',price:58900000,image:'https://commons.wikimedia.org/wiki/Special:FilePath/M2_Macbook_Air_Midnight_model_-_1.jpg?width=1800',discount:'۷٪',reviews:61},
 {id:6,name:'Logitech MX Keys',cat:'لوازم جانبی',price:6290000,image:'https://commons.wikimedia.org/wiki/Special:FilePath/Logitech_MX_Keys_YR0073_Wireless_Keyboard.jpg?width=1800',discount:'۶٪',reviews:27},
 {id:7,name:'PlayStation 5',cat:'پلی استیشن',price:37900000,image:'https://commons.wikimedia.org/wiki/Special:FilePath/Playstation_5.jpg?width=1800',discount:'۵٪',reviews:58},
 {id:13,name:'دسته بازی Sony DualSense',cat:'دسته بازی',price:5490000,image:'https://commons.wikimedia.org/wiki/Special:FilePath/Playstation_DualSense_Controller.png?width=1800',discount:'۶٪',reviews:47},
 {id:8,name:'لپ‌تاپ گیمینگ ASUS TUF F15',cat:'لپ‌تاپ',price:38900000,image:'assets/tuf.jpg',discount:'۵٪',reviews:23},
 {id:9,name:'Xiaomi 14T',cat:'موبایل',price:26900000,image:'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329938/xiaomi-14t-xanh-1-638635698803786884.jpg',discount:'۶٪',reviews:72},
 {id:10,name:'Samsung Galaxy A54',cat:'موبایل',price:14900000,image:'assets/a54.jpg',discount:'۹٪',reviews:64},
 {id:11,name:'MacBook Air M2',cat:'لپ‌تاپ',price:58900000,image:'https://commons.wikimedia.org/wiki/Special:FilePath/M2_Macbook_Air_Midnight_model_-_1.jpg?width=1800',discount:'۷٪',reviews:31},
 {id:12,name:'Samsung Galaxy Watch 6',cat:'ساعت',price:17900000,image:'assets/watch.jpg',discount:'',reviews:40},
 {id:14,name:'Logitech M186 Mouse',cat:'لوازم جانبی',price:2190000,image:'https://commons.wikimedia.org/wiki/Special:FilePath/Logitech_M186_Mouse.jpg?width=1800',discount:'۸٪',reviews:38},
 {id:15,name:'UGREEN USB-C Hub 7-in-1',cat:'لوازم جانبی',price:3290000,image:'https://m.media-amazon.com/images/S/aplus-media-library-service-media/3de6b33b-c7e5-48cb-99c2-a8d1649c9a5c.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',discount:'۵٪',reviews:21},
 {id:16,name:'Samsung 25W Charger',cat:'لوازم جانبی',price:1490000,image:'https://f.nooncdn.com/p/pzsku/Z1C88DCAE724D4EAC1E9BZ/45/_/1717986905/df4a1212-51b0-479a-9f1d-70aa4fd39091.jpg',discount:'۱۰٪',reviews:34},
 {id:17,name:'Power Bank 20000mAh',cat:'لوازم جانبی',price:2890000,image:'https://f.nooncdn.com/p/pzsku/Z7C6D44D56483CEA9D9DEZ/45/_/1721295867/ac948700-6f6b-43ed-9096-4394f4512fd7.jpg',discount:'۷٪',reviews:29},
 {id:18,name:'کابل USB-C به USB-C',cat:'لوازم جانبی',price:890000,image:'https://m.media-amazon.com/images/I/31JEPMu2hXL._SL500_.jpg',discount:'',reviews:18}
];
let cart=JSON.parse(localStorage.getItem('yousefiCart')||'[]');
const fa=n=>new Intl.NumberFormat('fa-IR').format(n);
function productCard(p){
 return `<article class="product-card">
   ${p.discount?`<span class="discount">${p.discount}</span>`:''}
   <button class="product-img" onclick="openDetail(${p.id})" aria-label="مشاهده ${p.name}"><img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async"></button>
   <div class="product-cat">${p.cat}</div><h4>${p.name}</h4><div class="rating">★★★★★ <span>(${p.reviews})</span></div>
   <div class="card-bottom"><div class="price">${fa(p.price)} <small>تومان</small></div><button class="add-btn" onclick="addToCart(${p.id})" aria-label="افزودن به سبد">🛒</button></div>
 </article>`
}
function renderProducts(list=products){document.querySelector('#allProducts').innerHTML=list.map(productCard).join('');document.querySelector('#resultText').textContent=`${fa(list.length)} محصول`;}
function renderHome(){document.querySelector('#homeProducts').innerHTML=products.slice(0,4).map(productCard).join('')}
function updateCount(){document.querySelector('#cartCount').textContent=fa(cart.reduce((s,x)=>s+x.qty,0));localStorage.setItem('yousefiCart',JSON.stringify(cart))}
function addToCart(id){let item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});updateCount();showToast('محصول به سبد خرید اضافه شد');}
function removeCart(id){cart=cart.filter(x=>x.id!==id);updateCount();renderCart()}
function changeQty(id,d){let x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)removeCart(id);else{updateCount();renderCart()}}
function renderCart(){
 const el=document.querySelector('#cartContent');
 if(!cart.length){el.innerHTML=`<div class="cart-card" style="text-align:center;padding:60px"><div style="font-size:60px">🛒</div><h3>سبد خرید شما خالی است</h3><button class="primary-btn" data-page="products">مشاهده محصولات</button></div>`;bindPageButtons();return}
 let total=0; const rows=cart.map(x=>{let p=products.find(q=>q.id===x.id);total+=p.price*x.qty;return `<div class="cart-row"><div class="cart-thumb"><img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async"></div><div><b>${p.name}</b><small style="display:block;color:#888">${p.cat}</small></div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${fa(x.qty)}</b><button onclick="changeQty(${p.id},1)">+</button></div><b>${fa(p.price*x.qty)} تومان</b><button class="remove" onclick="removeCart(${p.id})">🗑️</button></div>`}).join('');
 el.innerHTML=`<div class="cart-card">${rows}<div class="cart-summary"><div>مبلغ نهایی: <span class="total">${fa(total)} تومان</span></div><button class="primary-btn" onclick="showToast('سفارش شما با موفقیت ثبت شد')">ادامه و ثبت سفارش ←</button></div></div>`;
}
function openDetail(id){const p=products.find(x=>x.id===id);document.querySelector('#detailName').textContent=p.name;document.querySelector('#detailIcon').innerHTML=`<img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">`;document.querySelector('#detailPrice').textContent=`${fa(p.price)} تومان`;document.querySelector('#detailAdd').onclick=()=>addToCart(p.id);go('detail')}
function go(id){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.querySelector('#'+id).classList.add('active');document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page===id));window.scrollTo({top:0,behavior:'smooth'});if(id==='products')renderProducts();if(id==='cart')renderCart()}
function bindPageButtons(){document.querySelectorAll('[data-page]').forEach(x=>{x.onclick=()=>go(x.dataset.page)})}
function showToast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove('show'),2400)}
document.querySelector('#searchInput').addEventListener('input',e=>{const q=e.target.value.trim();go('products');const list=products.filter(p=>(p.name+p.cat).includes(q));renderProducts(list)});
document.querySelectorAll('.filter-cat').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter-cat').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;renderProducts(f==='همه'?products:products.filter(p=>p.cat===f))});
document.querySelectorAll('.category-card').forEach(b=>b.onclick=()=>{go('products');const f=b.dataset.cat;const list=f==='گیمینگ'?products.filter(p=>['پلی استیشن','دسته بازی'].includes(p.cat)):products.filter(p=>p.cat.includes(f.replace('لوازم جانبی',''))||p.cat===f);renderProducts(list)});
document.querySelector('#priceRange').addEventListener('input',e=>{document.querySelector('#priceValue').textContent=fa(+e.target.value/1000000)+' میلیون';renderProducts(products.filter(p=>p.price<=+e.target.value))});
bindPageButtons();renderHome();renderProducts();renderBest();updateCount();
const modal=document.querySelector('#introModal');document.querySelector('#closeModal').onclick=()=>modal.classList.add('hidden');document.querySelector('#enterStore').onclick=()=>modal.classList.add('hidden');
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.add('hidden')});

function renderBest(){document.querySelector('#bestProducts').innerHTML=products.filter(p=>[1,3,4,6,7,13,14,15,5].includes(p.id)).map(productCard).join('')}
