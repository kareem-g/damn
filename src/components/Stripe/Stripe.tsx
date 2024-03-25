import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {createNewOrder} from 'middlewares/orders.middleware';
import {makeAPayment} from 'middlewares/makeAPayment.middleware';
import React, {FormEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'store/hook';
import './stripe.css';
import {FormikProps} from 'formik';
import {putExtraCustomerData} from 'middlewares/putExtraCustomerData.middleware';
import {authState} from 'slices/auth.slice';
import {IOrder} from 'models/order';

interface Props {
  total: number | string;
  cartId: string;
  formik: FormikProps<any>;
}
const Stripe: React.FC<Props> = ({total, cartId, formik}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useAppSelector(authState);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element

      elements,
      redirect: 'if_required',
    });

    if (result.error) {
      if (
        result.error.type === 'card_error' ||
        result.error.type === 'validation_error'
      ) {
        setMessage(result.error.message as string);
      } else {
        setMessage('An unexpected error occurred.');
      }
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.

      dispatch(
        putExtraCustomerData({
          cartUuid: cartId,
          email: formik.values.email,
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          nationality: formik.values.nationality,
          ...(Object.keys(formik.values.extra_customer_data).length > 0
            ? {
                extra_customer_data: formik.values.extra_customer_data,
              }
            : {extra_customer_data: null}),
        })
      ).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(
            createNewOrder({
              cart_uuid: cartId,
              email_notification: 'ALL',
              user_uuid: user?.uid as string,
              user_email: formik.values.email,
            })
          ).then((res) => {
            console.log(res);
            if (res.meta.requestStatus === 'fulfilled') {
              dispatch(
                makeAPayment({
                  order_uuid: (res.payload as IOrder)?.uuid as string,
                })
              ).then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                  navigate('/');
                }
              });
            }
          });
        }
      });
    }
  };
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <PaymentElement options={{layout: 'tabs'}} />
      <button
        type="submit"
        className="mt-10 rounded-lg h-[45px] w-full font-semibold text-lg text-white bg-[#1e90ff]"
        disabled={
          !stripe || !elements || isLoading || !formik.isValid || !formik.dirty
        }>
        {isLoading ? (
          <div className="spinner" id="spinner"></div>
        ) : (
          `Pay ${total} $`
        )}
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default Stripe;
