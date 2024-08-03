document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const summaryElement = document.getElementById('summary');
    const resetCartButton = document.getElementById('reset-cart');
    const registerProductButton = document.getElementById('register-product');
    const editProductButton = document.getElementById('edit-product');
    const saveProductDataButton = document.getElementById('save-product-data');
    const registerDiscountButton = document.getElementById('register-discount');
    const editDiscountButton = document.getElementById('edit-discount');
    const saveDiscountDataButton = document.getElementById('save-discount-data');

    let cart = [];
    let products = [];
    let discounts = [];

    function updateCart() {
        cartItemsElement.innerHTML = '';
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>${item.quantity}個</span>
                <span>¥${item.price}</span>
                <button class="button" data-index="${index}" onclick="removeFromCart(${index})">-</button>
                <button class="button" data-index="${index}" onclick="addToCart(${index})">+</button>
            `;
            cartItemsElement.appendChild(itemElement);
        });
    }

    function updateSummary() {
        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        summaryElement.innerHTML = `
            <p>合計 ¥${totalAmount}</p>
            <p>数量 ${totalQuantity}点</p>
            <p>支払い ¥${totalAmount}</p>
            <p>お釣り ¥0</p>
        `;
    }

    function addToCart(index) {
        cart[index].quantity++;
        updateCart();
        updateSummary();
    }

    function removeFromCart(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCart();
        updateSummary();
    }

    function resetCart() {
        cart = [];
        updateCart();
        updateSummary();
    }

    resetCartButton.addEventListener('click', resetCart);

    // Implement product and discount management functions...
});
