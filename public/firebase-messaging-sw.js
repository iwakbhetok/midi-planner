/* public/firebase-messaging-sw.js */
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDuaQ7mQxjIgMJmgpLfg8BEaKkzAUfJLeU",
    authDomain: "midi-kriing-d2daf.firebaseapp.com",
    projectId: "midi-kriing-d2daf",
    storageBucket: "midi-kriing-d2daf.firebasestorage.app",
    messagingSenderId: "1059846857029",
    appId: "1:1059846857029:web:e95e0fd3cf84cb199d5e2c"
});


const messaging = firebase.messaging();

// 3. Listen for background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { title, body, image } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: image, // fallback icon
    image,       // large image in notification
    tag: 'campaign-notification', // optional tag to group similar
    data: payload.data,           // optionally include data
  });
});
