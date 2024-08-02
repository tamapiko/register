function resetCart() {
    document.getElementById('cart-items').innerHTML = '<span>商品がありません</span>';
}

function showRegisterModal() {
    document.getElementById('register-modal').classList.add('visible');
}

function showEditModal() {
    document.getElementById('edit-modal').classList.add('visible');
}

function hideModal() {
    document.getElementById('register-modal').classList.remove('visible');
    document.getElementById('edit-modal').classList.remove('visible');
}
