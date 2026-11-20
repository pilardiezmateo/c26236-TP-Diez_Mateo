import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";
import { agregarAlCarrito } from "./funcionesCarrito.js";

const renderizarProductos = () => {
const contenedor = document.getElementById("contenedor-tarjetas");

  fetch("./data/productos.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((producto) => {
        // creamos los articles y sus contenidos
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const boton = document.createElement("button");
        boton.classList.add("btn");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        // Armar la estructura
        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);

        contenedor.appendChild(tarjeta);
      });
    })
    .catch((error) => console.log(error));
};

//El evento "DOMContentLoaded" sirve para que no intentemos acceder a un nodo HTML con el
//  codigo js antes de que el navegador lo cree:
//Por ejemplo: que no lea un getElementById cuando aun no existe ese id.
document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  renderizarProductos();
});