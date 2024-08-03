document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const totalQuantityElement = document.getElementById('total-quantity');
    const totalPaymentElement = document.getElementById('total-payment');
    const totalChangeElement = document.getElementById('total-change');
    const resetCartButton = document.getElementById('reset-cart');
    const registerProductButton = document.getElementById('register-product');
    const editProductButton = document.getElementById('edit-product');
    const saveProductDataButton = document.getElementById('save-product-data');
    const registerDiscountButton = document.getElementById('register-discount');
    const editDiscountButton = document.getElementById('edit-discount');
    const saveDiscountDataButton = document.getElementById('save-discount-data');
    const productModal = document.getElementById('product-modal');
    const editModal = document.getElementById('edit-modal');
    const saveProductButton = document.getElementById('save-product');
    const cancelProductButton = document.getElementById('cancel-product');
    const cancelEditButton = document.getElementById('cancel-edit');
    const productList = document.getElementById('product-list');

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
        const totalPayment = totalAmount; // Example: Adjust according to your payment logic
        const totalChange = totalPayment - totalAmount;

        totalAmountElement.textContent = `¥${totalAmount}`;
        totalQuantityElement.textContent = `${totalQuantity}点`;
        totalPaymentElement.textContent = `¥${totalPayment}`;
        totalChangeElement.textContent = `¥${totalChange}`;
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

    // Product registration functionality
    registerProductButton.addEventListener('click', () => {
        productModal.classList.remove('hidden');
        productModal.classList.add('visible');
    });

    cancelProductButton.addEventListener('click', () => {
        productModal.classList.remove('visible');
        productModal.classList.add('hidden');
    });

    saveProductButton.addEventListener('click', () => {
        const barcode = document.getElementById('barcode').value;
        const productName = document.getElementById('product-name').value;
        const price = parseFloat(document.getElementById('price').value);

        if (barcode && productName && !isNaN(price)) {
            products.push({ barcode, name: productName, price });
            productModal.classList.remove('visible');
            productModal.classList.add('hidden');
        } else {
            alert('すべてのフィールドを正しく入力してください。');
        }
    });

    // Product editing functionality
    editProductButton.addEventListener('click', () => {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.innerHTML = `
                <span>${product.name}</span>
                <span>¥${product.price}</span>
                <button class="button" data-index="${index}" onclick="editProduct(${index})">編集</button>
            `;
            productList.appendChild(productElement);
        });

        editModal.classList.remove('hidden');
        editModal.classList.add('visible');
    });

    cancelEditButton.addEventListener('click', () => {
        editModal.classList.remove('visible');
        editModal.classList.add('hidden');
    });

    window.editProduct = (index) => {
        const product = products[index];
        document.getElementById('barcode').value = product.barcode;
        document.getElementById('product-name').value = product.name;
        document.getElementById('price').value = product.price;

        productModal.classList.remove('hidden');
        productModal.classList.add('visible');

        saveProductButton.onclick = () => {
            const updatedBarcode = document.getElementById('barcode').value;
            const updatedName = document.getElementById('product-name').value;
            const updatedPrice = parseFloat(document.getElementById('price').value);

            if (updatedBarcode && updatedName && !isNaN(updatedPrice)) {
                products[index] = { barcode: updatedBarcode, name: updatedName, price: updatedPrice };
                productModal.classList.remove('visible');
                productModal.classList.add('hidden');
            } else {
                alert('すべてのフィールドを正しく入力してください。');
            }
        };
    };

    // Implement discount management functions similarly...

    function scanProduct(barcode) {
        const product = products.find(p => p.barcode === barcode);
        if (product) {
            const cartItem = cart.find(item => item.barcode === barcode);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
            updateSummary();
        } else {
            alert('商品が見つかりませんでした。');
        }
    }

    // Example of scanning a product
    // scanProduct('1234567890'); // Adjust barcode value for testing
});
