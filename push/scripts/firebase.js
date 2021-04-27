'use strict';

let isSubscribed = false;
let swRegistration = null;

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('scripts/firebase-messaging-sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    // initializeUI();
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}


const messaging = firebase.messaging();
 messaging
   .requestPermission()
   .then(function () {
     
     console.log("Notification permission granted.");

     // get the token in the form of promise
     return messaging.getToken({
       ServiceWorkerRegistration: swRegistration,
       vapidKey: 'BN-Ot_XbPruAt5Xk-KCpLEkkpza2Y0WKc9BAkF6nwT6vITYQ0Wdo79VqZJfaZDZCKjXXByRh94r0iy-weEd5m98'
     })
   })
   .then(function(token) {
     // print the token on the HTML page
      const subscriptionJson = $('.js-subscription-json');
    
      const subscriptionDetails =
        $('.js-subscription-details');

      subscriptionJson.text("Device token is : " + token)

      $('#register').attr('href', 'https://script.google.com/a/macros/expungeamerica.com/s/AKfycbyVS92bx0gqSN05_Mw6sHC2JUvImleY_Ya3nWQ7iMJaPt5r5zsW/exec?page=subscribe&token=' + token)

      subscriptionDetails.removeClass('is-invisible');

   })
   .catch(function (err) {
   
   console.log("Unable to get permission to notify.", err);
 });
