const API = 'http://localhost:3000/api';

async function loadOrders() {
  const res = await fetch(API + '/orders');
  const orders = await res.json();
  const list = document.getElementById('orders');
  list.innerHTML = '';
  orders.forEach((o) => {
    const li = document.createElement('li');
    li.innerHTML = '<b>#' + o.id + '</b> ' + o.customer + ' - ' + o.item +
      ' <em>' + o.status + '</em> (' + o.eta_text + ')';
    list.appendChild(li);
  });
}

document.getElementById('add').addEventListener('click', async () => {
  const customer = document.getElementById('customer').value;
  const item = document.getElementById('item').value;
  const res = await fetch(API + '/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer, item }),
  });
  document.getElementById('msg').textContent = res.ok ? 'Order placed!' : 'Something went wrong';
  loadOrders();
});

loadOrders();
setInterval(loadOrders, 5000);
