// push.js
import { messaging } from "./firebase-config";
import { getToken } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
    try {
      const token = await getToken(messaging, {
        vapidKey: "BCS0dgK60ScwKjIXzExhF74Bf4nxVB32tLOJkKIb6-1Gzr-m_C6JPiQj-WJueyDFSMH9RGT-7Hd5I39IeCf5XJE",
      });
      console.log("FCM Token:", token);
      // Send token to your backend/server here
    } catch (err) {
      console.error("An error occurred while retrieving token. ", err);
    }
  } else {
    console.log("Notification permission denied.");
  }
};
