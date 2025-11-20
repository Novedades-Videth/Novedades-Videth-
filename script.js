/* --------------------------
  script.js (completo, pegar)
   - Registra sw.js
   - Helpers WhatsApp
   - Auto-bind para botones con data-product
---------------------------*/

const WHATSAPP_NUMBER = "52557145622"; // +52 55 7145 622 -> sin + ni espacios
const WHATSAPP_BASE_MESSAGE = "Hola me interesa este producto.";

// Registrar service worker (usa sw.js)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Error al registrar SW:", err));
}

// Abre WhatsApp con nombre (y otros detalles opcionales)
function openWhatsAppWithProduct(productName = "", price = "", img = "") {
  let message = WHATSAPP_BASE_MESSAGE;
  if (productName && productName.trim() !== "") {
    message += " Producto: " + productName.trim();
  }
  if (price) {
    message += " | Precio: " + price;
  }
  if (img) {
    message += " | Imagen: " + img;
  }
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, "_blank");
}

/* Si usas enlaces que llevan a product.html con query params,
   este helper construye el link para product desde JS si lo necesitas */
function goToProductPage({ nombre, precio, img, desc }) {
  const qp = new URLSearchParams({
    nombre: nombre || "",
    precio: precio || "",
    img: img || "",
    desc: desc || ""
  }).toString();
  window.location.href = `../product.html?${qp}`;
}

/* Auto-bind: añade evento a botones con data-product (no necesitas onclick en cada archivo) 
   - Usa: <button class="btn-kawaii btn-pedido" data-product="Mochila Azul" data-price="150" data-img="../assets/mochilas/x.jpg">Enviar pedido</button>
*/
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-pedido[data-product]").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.product || "";
      const price = btn.dataset.price || "";
      const img = btn.dataset.img || "";
      openWhatsAppWithProduct(name, price, img);
    });
  });
});
