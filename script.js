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

    discounts[barcode] = value;
    alert('割引が追加されました');
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

// 割引適用関数
function applyDiscount(barcode, value) {
    cart.forEach(item => {
        item.price -= value;
    });

    updateCart();
    alert('割引が適用されました');
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

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - ${item.price}円 x ${item.quantity}
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
        `;
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

// 商品データ保存関数
function saveProductData() {
    const productData = Object.entries(products).map(([barcode, { name, price }]) => `${barcode},${name},${price}`).join('\n');
    const blob = new Blob([productData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_data.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    alert('商品データが保存されました');
}

// 割引データ保存関数
function saveCouponData() {
    const couponData = Object.entries(discounts).map(([barcode, value]) => `${barcode},${value}`).join('\n');
    const blob = new Blob([couponData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'coupon_data.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    alert('割引データが保存されました');
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

// 数量増加関数
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// 数量減少関数
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}
