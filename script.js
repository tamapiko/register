// 商品データ、割引データ、カゴの初期化
let products = {};
let discounts = {};
let cart = [];
let barcodeInput = '';

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

    applyDiscount(barcode, value);
    alert('割引が追加されました');
}

// 割引登録関数
function registerDiscount() {
    const barcode = document.getElementById('registerDiscountBarcode').value;
    const value = parseFloat(document.getElementById('registerDiscountValue').value);

    discounts[barcode] = value;
    alert('割引が登録されました');
}

// 割引適用関数
function applyDiscount(barcode, value) {
    cart.forEach(item => {
        item.price -= value;
    });

    updateCart();
    alert('割引が適用されました');
}

// キーボードイベントリスナー
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        scanProduct();
    } else {
        barcodeInput += event.key;
    }
});

// 商品スキャン関数
function scanProduct() {
    // スキャン内容の処理
    const barcode = barcodeInput;
    barcodeInput = '';

    // 割引の場合
    if (discounts[barcode] !== undefined) {
        applyDiscount(barcode, discounts[barcode]);
    } else if (products[barcode] !== undefined) {
        addToCart(barcode);
        alert('商品がスキャンされました');
    } else {
        alert('商品が見つかりません');
    }
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
    alert('カゴがクリアされました');
}

// 商品データ読み込み関数
function loadProductData() {
    const file = document.getElementById('productFile').files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const lines = event.target.result.split('\n');
        lines.forEach(line => {
            const [barcode, name, price] = line.split(',');
            if (barcode && name && price) {
                products[barcode] = { name, price: parseFloat(price) };
            }
        });
        alert('商品データが読み込まれました');
    };

    reader.readAsText(file);
}

// クーポンデータ読み込み関数
function loadCouponData() {
    const file = document.getElementById('couponFile').files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const lines = event.target.result.split('\n');
        lines.forEach(line => {
            const [barcode, value] = line.split(',');
            if (barcode && value) {
                discounts[barcode] = parseFloat(value);
            }
        });
        alert('クーポンデータが読み込まれました');
    };

    reader.readAsText(file);
}
