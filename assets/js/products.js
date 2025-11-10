const BACKEND_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000/api/products"
  : "https://gostwear-backend.onrender.com/api/products";

async function fetchProducts() {
  try {
    const res = await fetch(BACKEND_URL);
    const products = await res.json();

    // Auto-generate image path based on product ID
    const finalProducts = products.map(p => ({
      ...p,
      image: `/img/${p.id}.png`,
    }));

    renderProducts(finalProducts, "men");
    renderProducts(finalProducts, "women");
    renderProducts(finalProducts, "kids");
  } catch (err) {
    console.error("❌ Error fetching products:", err);
  }
}

function renderProducts(products, category) {
  const grid = document.getElementById(`${category}-grid`);
  grid.innerHTML = "";

  products
    .filter(p => p.category === category)
    .forEach(p => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <a href="product.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}" onerror="this.src='/img/placeholder.png'">
        </a>
        <p>${p.name} – ₹${p.price}</p>
      `;
      grid.appendChild(div);
    });
}

fetchProducts();
