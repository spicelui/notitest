// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(reg => console.log('✅ Service Worker registrado', reg))
    .catch(err => console.error('❌ Error al registrar Service Worker', err));
}

// Pedir permiso para notificaciones
document.addEventListener("DOMContentLoaded", () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});

// Función para enviar notificación
function enviarNotificacion() {
  if (Notification.permission === "granted") {
    new Notification("📢 Hola!", {
      body: "Esta es una notificación de prueba desde la PWA",
      icon: "icon.png"
    });
  } else {
    alert("No tienes permisos de notificación");
  }
}
