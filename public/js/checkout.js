window.onload =function () {
    checkout();
}
function checkout(){
    var stripe = Stripe('pk_test_jIqxnQmfEa1SDhkNrOS1qhZT');
    var elements = stripe.elements();
    var  form  = document.getElementById('checkout-form');
    var style = {
        base: {
          // Add your base input styles here. For example:
          fontSize: '16px',
          color: "#32325d",
        }
      };
    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});
    
    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');
    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });
      console.log(card);
    form.addEventListener('submit', function(event) {
        
    
       // document.getElementById('button').disabled =true;
     
      
    
        stripe.createToken(card).then(function(result) {
          if (result.error) {
            // Inform the customer that there was an error.
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } 
          else{
            // Send the token to your server.
            stripeTokenHandler(result.token);
            console.log(token);
            
        }
        });
      });
    
    
        function stripeTokenHandler(token) {
          
            //var token=response.id;
            //get the token id
            const hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'text');
            hiddenInput.setAttribute('name', 'stripeToken');
            //var hiddenInput = document.getElementById('hidden-input');

            hiddenInput.setAttribute('value', token.id);
            form.appendChild(hiddenInput);
            //hiddenInput.value =token.id;
            console.log(token.id);
            // Submit the form
            form.submit();
        }
    
    
    }