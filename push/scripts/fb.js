const messaging = firebase.messaging();
 messaging
   .requestPermission()
   .then(function () {
     
     console.log("Notification permission granted.");

     // get the token in the form of promise
     return messaging.getToken()
   })
   .then(function(token) {
     // print the token on the HTML page
      const subscriptionJson = document.querySelector('.js-subscription-json');
    
      const subscriptionDetails =
        document.querySelector('.js-subscription-details');

      subscriptionJson.textContent = "Device token is : " + token
      subscriptionDetails.classList.remove('is-invisible');

   })
   .catch(function (err) {
   
   console.log("Unable to get permission to notify.", err);
 });