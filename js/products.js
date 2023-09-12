const productListDiv = document.createElement('div');
productListDiv.id = "productList";

productos.appendChild(productListDiv);
let productsData = []; 

const catName = localStorage.getItem('nombreCat');
document.getElementById("nombreCategoria").innerHTML=catName

function loadProducts() {
    const DivID =  localStorage.getItem("catID");
    const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${DivID}.json`;
    
  
    getJSONData(productsUrl)
      .then(response => {
        if (response.status === "ok") {
          const products = response.data.products;
          productsData=products;
          const productListDiv = document.getElementById("productList");
  
          let productListHTML = "";
  
          products.forEach(product => {
            productListHTML += `
            <div class="product list-group-item list-group-item-action cursor-active" id=${product.id}>
            <div class="row">
              <div class="col-3">
                <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
              </div>
              <div class="col">
                <div class="d-flex w-100 justify-content-between">
                  <h4 class="mb-1">${product.name}</h4>
                  <small class="text-muted">Cantidad Vendida: ${product.soldCount}</small>
                </div>
                <p class="mb-1">${product.description}</p>
                <p class="mb-1">Precio: $${product.cost} ${product.currency}</p>
              </div>
            </div>
          </div>
            `;
          });
  
          productListDiv.innerHTML = productListHTML;
          const idDelDiv = document.querySelectorAll(".product")
          idDelDiv.forEach(div =>{
            div.addEventListener("click", function(){
              const idDelProducto = this.getAttribute("id")
              localStorage.setItem("productoSeleccionado", idDelProducto)
              window.location.href = "product-info.html"
            })
          })

        } else {
          console.error("Error al cargar los productos:", response.data);
        }
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
      });
  }
  
  function filtrarPorPrecio() {
    const precioMinimoInput = document.getElementById("rangeFilterCountMin");
    const precioMaximoInput = document.getElementById("rangeFilterCountMax");
    const notificationDiv = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");
  
    const precioMinimo = parseFloat(precioMinimoInput.value);
    const precioMaximo = parseFloat(precioMaximoInput.value);
  
    // Verificar si ambos valores están completos y si el máximo es mayor que el mínimo
    if (!isNaN(precioMinimo) && !isNaN(precioMaximo) && precioMaximo > precioMinimo) {
      const productosFiltrados = productsData.filter(product => {
        const precioProducto = parseFloat(product.cost);
        return !isNaN(precioProducto) && precioProducto >= precioMinimo && precioProducto <= precioMaximo;
      });
  
      const productListDiv = document.getElementById("productList");
  
      let productListHTML = "";
  
      productosFiltrados.forEach(product => {
        productListHTML += `
        <div class="product list-group-item list-group-item-action cursor-active">
              <div class="row">
                <div class="col-3">
                  <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                </div>
                <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${product.name}</h4>
                    <small class="text-muted">Cantidad Vendida: ${product.soldCount}</small>
                  </div>
                  <p class="mb-1">${product.description}</p>
                  <p class="mb-1">Precio: $${product.cost} ${product.currency}</p>
                </div>
              </div>
            </div>
        `;
      });
  
      productListDiv.innerHTML = productListHTML;
      
      // Ocultar la notificación si estaba visible
      notificationDiv.classList.remove("show");
    } else {
      // Mostrar la notificación de error
      notificationMessage.textContent = "Por favor, ingresa valores válidos para el rango de precios.";
      notificationDiv.classList.add("alert-danger", "show");
      
      // Ocultar la notificación después de 2 segundos
      setTimeout(() => {
        notificationDiv.classList.remove("show");
      }, 2000);
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadProducts);
  
  const btnFiltro = document.getElementById("rangeFilterCount");
  btnFiltro.addEventListener("click", filtrarPorPrecio);
  
  const btnLimpiar = document.getElementById("clearRangeFilter");
  btnLimpiar.addEventListener("click", () => {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    loadProducts();
  });

 function generateProductList() {
    const productListDiv = document.getElementById("productList");
    let productListHTML = "";
  
    productsData.forEach(product => {
      productListHTML += `
      <div class="product list-group-item list-group-item-action cursor-active">
            <div class="row">
              <div class="col-3">
                <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
              </div>
              <div class="col">
                <div class="d-flex w-100 justify-content-between">
                  <h4 class="mb-1">${product.name}</h4>
                  <small class="text-muted">Cantidad Vendida: ${product.soldCount}</small>
                </div>
                <p class="mb-1">${product.description}</p>
                <p class="mb-1">Precio: $${product.cost} ${product.currency}</p>
              </div>
            </div>
          </div>
      `;
    });
  
    productListDiv.innerHTML = productListHTML;
  }
  
// Agrega un evento de clic al botón "Ordenar por Precio Ascendente"
document.getElementById("sortAsc").addEventListener("click", function () {
  
  // Ordena el array productsData por precio de manera ascendente
  productsData.sort(function(a, b) {
    return a.cost - b.cost;
  });

  // Vuelve a generar la lista de productos ordenados por precio
  generateProductList();
});


// Agrega un evento de clic al botón "Ordenar por Precio Ascendente"
document.getElementById("sortDesc").addEventListener("click", function () {
  
  // Ordena el array productsData por precio de manera ascendente
  productsData.sort(function(a, b) {
    return b.cost - a.cost;
  });

  // Vuelve a generar la lista de productos ordenados por precio
  generateProductList();
});


let ordenAscendente = false;

document.getElementById("sortByCount").addEventListener("click", function () {
  ordenAscendente = !ordenAscendente;

  productsData.sort(function(a, b) {
    if (ordenAscendente) {
      return b.soldCount - a.soldCount;
    } else {
      return a.soldCount - b.soldCount;
    }
  });

  generateProductList();
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  buscarProductosEnTiempoReal(searchInput.value.toLowerCase());
});

function buscarProductosEnTiempoReal(searchTerm) {
  const productosFiltrados = productsData.filter(product => {
    const nombreEnMinuscula = quitarAcentos(product.name.toLowerCase());
    const descripcionEnMinuscula = quitarAcentos(product.description.toLowerCase());
    return nombreEnMinuscula.includes(searchTerm) || descripcionEnMinuscula.includes(searchTerm);
  });

  mostrarProductos(productosFiltrados);
}

function quitarAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function mostrarProductos(productos) {
  const productListDiv = document.getElementById("productList");
  let productListHTML = "";

  productos.forEach(product => {
    productListHTML += `
      <div class="product list-group-item list-group-item-action cursor-active">
        <div class="row">
          <div class="col-3">
            <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
          </div>
          <div class="col">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">${product.name}</h4>
              <small class="text-muted">Cantidad Vendida: ${product.soldCount}</small>
            </div>
            <p class="mb-1">${product.description}</p>
            <p class="mb-1">Precio: $${product.cost} ${product.currency}</p>
          </div>
        </div>
      </div>
    `;
  });

  productListDiv.innerHTML = productListHTML;
}