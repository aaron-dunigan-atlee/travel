

/*
*
*  Based on the Push Notifications codelab
*  Which is Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, es6 */

'use strict';

const applicationServerPublicKey = 'BN-Ot_XbPruAt5Xk-KCpLEkkpza2Y0WKc9BAkF6nwT6vITYQ0Wdo79VqZJfaZDZCKjXXByRh94r0iy-weEd5m98';

const pushButton = document.querySelector('.js-push-btn');

const messaging = firebase.messaging();

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function updateSubscriptionOnServer(token) {

  const subscriptionJson = $('.js-subscription-json');
      
  const subscriptionDetails = $('.js-subscription-details');

  if (token) {
    subscriptionJson.text("Device token is : " + token)
    $('#register').attr('href', 'https://script.google.com/a/macros/expungeamerica.com/s/AKfycbyVS92bx0gqSN05_Mw6sHC2JUvImleY_Ya3nWQ7iMJaPt5r5zsW/exec?page=subscribe&token=' + token)

    subscriptionDetails.removeClass('is-invisible');
    
  } else {
    subscriptionDetails.addClass('is-invisible');
  }
}

function subscribeUser() {
  messaging
  .requestPermission()
  .then(function () {
    
    console.log("Notification permission granted.");

    // get the token in the form of promise
    return messaging.getToken({
      ServiceWorkerRegistration: swRegistration,
      vapidKey: applicationServerPublicKey
    })
  })
  .then(function(token) {
     console.log('User is subscribed.');

     updateSubscriptionOnServer(token);

  })
  .catch(function (err) {
  
    console.log("Unable to get permission to notify.", err);
    updateBtn();
  });

}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}

function initializeUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  messaging.getToken({
    ServiceWorkerRegistration: swRegistration,
    vapidKey: applicationServerPublicKey
  })
  .then(function(token) {
    isSubscribed = !(token === null);

    updateSubscriptionOnServer(token);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('scripts/firebase-messaging-sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    initializeUI();
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}


