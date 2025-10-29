let items = JSON.parse(localStorage.getItem('inv')) || [];
let idx = -1;
let f = document.getElementById('form');
let t = document.getElementById('table');
let b = document.getElementById('btn');

render();

f.addEventListener('submit', e => {
    e.preventDefault();
    let p = {
        name: document.getElementById('name').value,
        sku: document.getElementById('sku').value,
        category: document.getElementById('category').value,
        qty: document.getElementById('qty').value,
        supplier: document.getElementById('supplier').value,
        price: parseFloat(document.getElementById('price').value),
        location: document.getElementById('location').value
    };
    idx === -1 ? items.push(p) : (items[idx] = p, idx = -1, b.textContent = 'Add Product');
    localStorage.setItem('inv', JSON.stringify(items));
    f.reset();
    render();
});

function render() {
    t.innerHTML = items.length ? items.map((p, i) => 
        `<tr><td>${i+1}</td><td>${p.name}</td><td>${p.sku}</td><td>${p.category}</td><td>${p.qty}</td><td>${p.supplier}</td><td>₹${p.price.toFixed(2)}</td><td>${p.location}</td><td><button class="btn edit" onclick="edit(${i})">Edit</button><button class="btn del" onclick="del(${i})">Delete</button></td></tr>`
    ).join('') : '<tr><td colspan="9" style="text-align:center">No items added yet</td></tr>';
}

function edit(i) {
    idx = i;
    let p = items[i];
    document.getElementById('name').value = p.name;
    document.getElementById('sku').value = p.sku;
    document.getElementById('category').value = p.category;
    document.getElementById('qty').value = p.qty;
    document.getElementById('supplier').value = p.supplier;
    document.getElementById('price').value = p.price;
    document.getElementById('location').value = p.location;
    b.textContent = 'Update Product';
}

function del(i) {
    if(confirm('Delete this product?')) {
        items.splice(i, 1);
        localStorage.setItem('inv', JSON.stringify(items));
        render();
    }
}
