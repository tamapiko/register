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
    const value = document.getElementById('discountValue').value;

    if (value.includes('%')) {
        const percentage = parseFloat(value.replace('%', ''));
        discounts[barcode] = { type: 'percentage', value: percentage };
    } else {
        discounts[barcode] = { type: 'fixed', value: parseFloat(value) };
    }
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
    const barcode = barcodeInput;
    barcodeInput = '';

    if (discounts[barcode] !== undefined) {
        addDiscountToCart(barcode);
    } else if (products[barcode] !== undefined) {
        addToCart(barcode);
    }
}

// 割引をカゴに追加する関数
function addDiscountToCart(barcode) {
    const discount = discounts[barcode];
    let discountAmount = 0;

    if (discount.type === 'percentage') {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        discountAmount = total * (discount.value / 100);
    } else if (discount.type === 'fixed') {
        discountAmount = discount.value;
    }

    const discountItem = { name: '割引', price: -discountAmount, barcode, quantity: 1 };
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

// 数量増減関数
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

// カゴクリア関数
function clearCart() {
    cart = [];
    updateCart();
}

// 商品データ読み込み関数
function loadProductData() {
    const file = document.getElementById('productFile').files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const lines = event.target.result.split('\n');
        lines.forEach(line => {
            const [barcode, name, price] = line.split(',');
            products[barcode] = { name, price: parseFloat(price) };
        });
    };

    reader.readAsText(file);
}

// 割引データ読み込み関数
function loadCouponData() {
    const file = document.getElementById('couponFile').files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const lines = event.target.result.split('\n');
        lines.forEach(line => {
            const [barcode, value] = line.split(',');
            if (value.includes('%')) {
                const percentage = parseFloat(value.replace('%', ''));
                discounts[barcode] = { type: 'percentage', value: percentage };
            } else {
                discounts[barcode] = { type: 'fixed', value: parseFloat(value) };
            }
        });
    };

    reader.readAsText(file);
}

// 商品データ保存関数
function saveProductData() {
    const data = Object.entries(products).map(([barcode, product]) => `${barcode},${product.name},${product.price}`).join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// クーポンデータ保存関数
function saveCouponData() {
    const data = Object.entries(discounts).map(([barcode, discount]) => `${barcode},${discount.type === 'percentage' ? discount.value + '%' : discount.value}`).join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'coupons.txt';
    a.click();
    URL.revokeObjectURL(url);
}
