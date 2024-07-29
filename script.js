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
}

// 割引追加関数
function addDiscount() {
    const barcode = document.getElementById('discountBarcode').value;
    const value = parseFloat(document.getElementById('discountValue').value);

    discounts[barcode] = value;
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
        addDiscountToCart(barcode);
    } else if (products[barcode] !== undefined) {
        addToCart(barcode);
    }
}

// 割引をカゴに追加する関数
function addDiscountToCart(barcode) {
    const discountValue = discounts[barcode];
    const discountItem = { name: '割引', price: -discountValue, barcode, quantity: 1 };
    cart.push(discountItem);
    updateCart();
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
