import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import rightArrow from '../assets/rightArrow.svg';
import '../Form.css'; // Import the CSS file

const stripePromise = loadStripe('pk_test_51PUvGYDnU0bnacSN8IVpRzur6MRgdxgSumM0E2SmFBGcCY1XieKrADjLJlKImzdIiLmFuaNimjMZPlEsWWlLudAH00v0A0af9I');

const CheckoutForm: React.FC<{ amount: number, nextSlide: () => void }> = ({ amount, nextSlide }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch('http://localhost:4242/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }), // Stripe expects amount in cents
    });

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: 'Donor',
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment successful!');
        nextSlide(); // Move to the next slide on successful payment
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="question">
        <span className="number">4</span>
        <img src={rightArrow} className="arrow" alt="Right Arrow" />
        You can easily complete your donation in the form below. All you need is a credit card.
      </div>
      <div className="description">
        Your credit card will be charged ${amount}.
      </div>
      <CardElement className="card-element" />
      <button type="submit" className="ok-button" disabled={!stripe}>
        Submit
      </button>
    </form>
  );
};

const Slide5: React.FC<{ nextSlide: () => void, amount: number }> = ({ nextSlide, amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} nextSlide={nextSlide} />
    </Elements>
  );
};

export default Slide5;
