// Mostrar/ocultar métodos de pago
document.querySelectorAll('input[name="payment_method"]').forEach((elem) => {
    elem.addEventListener('change', function(event) {
        document.getElementById('paypal-button-container').style.display = 'none';
        document.getElementById('stripe-card-element').style.display = 'none';
        document.getElementById('bizum-container').style.display = 'none';

        if (event.target.value === 'paypal') {
            document.getElementById('paypal-button-container').style.display = 'block';
        } else if (event.target.value === 'credit_card') {
            document.getElementById('stripe-card-element').style.display = 'block';
        } else if (event.target.value === 'bizum') {
            document.getElementById('bizum-container').style.display = 'block';
        }
    });
});

// Integrar PayPal
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: document.getElementById('total-amount').textContent
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
        });
    }
}).render('#paypal-button-container');

// Integrar Stripe
var stripe = Stripe('YOUR_PUBLISHABLE_KEY');
var elements = stripe.elements();
var card = elements.create('card');
card.mount('#stripe-card-element');

var form = document.getElementById('purchase-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
        if (result.error) {
            // Informar al usuario sobre el error
            console.error(result.error.message);
        } else {
            // Enviar el token al servidor
            console.log('Token creado:', result.token);
        }
    });
});

// Actualizar el total
function updateTotal() {
    var quantity = document.getElementById('quantity').value;
    var ticketType = document.getElementById('ticket-type').value;
    var pricePerTicket = ticketType === 'vip' ? 0.10 : 0.01; // Precio según el tipo de entrada
    var total = quantity * pricePerTicket;
    document.getElementById('total-amount').textContent = total.toFixed(2);
}
