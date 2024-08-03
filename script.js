const cart = [];
const products = []; // 商品データの配列
const discounts = []; // 割引きデータの配列

document.getElementById('reset-cart').addEventListener('click', () => {
    cart.length = 0;
    updateCartDisplay();
});

document.getElementById('barcode-input').addEventListener('input', (event) => {
    const barcode = event.target.value;
    const product = products.find(p => p.barcode === barcode);
    if (product) {
        addToCart(product);
    }
    event.target.value = ''; // 入力フィールドをリセット
});

function addToCart(product) {
    const cartItem = cart.find(item => item.product.barcode === product.barcode);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    let totalQuantity = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product.name} x ${item.quantity} - ¥${item.product.price * item.quantity}`;
        cartItems.appendChild(li);

        totalPrice += item.product.price * item.quantity;
        totalQuantity += item.quantity;
    });

    document.getElementById('total-price').textContent = `合計: ¥${totalPrice}`;
    document.getElementById('total-quantity').textContent = `数量: ${totalQuantity}点`;
    document.getElementById('payment').textContent = `支払い: ¥0`; // 実際の支払い額は入力により更新する必要があります
    document.getElementById('change').textContent = `お釣り: ¥0`; // 実際のお釣り額は入力により更新する必要があります
}

// 商品登録・編集・保存ボタンのイベントリスナーを追加
document.getElementById('add-product').addEventListener('click', () => {
    // 商品登録処理
});

document.getElementById('edit-product').addEventListener('click', () => {
    // 商品編集処理
});

document.getElementById('save-product-data').addEventListener('click', () => {
    // 商品データ保存処理
});

// 割引き登録・編集・保存ボタンのイベントリスナーを追加
document.getElementById('add-discount').addEventListener('click', () => {
    // 割引き登録処理
});

document.getElementById('edit-discount').addEventListener('click', () => {
    // 割引き編集処理
});

document.getElementById('save-discount-data').addEventListener('click', () => {
    // 割引きデータ保存処理
});
