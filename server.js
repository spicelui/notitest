const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const publicKey = 'BPfwqWa7RMNUaFJQ9rGSWR7suMVUVNkMwBYtM3Zf9FlklEp6LPN0ijtKRVVLSU-dqQcYwXM_hzuVfsBq_9X43Rk';
const privateKey = 'DEoTGSx823iw3jbHbiA8_TDH5guNXMlhoxcCxwx6tAQ';


webpush.setVapidDetails(
  'mailto:correo@gmail.com',
  publicKey,
  privateKey
);

let subscriptions = [];

app.post('/subscribe', (req, res) => {
  subscriptions.push(req.body);
  res.status(201).json({});
});

app.post('/notify', (req, res) => {
  const payload = JSON.stringify({
    title: '📤 Noti desde laptop',
    body: 'Se subió un archivo 📁'
  });

  const promises = subscriptions.map(sub =>
    webpush.sendNotification(sub, payload)
  );

  Promise.all(promises)
    .then(() => res.status(200).json({ message: 'Notificaciones enviadas' }))
    .catch(err => res.sendStatus(500));
});

app.listen(3000, () => console.log('✅ Servidor en http://localhost:3000'));
