import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import stripe

# This is your test secret API key.
stripe.api_key = 'sk_test_51PUvGYDnU0bnacSNwq7OdQiR2HI2Bv1Dm0NSiOnCFX4ueszKQV5e98Zo4Ya5G2jaGyKPDn8CA7by2A6v2pgx7WQo00IS4hdgFH'

app = Flask(__name__,
            static_url_path='',
            static_folder='public')

# Enable CORS
CORS(app)

YOUR_DOMAIN = 'http://localhost:3000'

@app.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.json
        amount = data['amount']
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403

if __name__ == '__main__':
    app.run(port=4242)
