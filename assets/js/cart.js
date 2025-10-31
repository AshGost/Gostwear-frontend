function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === id);

  if (existing) existing.qty += 1;
  else cart.push({ id, name, price, image, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("🛒 Added to cart!");
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}">
      <p>${item.name}</p>
      <p>Qty: ${item.qty}</p>
      <p>₹${item.price * item.qty}</p>
    </div>
  `).join("");

  document.getElementById("cart-total").innerText = `Total: ₹${total}`;
}
