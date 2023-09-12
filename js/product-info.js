document.addEventListener("DOMContentLoaded", function () {
    const idProducto = localStorage.getItem("productoSeleccionado")
    if (idProducto) {
        const urlProductsInfo = `https://japceibal.github.io/emercado-api/products/${idProducto}.json`
        getJSONData(urlProductsInfo)
            .then(response => {
                if (response.status === "ok") {
                    const product = response.data;
                    const containerProducto = document.getElementById("products-info")
                    containerProducto.innerHTML = ""
                    const divProducto = document.createElement("div")
                    divProducto.innerHTML = `
                    <div class="row">
                        <div class="col-12">
                            <h4 class="mb-5 mt-4">${product.name}</h4>
                            <hr>
                            <div class="row">
                                <p><strong>Precio:</strong><br>${product.currency} ${product.cost}</p>
                                <p><strong>Descripción:</strong><br>${product.description}</p>
                                <p><strong>Categoria:</strong><br>${product.category}</p>
                                <p><strong>Cantidad vendida:</strong><br>${product.soldCount}</p>
                            </div>
                            <div class="col-3">
                                <div class="productos-imagenes d-flex">
                                </div>
                            </div>
                        </div>
                    </div>
          `;
                    const contenedorImagenes = divProducto.querySelector(".productos-imagenes")
                    for (const srcImagen of product.images) {
                        const elementoImagen = document.createElement("img")
                        elementoImagen.src = srcImagen
                        elementoImagen.alt = product.name
                        elementoImagen.classList.add("img-thumbnail")
                        contenedorImagenes.appendChild(elementoImagen)
                    }
                    containerProducto.appendChild(divProducto);
                } else {
                    console.error("Error al cargar los productos:", response.data);
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });

    }
})

const Comment_div = document.createElement('div');
const main_comment = document.querySelector("main");
main_comment.appendChild(Comment_div);


function loadComment() {
    const idProducto = localStorage.getItem("productoSeleccionado")
    let URL_comments = `https://japceibal.github.io/emercado-api/products_comments/${idProducto}.json`;

    getJSONData(URL_comments)
        .then(response => {
            if (response.status === "ok") {
                const comment = response.data;

                let CommentList = `
                <br><br><br><br>
                <div class="container border">  
                <table id="comentarios" class="table table-hover table-striped">
                <thead>
                <tr class="container">
                <tr>
                <th class=" text-left">Comentarios</th>
                </tr>
                </thead>
                <thead>
                <tr class="container">
                <th class="col-1 text-left"></th>
                <th class="col-2 text-left">Usuario</th>
                <th class="col-3 text-left">Descripción</th>
                <th class="col-3 text-center">Puntuación</th>
                <th class="col-3 text-left">Fecha</th>
                </tr>
                </thead>
                <tbody id="comentarios">
                `;

                comment.forEach(com => {
                    CommentList += `
                <tr class="container">
                <td class="col-1"><img src="img/User_icon.webp" class="img-rounded" style="width:15%" ></td>
                <td class="col-2" >${com.user}</td>
                <td class="col-3" >${com.description}</td>
                <td class="col-3 text-center">
                ` +
                        `<span id="star"class="fa fa-star checked"></span>`.repeat(com.score) +
                        `<span id="star"class="fa fa-star "></span>`.repeat(5 - com.score) +
                        `
                </td>
                <td class="col-3 small text-muted" >${com.dateTime}</td>
                </tr>
                    `;

                });
                Comment_div.innerHTML = CommentList +
                    `</tbody>
                <table>
                </div>
                <br><br><br>
                <div class="container primary">
                <form method="post">
                    <h3>Cuéntanos sobre el producto:</h3><br><br>
                    <div>
                    <label for="opinion" class="form-label">Su opinión:</label><br>
                    <textarea name="opinion" id="opinion" cols="30" rows="10" placeholder="Escriba aquí." class="form-control"></textarea>
                    </div>
                    <br>
                    <div>
                    <label for="score" class="form-label">Su puntuación:</label>
                    <select id="score" class="form-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5" selected>5</option>
                    </select>
                    </div><br>
                    <input type="submit" value="Enviar" id= "btnComment" class="form-control"><br>
                    
                </form>
                </div>
                
                `;
                //DESAFIATE

                function obtenerFechaYHora() {
                    var fechaHora = new Date();
                    var año = fechaHora.getFullYear();
                    var mes = String(fechaHora.getMonth() + 1).padStart(2, '0');
                    var dia = String(fechaHora.getDate()).padStart(2, '0');
                    var horas = String(fechaHora.getHours()).padStart(2, '0');
                    var minutos = String(fechaHora.getMinutes()).padStart(2, '0');
                    var segundos = String(fechaHora.getSeconds()).padStart(2, '0');

                    return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
                }

                function addNewComment() {
                    const comentario = document.getElementById("opinion").value;
                    const score = document.getElementById("score").value;
                    const nombreU = localStorage.getItem("nombreLogueado");
                    const idProducto = localStorage.getItem("productoSeleccionado");
                    const fechaHora = obtenerFechaYHora();
                    const notificationDiv = document.getElementById("notification");
                    const notificationMessage = document.getElementById("notification-message");

                    if (comentario.trim() !== "") {
                        let comentariosGuardados = localStorage.getItem("opinion");
                        let comentarios = [];

                        if (comentariosGuardados) {
                            comentarios = JSON.parse(comentariosGuardados);
                            for (let i = 0; i < comentarios.length; i++) {
                                if (comentarios[i].productoId === idProducto && comentarios[i].dato === nombreU) {
                                    notificationMessage.textContent = "¡Ya has comentado para este producto!";
                                    notificationDiv.classList.add("alert-danger", "show");
                                    setTimeout(() => {
                                        notificationDiv.classList.remove("show");
                                    }, 2000);
                                    return;
                                }
                            }
                        }
                        const nuevoComentario = {
                            productoId: idProducto,
                            dato: nombreU,
                            dato2: comentario,
                            dato3: score,
                            dato4: fechaHora
                        };
                        comentarios.push(nuevoComentario);
                        localStorage.setItem("opinion", JSON.stringify(comentarios));
                        if (idProducto === localStorage.getItem("productoSeleccionado")) {
                            mostrarComentariosGuardados();
                        }

                        document.getElementById("opinion").value = "";
                        window.location.reload();
                    }
                }
                const botonComentario = document.getElementById("btnComment");
                botonComentario.addEventListener("click", addNewComment);
                mostrarComentariosGuardados()
            } else {
                console.error("Error", response.data)
            }
        })
}

function mostrarComentariosGuardados() {
    const comentariosGuardados = localStorage.getItem("opinion");
    const idProductoActual = localStorage.getItem("productoSeleccionado");

    if (comentariosGuardados) {
        const comentarios = JSON.parse(comentariosGuardados) || [];

        if (!Array.isArray(comentarios)) {
            console.log("Error con array");
            return;
        }

        const contenedorDeComentarios = document.getElementById("comentarios");

        if (contenedorDeComentarios) {
            comentarios.forEach((comentario) => {
                if (comentario.productoId === idProductoActual) {
                    const nuevoComentario = `
                        <tr class="container">
                            <td class="col-1"><img src="img/User_icon.webp" class="img-rounded" style="width:15%" ></td>
                            <td class="col-2">${comentario.dato}</td>
                            <td class="col-3">${comentario.dato2}</td>
                            <td class="col-3 text-center">
                                ${'<span id="star" class="fa fa-star checked"></span>'.repeat(comentario.dato3)}
                                ${'<span id="star" class="fa fa-star "></span>'.repeat(5 - comentario.dato3)}
                            </td>
                            <td class="col-3 small text-muted">${comentario.dato4}</td>
                        </tr>
                    `;
                    contenedorDeComentarios.innerHTML += nuevoComentario;
                }
            });
        }
    } else {
        console.log("No hay comentarios en la localStorage.");
    }
}

document.addEventListener("DOMContentLoaded", mostrarComentariosGuardados);

document.addEventListener("DOMContentLoaded", loadComment);