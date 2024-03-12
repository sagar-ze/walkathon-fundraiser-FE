import { Button, Card, CardContent, Grid } from '@mui/material';
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loadStripe } from '@stripe/stripe-js';
import { StripeElementsOptions } from '@stripe/stripe-js';

const PaymentGatewayForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    console.log('reached here');
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log('reached here to return ');

      return;
    }
    console.log('reached here 3 ');

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const isLoading = false;

  return (
    <Grid item xs={12}>
      <form onSubmit={handleSubmit}>
        <PaymentElement
          options={{
            // readOnly: !amount,
            layout: { type: 'accordion', spacedAccordionItems: true },
          }}
        />
        <Button
          disabled={isLoading || !stripe || !elements}
          type="submit"
          color="success"
          variant="contained"
          sx={{ background: '#5cb85c', mt: 2 }}
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay now'
            )}
          </span>
        </Button>
      </form>
    </Grid>
  );
};

const DonateForm = () => {
  const stripePromise = loadStripe(
    'pk_test_51OrlbgA2PWKnytWNPXitTnSCp6CgIPHnLmoyX10qDKB0Li1U0HPn4vPHpcAVr2BsRcMDRoK73AMnMSxr7t0pOLSN00cj00LP6i',
  );

  const { control, watch } = useForm({
    resolver: zodResolver(
      z.object({ amount: z.number().min(0.5).max(99999999) }),
    ),
  });
  const amount = watch('amount');

  const options: StripeElementsOptions = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    paymentMethodTypes: ['card'],
    // paymentMethodCreation:{}
    externalPaymentMethodTypes: ['external_interac'],
    // Fully customizable with appearance API.
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <Grid container>
      <Elements stripe={stripePromise} options={options}>
        <Card sx={{ width: 450 }}>
          <CardContent>
            <Grid container>
              <Grid item xs={12} sx={{ mb: 2 }}></Grid>

              <PaymentGatewayForm />
            </Grid>
          </CardContent>
        </Card>
      </Elements>
    </Grid>
  );
};

export default DonateForm;
