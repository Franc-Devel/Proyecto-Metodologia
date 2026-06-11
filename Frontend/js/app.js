// URL de nuestra API local creada en Express
const API_URL = "http://localhost:3000/api/productos";

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});

async function cargarProductos() {
  const contenedor = document.getElementById("contenedor-productos");

  try {
    const respuesta = await fetch(API_URL);
    const productos = await respuesta.json();

    contenedor.innerHTML = "";

    if (productos.length === 0) {
      contenedor.innerHTML = `<p class="text-center col-12 text-muted">No hay productos disponibles en el catálogo.</p>`;
      return;
    }

    productos.forEach((producto) => {
      // Estructura de tarjeta estilo Bardahl
      const cardHtml = `
          <div class="col">
              <div class="card h-100 bg-white product-card text-center pb-3">
                  <div class="product-image-container mb-3 position-relative">
                      <i class="bi bi-image text-secondary" style="font-size: 4rem; opacity: 0.5;"></i>
                      <span class="badge ${producto.stock > 15 ? "bg-success" : "bg-danger"} position-absolute top-0 end-0 m-2">
                        Stock: ${producto.stock}
                      </span>
                  </div>
                  
                  <div class="card-body d-flex flex-column pt-0">
                      <span class="text-uppercase text-muted small fw-bold mb-2 tracking-wide">${producto.category.name}</span>
                      <h6 class="card-title fw-bold text-dark mb-4 px-2">${producto.name}</h6>
                      
                      <div class="mt-auto">
                          <span class="fs-4 fw-bold custom-text-primary d-block mb-3">$${parseFloat(producto.price).toLocaleString("es-AR")}</span>
                          <button class="btn custom-btn w-75 rounded-pill text-uppercase fw-bold py-2 shadow-sm">Ver más</button>
                      </div>
                  </div>
              </div>
          </div>
      `;
      contenedor.innerHTML += cardHtml;
    });
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    contenedor.innerHTML = `
        <div class="col-12 text-center text-danger py-5">
            <i class="bi bi-exclamation-triangle fs-1"></i>
            <p class="fs-5 fw-bold mt-2">Error al cargar el catálogo</p>
            <small class="text-muted">Asegurate de que el backend y XAMPP estén encendidos.</small>
        </div>
    `;
  }
}
