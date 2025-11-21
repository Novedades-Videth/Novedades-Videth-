/* --------------------------
  script.js (completo, corregido para GitHub Pages)
---------------------------*/

const WHATSAPP_NUMBER = "52557145622"; // +52 55 7145 622 -> sin + ni espacios
const WHATSAPP_BASE_MESSAGE = "Hola me interesa este producto.";

// Registrar service worker (ruta absoluta para GitHub Pages)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/Novedades-Videth-/sw.js")
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

/* Enviar datos por query params */
function goToProductPage({ nombre, precio, img, desc }) {
  const qp = new URLSearchParams({
    nombre: nombre || "",
    precio: precio || "",
    img: img || "",
    desc: desc || ""
  }).toString();
  window.location.href = `../product.html?${qp}`;
}

/* Auto-bind: botones con data-product  */
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
