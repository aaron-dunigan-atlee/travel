
/* eslint-env browser, serviceworker, es6 */

'use strict';

/* eslint-disable max-len */

const applicationServerPublicKey = 'BN-Ot_XbPruAt5Xk-KCpLEkkpza2Y0WKc9BAkF6nwT6vITYQ0Wdo79VqZJfaZDZCKjXXByRh94r0iy-weEd5m98';

/* eslint-enable max-len */

importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyBNIYKNaXt-H_HQm2FZoWxMTW8nMMS0JBk",
  authDomain: "expunge-crm.firebaseapp.com",
  projectId: "expunge-crm",
  storageBucket: "expunge-crm.appspot.com",
  messagingSenderId: "229436343036",
  appId: "1:229436343036:web:b4559df366876ffb224d79",
  measurementId: "G-6MD33T2L5X"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});


self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');

});
