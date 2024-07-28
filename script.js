// 商品データ、割引データ、カゴの初期化
let products = {};
let discounts = {};
let cart = [];

// 商品追加関数
function addProduct() {
    const barcode = document.getElementById('newBarcode').value;
    const name = document.getElementById('newProductName').value;
    const price = parseFloat(document.getElementById('newPrice').value);

    products[barcode] = { name, price };
    alert('商品が追加されました');
}

// 割引追加関数
function addDiscount() {
    const barcode = document.getElementById('discountBarcode').value;
    const value = parseFloat(document.getElementById('discountValue').value);

    discounts[barcode] = value;
    alert('割引が追加されました');
}

// 商品スキャン関数
function scanProduct() {
    const barcode = document.getElementById('barcodeInput').value;

    // 割引の場合
    if (discounts[barcode] !== undefined) {
        applyDiscount(barcode);
    } else if (products[barcode] !== undefined) {
        addToCart(barcode);
    } else {
        alert('商品が見つかりません');
    }

    document.getElementById('barcodeInput').value = '';
}

// カゴに商品追加関数
function addToCart(barcode) {
    const product = products[barcode];
    const existingItem = cart.find(item => item.barcode === barcode);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, barcode, quantity: 1 });
    }

    updateCart();
}

// 割引適用関数
function applyDiscount(barcode) {
    const discountValue = discounts[barcode];
    cart.forEach(item => {
        item.price -= discountValue;
    });

    updateCart();
}

// カゴ更新関数
function updateCart() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price}円 x ${item.quantity}`;
        cartList.appendChild(listItem);

        total += item.price * item.quantity;
    });

    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

// カゴクリア関数
function clearCart() {
    cart = [];
    updateCart();
}
