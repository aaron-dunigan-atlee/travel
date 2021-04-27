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
