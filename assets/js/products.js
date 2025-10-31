// Auto-detect local vs deployed backend
const BACKEND_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000/api/products"
    : "https://gostwear-backend.onrender.com/api/products";

// Load and render products
async function loadProducts() {
  try {
    const res = await fetch(BACKEND_URL);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const products = await res.json();

    renderCategory(products, "men");
    renderCategory(products, "women");
    renderCategory(products, "kids");
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    document.body.innerHTML += `<p style="text-align:center;color:red;">⚠️ Failed to load products. Please refresh.</p>`;
  }
}

function renderCategory(products, category) {
  const grid = document.getElementById(`${category}-grid`);
  if (!grid) return;

  const filtered = products.filter(p => p.category === category);
  grid.innerHTML = filtered
    .map(
      p => `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <p>${p.name} – ₹${p.price}</p>
        <button onclick="addToCart('${p.id}', '${p.name}', ${p.price}, '${p.image}')">
          Add to Cart
        </button>
      </div>
    `
    )
    .join("");
}

// =================== CART FUNCTION ===================
function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === id);

  if (existing) existing.qty += 1;
  else cart.push({ id, name, price, image, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`🛒 ${name} added to cart!`);
}

// =================== INIT ===================
loadProducts();
