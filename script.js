let cartItems = [];
let totalPrice = 0;
let totalQuantity = 0;

document.getElementById('reset-cart').addEventListener('click', () => {
    cartItems = [];
    updateCart();
    updateTotal();
});

document.getElementById('register-product').addEventListener('click', () => {
    alert('商品の登録機能が呼び出されました。');
});

document.getElementById('edit-product').addEventListener('click', () => {
    alert('商品の編集機能が呼び出されました。');
});

document.getElementById('save-product-data').addEventListener('click', () => {
    alert('商品のデータ保存機能が呼び出されました。');
});

document.getElementById('register-discount').addEventListener('click', () => {
    alert('割引きの登録機能が呼び出されました。');
});

document.getElementById('edit-discount').addEventListener('click', () => {
    alert('割引きの編集機能が呼び出されました。');
});

document.getElementById('save-discount-data').addEventListener('click', () => {
    alert('割引きのデータ保存機能が呼び出されました。');
});

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <span>${item.name}</span>
            <div class="controls">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}個</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
            <span>¥${item.price}</span>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}

function updateTotal() {
    totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById('total-price').textContent = `¥${totalPrice}`;
    document.getElementById('total-quantity').textContent = `${totalQuantity}点`;
    document.getElementById('payment-amount').textContent = `¥${totalPrice}`;
    document.getElementById('change-amount').textContent = `¥0`; // 支払い金額が定義されていないので暫定的に0円としています。
}

function increaseQuantity(id) {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity++;
        updateCart();
        updateTotal();
    }
}

function decreaseQuantity(id) {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
        updateTotal();
    } else if (item) {
        cartItems = cartItems.filter(item => item.id !== id);
        updateCart();
        updateTotal();
    }
}
