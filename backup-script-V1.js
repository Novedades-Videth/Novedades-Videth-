// Registrar Service Worker para convertir la web en app
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}
