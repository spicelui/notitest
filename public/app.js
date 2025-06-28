if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('✅ SW registrado'));
}

function suscribirse() {
  Notification.requestPermission().then(permission => {
    if (permission !== 'granted') {
      alert('Debes aceptar notificaciones');
      return;
    }

    navigator.serviceWorker.ready.then(reg => {
      const publicKey = 'BPfwqWa7RMNUaFJQ9rGSWR7suMVUVNkMwBYtM3Zf9FlklEp6LPN0ijtKRVVLSU-dqQcYwXM_hzuVfsBq_9X43Rk';

      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      }).then(sub => {
        fetch('http://localhost:3000/subscribe', {
          method: 'POST',
          body: JSON.stringify(sub),
          headers: { 'Content-Type': 'application/json' }
        });
        alert('Suscrito correctamente');
      });
    });
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map(c => c.charCodeAt(0)));
}
