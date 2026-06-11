// Apuntamos al endpoint con el filtro de categoría "filtros"
const API_URL_FILTROS = "http://localhost:3000/api/productos?categoria=filtros";

document.addEventListener("DOMContentLoaded", () => {
  cargarFiltros();
});

async function cargarFiltros() {
  const contenedor = document.getElementById("contenedor-filtros");
  const contador = document.getElementById("contador-productos");

  try {
    const respuesta = await fetch(API_URL_FILTROS);
    const productos = await respuesta.json();

    contenedor.innerHTML = "";

    if (productos.length === 0) {
      contenedor.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-funnel text-muted" style="font-size: 3rem; opacity: 0.5;"></i>
                    <p class="text-muted mt-3">No hay filtros disponibles en este momento.</p>
                    <small class="text-muted">Pronto sumaremos stock a esta categoría.</small>
                </div>
            `;
      contador.textContent = "0 productos encontrados";
      return;
    }

    // Actualizamos el texto de cantidad de productos
    contador.textContent = `${productos.length} productos encontrados`;

    productos.forEach((producto) => {
      const cardHtml = `
                <div class="col">
                    <div class="card h-100 bg-white product-card text-center pb-3 border-0 shadow-sm">
                        <div class="product-image-container mb-3 position-relative bg-light" style="height: 200px;">
                            <i class="bi bi-funnel-fill text-secondary" style="font-size: 3rem; opacity: 0.3;"></i>
                            <span class="badge ${producto.stock > 15 ? "bg-success" : "bg-warning text-dark"} position-absolute top-0 end-0 m-2">
                                Stock: ${producto.stock}
                            </span>
                        </div>
                        
                        <div class="card-body d-flex flex-column pt-0 px-3">
                            <span class="text-uppercase text-muted small fw-bold mb-1" style="font-size: 0.7rem;">${producto.category.name}</span>
                            <h6 class="card-title fw-bold text-dark mb-3" style="font-size: 0.95rem; line-height: 1.3;">${producto.name}</h6>
                            
                            <div class="mt-auto">
                                <span class="fs-5 fw-bold custom-text-primary d-block mb-3">$${parseFloat(producto.price).toLocaleString("es-AR")}</span>
                                <button class="btn custom-btn btn-sm w-100 rounded-pill text-uppercase fw-bold shadow-sm">Agregar</button>
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
                <p class="fs-5 fw-bold mt-2">Error de conexión</p>
            </div>
        `;
    contador.textContent = "Error al cargar";
  }
}
