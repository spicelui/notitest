// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('✅ Service Worker registrado', reg))
    .catch(err => console.error('❌ Error al registrar Service Worker', err));
}

function pedirPermisoYNotificar() {
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        enviarNotificacion();
      } else {
        alert('Permiso denegado para notificaciones');
      }
    });
  } else if (Notification.permission === 'granted') {
    enviarNotificacion();
  } else {
    alert('No tienes permisos de notificación');
  }
}

function enviarNotificacion() {
  new Notification("📢 Hola!", {
    body: "Esta es una notificación de prueba desde la PWA",
    icon: "icon.png"
  });
}

