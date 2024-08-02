document.getElementById('resetCart').addEventListener('click', function() {
    alert('カゴをリセットしました。');
});

// 初期状態では商品項目のデータは空
let cartItems = [];

// カートの表示を更新する関数
function updateCart() {
    const cartContainer = document.querySelector('.cart');
    cartContainer.innerHTML = ''; // カートをクリア
    let total = 0;
    let quantity = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;
        quantity += item.quantity;

        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item');
        itemRow.innerHTML = `
            <p>${item.name}</p>
            <div class="quantity-control">
                <button class="decrease">-</button>
                <span>${item.quantity}個</span>
                <button class="increase">+</button>
            </div>
            <p>¥${item.price}</p>
        `;
        cartContainer.appendChild(itemRow);

        itemRow.querySelector('.decrease').addEventListener('click', () => {
            if (item.quantity > 0) {
                item.quantity--;
                updateCart();
            }
        });

        itemRow.querySelector('.increase').addEventListener('click', () => {
            item.quantity++;
            updateCart();
        });
    });

    document.querySelector('.summary').innerHTML = `
        <p>合計　¥${total}</p>
        <p>数量　${quantity}点</p>
        <p>支払い　¥${total}</p>
        <p>お釣り　¥0</p>
    `;
}

updateCart();

// 商品の登録、編集、保存の機能（仮）
document.getElementById('registerProduct').addEventListener('click', () => {
    alert('商品の登録');
});

document.getElementById('editProduct').addEventListener('click', () => {
    alert('商品の編集');
});

document.getElementById('saveProductData').addEventListener('click', () => {
    alert('商品のデータ保存');
});

document.getElementById('registerDiscount').addEventListener('click', () => {
    alert('割引きの登録');
});

document.getElementById('editDiscount').addEventListener('click', () => {
    alert('割引きの編集');
});

document.getElementById('saveDiscountData').addEventListener('click', () => {
    alert('割引きのデータ保存');
});
