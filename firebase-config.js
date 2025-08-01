// firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDuaQ7mQxjIgMJmgpLfg8BEaKkzAUfJLeU",
    authDomain: "midi-kriing-d2daf.firebaseapp.com",
    projectId: "midi-kriing-d2daf",
    storageBucket: "midi-kriing-d2daf.firebasestorage.app",
    messagingSenderId: "1059846857029",
    appId: "1:1059846857029:web:e95e0fd3cf84cb199d5e2c"
  };

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
