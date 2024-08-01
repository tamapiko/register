document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const totalQuantity = document.getElementById("total-quantity");
    const paymentAmount = document.getElementById("payment-amount");
    const change = document.getElementById("change");
    const resetCartButton = document.getElementById("reset-cart");
    const registerProductButton = document.getElementById("register-product");
    const editProductButton = document.getElementById("edit-product");
    const saveProductDataButton = document.getElementById("save-product-data");

    let cart = [];
    let items = [];

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        let quantity = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.quantity}個</span>
                <span>¥${item.price}</span>
                <button onclick="removeItem(${index})"><i class="fas fa-minus"></i></button>
                <button onclick="addItem(${index})"><i class="fas fa-plus"></i></button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
            quantity += item.quantity;
        });
        totalPrice.textContent = `¥${total}`;
        totalQuantity.textContent = `${quantity}点`;
        change.textContent = `¥${paymentAmount.value - total}`;
    }

    function removeItem(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCart();
    }

    function addItem(index) {
        cart[index].quantity++;
        updateCart();
    }

    resetCartButton.addEventListener("click", function () {
        cart = [];
        updateCart();
    });

    registerProductButton.addEventListener("click", function () {
        document.getElementById("product-modal").style.display = "flex";
    });

    editProductButton.addEventListener("click", function () {
        document.getElementById("edit-product-modal").style.display = "flex";
        updateItemList();
    });

    function updateItemList() {
        const editItemList = document.getElementById("edit-item-list");
        editItemList.innerHTML = "";
        items.forEach((item, index) => {
            const listItem = document.createElement("div");
            listItem.className = "cart-item";
            listItem.innerHTML = `
                <span>${item.name}</span>
                <span>¥${item.price}</span>
                <button onclick="editItem(${index})"><i class="fas fa-edit"></i></button>
            `;
            editItemList.appendChild(listItem);
        });
    }

    function editItem(index) {
        const item = items[index];
        // 商品編集の処理を追加
    }
});
