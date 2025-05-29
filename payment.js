// Stripe public key - Replace with your actual publishable key from Stripe dashboard
const stripe = Stripe('your_publishable_key');

// Handle purchase button click
async function handlePurchase() {
    try {
        const button = document.getElementById('purchase-button');
        const message = document.getElementById('payment-message');
        
        // Disable button to prevent multiple clicks
        button.disabled = true;
        message.textContent = 'جاري تجهيز عملية الدفع...';
        
        // Create checkout session
        const response = await fetch('/.netlify/functions/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: 'price_H5ggYwtDq123456', // Replace with your actual price ID
                successUrl: window.location.origin + '/success.html',
                cancelUrl: window.location.origin + '/cancel.html'
            })
        });

        const session = await response.json();

        // Redirect to Stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            message.textContent = 'حدث خطأ في عملية الدفع. الرجاء المحاولة مرة أخرى.';
            button.disabled = false;
        }
    } catch (error) {
        const message = document.getElementById('payment-message');
        message.textContent = 'حدث خطأ في عملية الدفع. الرجاء المحاولة مرة أخرى.';
        button.disabled = false;
    }
}

// Initialize Apple Pay
async function initializeApplePay() {
    if (!window.ApplePaySession) {
        return;
    }

    const applePayButton = document.getElementById('apple-pay-button');
    
    // Check if the device supports Apple Pay
    if (ApplePaySession.canMakePayments()) {
        applePayButton.style.display = 'block';
        
        applePayButton.addEventListener('click', async () => {
            const session = new ApplePaySession(3, {
                countryCode: 'AE',
                currencyCode: 'AED',
                supportedNetworks: ['amex', 'masterCard', 'visa'],
                merchantCapabilities: ['supports3DS'],
                total: {
                    label: 'حاسبة الذهب',
                    amount: '9.99' // Replace with your actual price
                }
            });

            session.onpaymentauthorized = async (event) => {
                try {
                    // Process payment with your backend
                    const response = await fetch('/.netlify/functions/process-apple-pay', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(event.payment)
                    });

                    if (response.ok) {
                        session.completePayment(ApplePaySession.STATUS_SUCCESS);
                        window.location.href = '/success.html';
                    } else {
                        session.completePayment(ApplePaySession.STATUS_FAILURE);
                    }
                } catch (error) {
                    session.completePayment(ApplePaySession.STATUS_FAILURE);
                }
            };

            session.begin();
        });
    }
}

// Initialize payment methods when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeApplePay();
});
