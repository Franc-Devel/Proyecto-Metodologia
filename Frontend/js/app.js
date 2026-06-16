// URL de nuestra API local creada en Express
const API_URL = "http://localhost:3000/api/productos";

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});

async function cargarProductos() {
  const contenedor = document.getElementById("contenedor-productos");

  try {
    const respuesta = await fetch(API_URL);
    let productos = await respuesta.json(); // <-- Usamos let para poder filtrarlos

    // NUEVO: Leemos la URL a ver si hay una búsqueda
    const urlParams = new URLSearchParams(window.location.search);
    const busqueda = urlParams.get("q");

    if (busqueda) {
      // Filtramos los productos que coincidan con la palabra
      productos = productos.filter((p) =>
        p.name.toLowerCase().includes(busqueda.toLowerCase()),
      );

      // Cambiamos el título para que el usuario sepa qué está viendo
      // Aseguramos apuntar al título correcto en el main
      const titulo = document.querySelector("main .section-title");
      if (titulo) titulo.textContent = `Resultados para "${busqueda}"`;
    }

    contenedor.innerHTML = "";

    if (productos.length === 0) {
      contenedor.innerHTML = `<p class="text-center col-12 text-muted">No se encontraron productos.</p>`;
      return;
    }

    productos.forEach((producto) => {
      // Evaluamos si hay una URL de imagen; si no, ponemos el ícono
      const imagenVisual = producto.imageUrl
        ? `<img src="${producto.imageUrl}" alt="${producto.name}" class="img-fluid" style="max-height: 180px; object-fit: contain;">`
        : `<i class="bi bi-image text-secondary" style="font-size: 4rem; opacity: 0.5;"></i>`;

      const cardHtml = `
        <div class="col">
            <div class="card h-100 bg-white product-card text-center pb-3">
                <div class="product-image-container mb-3 position-relative d-flex justify-content-center align-items-center" style="height: 200px;">
                    ${imagenVisual}
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

      // inyectar la tarjeta recién armada en el HTML
      contenedor.innerHTML += cardHtml;
    }); // fin del forEach
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    contenedor.innerHTML = `
        <div class="col-12 text-center text-danger py-5">
            <i class="bi bi-exclamation-triangle fs-1"></i>
            <p class="fs-5 fw-bold mt-2">Error al cargar el catálogo</p>
            <small class="text-muted">Asegurate de que el backend esté encendido.</small>
        </div>
    `;
  }
}
