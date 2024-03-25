import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js';
import {Elements} from '@stripe/react-stripe-js';
import {StripeElementsOptions, loadStripe} from '@stripe/stripe-js';
import {
  ArrowDown,
  Clock,
  EmptyCart,
  Ticket,
  Translate,
  Trash,
} from 'assets/icons';
import {FormikProps, useFormik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {CartItem, checkoutState, removeCartItem} from 'slices/checkout.slice';
import {useAppDispatch, useAppSelector} from 'store/hook';
import {Disclosure} from '@headlessui/react';
import {changeCurrentTab} from 'slices/appFunctionality.slice';
import {Tabs} from 'models/tabs';
import {useNavigate} from 'react-router-dom';
import {classNames} from 'utils/classNames';
import {ArrowLeftIcon} from '@mui/x-date-pickers';
import ParticipantInformation from 'components/Forms/Cart/ParticipantInformation';
import {createCart} from 'middlewares/createCart.middleware';
import CustomerForm from 'components/CustomerForm/CustomerForm';
import Stripe from 'components/Stripe/Stripe';
import Input from 'components/Input/Input';
import data from 'assets/data.json';
import * as Yup from 'yup';
import {updateCartItems} from 'middlewares/updateCartItems.middleware';
import {getCartCustomerDataSchema} from 'middlewares/getCartCustomerDataSchema.middleware';
import {getParticipantInformation} from '../../middlewares/getParticipantInformation.middleware';
import Currencies from 'assets/currencies.json';
import {putExtraCustomerData} from 'middlewares/putExtraCustomerData.middleware';
import {putParticipantData} from 'middlewares/putParticipantData.middleware';

const stripePromise = loadStripe(
  import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

interface AccordionOpenedProps {
  open: boolean;
  title: string;
  formik: FormikProps<any>;
  itemsParticipantInformation: {requiredField: any}[];
  itemUUID: string;
}
const AccordionOpened: React.FC<AccordionOpenedProps> = ({
  open,
  formik,
  itemsParticipantInformation,
  title,
  itemUUID,
}) => {
  useEffect(() => {
    formik.setFieldValue('itemUUID', itemUUID);
  }, []);
  if (open) {
    return (
      <>
        <Disclosure.Button className={'w-full'}>
          <div className="w-full flex flex-col self-stretch items-center  flex-[0_0_auto] text-left">
            <p
              className={`w-full [font-family:var(--bold-14px-font-family)] mt-[-1.00px] tracking-[var(--bold-14px-letter-spacing)] text-[length:var(--bold-14px-font-size)] [font-style:var(--bold-14px-font-style)] flex-1 font-[number:var(--bold-14px-font-weight)] leading-[var(--bold-14px-line-height)] relative ${'text-[color:var(--variable-collection-dark)]'}`}>
              <span
                className={`[font-family:var(--bold-14px-font-family)] [font-style:var(--bold-14px-font-style)] tracking-[var(--bold-14px-letter-spacing)] text-[length:var(--bold-14px-font-size)] font-[number:var(--bold-14px-font-weight)] leading-[var(--bold-14px-line-height)] text-[color:var(--variable-collection-dark)]`}>
                Participant Information for:{' '}
              </span>{' '}
              <span className="[font-family:var(--bold-14px-font-family)] [font-style:var(--bold-14px-font-style)] tracking-[var(--bold-14px-letter-spacing)] text-[length:var(--bold-14px-font-size)] text-[#1e90ff] font-[number:var(--bold-14px-font-weight)] leading-[var(--bold-14px-line-height)]">
                {title}
              </span>
            </p>
          </div>
        </Disclosure.Button>
        <Disclosure.Panel className={'w-full mt-5'}>
          <ParticipantInformation
            formik={formik}
            itemsParticipantInformation={itemsParticipantInformation}
          />

          <Disclosure.Button className={'w-full'}>
            <p className="flex items-center justify-between w-full mt-5">
              <span>Collapse</span>{' '}
              <ArrowDown
                className="w-6 h-6 rotate-180"
                fill="var(--variable-collection-dark)"
              />
            </p>
          </Disclosure.Button>
        </Disclosure.Panel>
      </>
    );
  }
  return (
    <>
      <Disclosure.Button className={'w-full'}>
        <div className="w-full flex flex-col self-stretch items-center  flex-[0_0_auto] text-left">
          <p
            className={`w-full [font-family:var(--bold-14px-font-family)] mt-[-1.00px] tracking-[var(--bold-14px-letter-spacing)] text-[length:var(--bold-14px-font-size)] [font-style:var(--bold-14px-font-style)] flex-1 font-[number:var(--bold-14px-font-weight)] leading-[var(--bold-14px-line-height)] relative ${'text-[color:var(--variable-collection-dark)]'}`}>
            <span
              className={`[font-family:var(--bold-14px-font-family)] [font-style:var(--bold-14px-font-style)] tracking-[var(--bold-14px-letter-spacing)] text-[length:var(--bold-14px-font-size)] font-[number:var(--bold-14px-font-weight)] leading-[var(--bold-14px-line-height)] text-[color:var(--variable-collection-dark)]`}>
              Participant Information for:{' '}
            </span>
            <span className="[font-family:var(--bold-14px-font-family)] [font-style:var(--bold-14px-font-style)] tracking-[var(--bold-14px-letter-spacing)] text-[length:var(--bold-14px-font-size)] text-[#1e90ff] font-[number:var(--bold-14px-font-weight)] leading-[var(--bold-14px-line-height)]">
              {title}
            </span>
          </p>
          <p className="flex items-center justify-between w-full ">
            <span>Expand</span>{' '}
            <ArrowDown
              className="w-6 h-6"
              fill="var(--variable-collection-dark)"
            />
          </p>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel className={'w-full'}></Disclosure.Panel>
    </>
  );
};
const Cart: React.FC = () => {
  const [booking, setBooking] = useState<boolean>(false);
  const {
    cartItems,
    participantInformation,
    extraCustomerData,
    itemsParticipantInformation,
    cartUUID,
    participants,
  } = useAppSelector(checkoutState);
  console.log(itemsParticipantInformation);
  const ref = useRef<HTMLDivElement | null>(null);
  const paymentRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const initialValues: {[key: string]: string} = {};

  useEffect(() => {
    itemsParticipantInformation.forEach((item) => {
      initialValues[item.requiredField.id as string] = '';
    });

    console.log(initialValues);
    if (!booking) {
      ref.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    } else {
      paymentRef.current?.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }, [booking]);

  const handleSetBooking = () => {
    setBooking((booking) => !booking);
  };

  const [clientSecret, setClientSecret] = useState<string>('');

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {theme: 'stripe'},
  };

  const goToHome = () => {
    navigate('/');
    dispatch(changeCurrentTab(Tabs.TOUR_HOME));
  };
  const getGrandTotal = () => {
    const total: number = cartItems.reduce(
      (price: number, tour: CartItem) =>
        tour.item.group.tickets[0].quantity *
          Number(tour.item.group.tickets[0].price) +
        price,
      0
    );
    return total;
  };

  const participantInfoForm = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit(values) {
      dispatch(
        putParticipantData({
          cartUuid: cartUUID as string,
          cartItemUuid: values.itemUUID,
          ...values,
        })
      );
      console.log('Form submitted with values:', values);
    },
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      nationality: '',
      extra_customer_data: {},
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      email: Yup.string().email().required(),
      nationality: Yup.string().required(),
    }),
    onSubmit(values) {
      dispatch(
        putExtraCustomerData({
          cartUuid: cartUUID,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          nationality: values.nationality,
          extra_customer_data: values.extra_customer_data,
        })
      );
      console.log('Form submitted with values:', values);
    },
  });
  const handleValueChange = (value: string) => {
    formik.setFieldValue('nationality', value);
  };
  useEffect(() => {
    fetch(import.meta.env.VITE_PAYMENT_URL_LINK, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        items: cartItems
          .map((item) =>
            item.item.group.tickets.map((ticket) => ({
              type: item.item.ticket.type,
              product_identifier: item.item.ticket.product_id,
              quantity: ticket.quantity,
              language: 'en',
              pickup: item.item.group.pickupUuid as string,
            }))
          )
          .flat(),
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  const handleRemove = (cartItem: CartItem) => {
    const data = cartItems
      .filter(
        (product) =>
          product.item.ticket.activity_uuid !==
            cartItem.item.ticket.activity_uuid &&
          product.item.tour?.uuid !== cartItem.item.tour?.uuid
      )
      .map((item) =>
        item.item.group.tickets.map((ticket) => ({
          type: item.item.ticket.type,
          product_identifier: item.item.ticket.product_id,
          quantity: ticket.quantity,
          language: 'en',
          pickup: item.item.group.pickupUuid as string,
        }))
      )
      .flat();
    dispatch(removeCartItem(cartItem.item));
    if (data.length === 0) {
      localStorage.removeItem('cartUUID');
    }
    if (data.length > 0) {
      dispatch(createCart({}))
        .then(() => {
          data.forEach((item) => {
            dispatch(
              updateCartItems({items: [item], cartUuid: cartUUID as string})
            ).then((res) => {
              const cartItemTour = res.payload;

              dispatch(
                getParticipantInformation({
                  cartUuid: cartUUID as string,
                  cartItemUuid: cartItemTour.uuid,
                })
              );
              dispatch(
                getCartCustomerDataSchema({cartUuid: cartUUID as string})
              );
            });
          });
        })
        .catch((error) => {
          console.error('Error creating cart:', error);
        });
    }
  };
  useEffect(() => {
    const items = cartItems
      .map((item) =>
        item.item.group.tickets.map((ticket) => ({
          type: item.item.ticket.type,
          product_identifier: item.item.ticket.product_id,
          quantity: ticket.quantity,
          // language: 'en',
          pickup: item.item.group.pickupUuid as string,
        }))
      )
      .flat();

    if (cartUUID) {
      items.forEach((item) => {
        dispatch(updateCartItems({items: [item], cartUuid: cartUUID})).then(
          (res) => {
            const cartItemTour = res.payload;
            if (res.meta.requestStatus === 'fulfilled') {
              dispatch(
                getParticipantInformation({
                  cartUuid: cartUUID,
                  cartItemUuid: cartItemTour.uuid,
                })
              );
              dispatch(getCartCustomerDataSchema({cartUuid: cartUUID}));
            }
          }
        );
      });
    } else {
      // If not in localStorage, create a new cart and store its UUID
      if (cartItems.length > 0) {
        const data = cartItems
          .map((item) =>
            item.item.group.tickets.map((ticket) => ({
              type: item.item.ticket.type,
              product_identifier: item.item.ticket.product_id,
              quantity: ticket.quantity,
              language: 'en',
              pickup: item.item.group.pickupUuid as string,
            }))
          )
          .flat();
        dispatch(createCart(data));
      }
    }
  }, []);

  if (cartItems?.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <EmptyCart width={400} height={400} className="mt-10" />
        <h1 className="text-2xl">
          Your Cart is Empty, Please Go To{' '}
          <button className="text-[#3594dc]" onClick={goToHome}>
            Shopping
          </button>
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[723px] items-start gap-[24px] pt-[16px] pb-0 px-0 relative">
      <div className="w-full flex flex-row items-center gap-[24px] pl-0 pr-[25px] py-0 relative flex-[0_0_auto] justify-between">
        <span className="relative w-[92px] [font-family:'Netflix_Sans_-Bold',Helvetica] font-bold text-[color:var(--variable-collection-black)] text-[32px] text-right tracking-[0] leading-[24px]">
          Cart
        </span>
      </div>
      <div className="flex  h-fit items-start gap-[10px] pl-[16px] pr-[24px] py-0 relative self-stretch w-full ">
        <div className="h-[80vh] px-6 overflow-y-auto max-w-[750px]">
          <div
            className="flex flex-col h-fit  items-start gap-[16px] relative flex-1 grow overflow-y-auto"
            ref={ref}>
            {cartItems?.map((cartItem) => {
              const tour = cartItem?.item?.tour;
              return (
                <div
                  key={tour?.uuid}
                  className="flex flex-col items-center gap-[16px] relative  w-full flex-[0_0_auto]">
                  <div className="flex flex-col w-full  items-center gap-[16px] p-[10px] relative flex-[0_0_auto] bg-[color:var(--variable-collection-white)] rounded-[10px]">
                    <div className="flex items-center gap-[16px] relative w-full flex-[0_0_auto]">
                      <div className="flex flex-col w-[251px] h-[211px] items-center gap-[10px] relative rounded-[4.96px] overflow-hidden  bg-cover bg-[50%_50%] bg-[color:var(--variable-collection-dark)]">
                        <img
                          className="relative w-[340px] h-[225px] ml-[-44.50px] mr-[-44.50px] object-cover"
                          alt="Unsplash gmshok"
                          src={tour!.cover_image_url}
                        />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-[16px] relative flex-1  text-left grow">
                        <p className="relative flex-1 items-start justify-start flex [font-family:'Netflix_Sans_-Bold',Helvetica] font-bold text-[color:var(--variable-collection-black)] text-[20px] tracking-[0] leading-[normal] ">
                          {tour?.title}
                        </p>

                        <div className="flex flex-col items-start gap-[4px] relative self-stretch w-full flex-[0_0_auto]">
                          <div className="flex items-center gap-[4px] relative self-stretch w-full flex-[0_0_auto]">
                            <Clock className="!relative !w-[16px] !h-[16px] text-[color:var(--variable-collection-dark)]" />
                            <p className="relative flex-1 mt-[-1.00px] [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-black)] text-[14px] tracking-[0] leading-[normal]">
                              Duration: 1 hour 30 minutes
                            </p>
                          </div>

                          {cartItem?.item?.group?.tickets?.map((ticket) => (
                            <div
                              key={ticket.ticket_id}
                              className="flex items-center gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
                              <Ticket className="relative !w-[16px] h-[16px] text-[color:var(--variable-collection-dark)]" />
                              <div className="flex flex-row">
                                <span className=" [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-black)] text-[14px] tracking-[0] leading-[24px] text-ellipsis line-clamp-1">
                                  {ticket.quantity} x {ticket.name}{' '}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {cartItem?.item?.group.language?.name ? (
                          <div className="flex items-center gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
                            <Translate className="!relative !w-[16px] !h-[16px] text-[color:var(--variable-collection-dark)]" />
                            <div className="relative flex-1 mt-[-1.00px] [font-family:'Netflix_Sans-Regular',Helvetica] font-normal text-[color:var(--variable-collection-black)] text-[14px] tracking-[0] leading-[24px]">
                              Tour in {cartItem?.item?.group.language?.name}
                            </div>
                          </div>
                        ) : null}

                        <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                          <div className="flex w-[185px] items-center justify-between relative">
                            {/* <button
                                // onClick={() => handleEdit(item.tour)}
                                className="inline-flex items-center gap-[10px] relative flex-[0_0_auto]">
                                <Edit className="!relative !w-[16px] !h-[16px] text-[color:var(--variable-collection-dark)]" />
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[color:var(--variable-collection-black)] text-[16px] tracking-[0] leading-[24px] underline whitespace-nowrap">
                                  Edit
                                </div>
                              </button> */}
                            <button
                              onClick={() => handleRemove(cartItem)}
                              className="inline-flex items-center gap-[10px] relative flex-[0_0_auto]">
                              <Trash
                                className="!relative !w-[16px] !h-[16px] text-[color:var(--variable-collection-dark)]"
                                color="#FF461E"
                              />
                              <div className="relative w-fit mt-[-1.00px] [font-family:'Netflix_Sans-Medium',Helvetica] font-medium text-[#ff461e] text-[16px] tracking-[0] leading-[24px] underline whitespace-nowrap">
                                Remove
                              </div>
                            </button>
                          </div>
                          <div className="inline-flex items-end justify-end gap-[4px] relative flex-[0_0_auto]">
                            <span className="relative w-fit mt-[-1.00px] [font-family:'Netflix_Sans_-Bold',Helvetica] font-bold text-[color:var(--variable-collection-green)] text-[20px] tracking-[0] leading-[normal]">
                              {
                                Currencies.find(
                                  (item) =>
                                    item.code ===
                                    (localStorage.getItem('curr') ?? 'USD')
                                )?.symbol
                              }{' '}
                              {cartItem?.item?.group.tickets[0].quantity *
                                Number(
                                  cartItem?.item?.group.tickets[0].price
                                )}{' '}
                              Total
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {participants.length > 0 ? (
                    <>
                      {participants.map((item, index) => (
                        <div
                          key={index}
                          className={`w-full flex flex-col items-start gap-[10px]`}>
                          <div className="w-full flex self-stretch flex-col items-start gap-[12px] flex-[0_0_auto] shadow-[var(--shadow-1)] px-[18px] py-[23px] rounded-[8px] bg-[color:var(--variable-collection-white)] relative">
                            <Disclosure>
                              {({open}) => (
                                <AccordionOpened
                                  title={'Adult Ticket ' + (index + 1)}
                                  open={open}
                                  itemsParticipantInformation={item.fields}
                                  formik={participantInfoForm}
                                  itemUUID={tour?.uuid as string}
                                />
                              )}
                            </Disclosure>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              );
            })}

            <div className="flex flex-col w-full items-start gap-[12px] px-[18px] py-[23px] relative flex-[0_0_auto] bg-[color:var(--variable-collection-white)] rounded-[8px] shadow-[var(--shadow-1)]">
              <div className="flex items-center gap-[225px] relative self-stretch w-full flex-[0_0_auto]">
                <span className="relative w-fit mt-[-1.00px] [font-family:var(--bold-14px-font-family)] font-[number:var(--bold-14px-font-weight)] text-[color:var(--variable-collection-dark2)] text-[length:var(--bold-14px-font-size)] tracking-[var(--bold-14px-letter-spacing)] leading-[var(--bold-14px-line-height)] whitespace-nowrap [font-style:var(--bold-14px-font-style)]">
                  Personal Details
                </span>
              </div>
              <div className="w-full flex flex-col items-center gap-6">
                <div className="w-full flex items-center justify-between gap-5">
                  <Input
                    name="firstName"
                    id="firstName"
                    label="First Name"
                    formik={formik}
                    type="text"
                    placeholder="Enter your first name...."
                  />
                  <Input
                    name="lastName"
                    id="lastName"
                    label="Last Name"
                    formik={formik}
                    type="text"
                    placeholder="Enter your last name...."
                  />
                </div>
                <div className="w-full flex items-center gap-5 justify-between">
                  <Input
                    name="email"
                    id="email"
                    label="Email Address"
                    formik={formik}
                    type="text"
                    placeholder="Enter your email address...."
                  />
                  <div className="relative w-full">
                    <label
                      htmlFor="nationality"
                      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                      Nationality
                    </label>
                    <select
                      id="nationality"
                      name="nationality"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[color:var(--variable-collection-blue-2)] sm:text-sm sm:leading-6"
                      defaultValue={'Egyptian'}
                      onChange={(e) => handleValueChange(e.target.value)}>
                      {data.map((item) => (
                        <option key={item.num_code} value={item.nationality}>
                          {item.nationality}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <CustomerForm
                formik={formik}
                participantInformation={participantInformation}
                extraCustomerData={extraCustomerData}
              />
            </div>
          </div>

          <div
            ref={paymentRef}
            className="relative w-full h-fit min-h-[462px] bg-[color:var(--variable-theme-background)] rounded-[8px] overflow-hidden shadow-[0px_2px_6px_#00000024] p-4 space-y-6 mt-20">
            <span className=" [font-family:var(--bold-14px-font-family)] font-[number:var(--bold-14px-font-weight)] text-[color:var(--variable-collection-black)] text-[length:var(--bold-14px-font-size)] tracking-[var(--bold-14px-letter-spacing)] leading-[var(--bold-14px-line-height)] whitespace-nowrap [font-style:var(--bold-14px-font-style)]">
              Payment Method
            </span>

            <PayPalScriptProvider
              options={{
                clientId:
                  'AS9PBwF_1sQddSliAh4zrDu4Eylo1u5bKrtU7Om8erSGeXxX4d9hDQ27wuj_VOeXbWE6OfdrMSSdFCQC',
                currency: 'USD',
                intent: 'capture',
              }}>
              <PayPalButtons
                className="w-full"
                style={{
                  height: 55,
                  tagline: true,
                  layout: 'horizontal',
                }}
              />
            </PayPalScriptProvider>
            {clientSecret.length > 0 && (
              <Elements stripe={stripePromise} options={options}>
                <Stripe
                  cartId={cartUUID as string}
                  total={getGrandTotal()}
                  formik={formik}
                />
              </Elements>
            )}
          </div>
        </div>
        <div className="w-[402px] hidden xl:flex items-center gap-[10px] px-[17px] py-[18px] rounded-[4px] overflow-hidden border border-solid border-[color:var(--variable-collection-blue-2)] shadow-[var(--s-5)]   flex-col relative self-stretch bg-[color:var(--variable-collection-white)] h-fit">
          <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
            <span className="relative w-fit mt-[-1.00px] [font-family:var(--bold-16px-font-family)] font-[number:var(--bold-16px-font-weight)] text-[color:var(--variable-collection-dark)] text-[length:var(--bold-16px-font-size)] tracking-[var(--bold-16px-letter-spacing)] leading-[var(--bold-16px-line-height)] whitespace-nowrap [font-style:var(--bold-16px-font-style)]">
              Billing Summary
            </span>
            <ArrowDown
              className="w-5 h-5 rotate-180"
              fill="var(--variable-collection-dark)"
            />
          </div>
          <hr className="w-full" />
          <div className="relative flex items-center justify-between w-full h-[38px]">
            <span className="[font-family:var(--bold-16px-font-family)] font-[number:var(--bold-16px-font-weight)] text-[color:var(--variable-collection-dark)] text-[length:var(--bold-16px-font-size)] tracking-[var(--bold-16px-letter-spacing)] leading-[var(--bold-16px-line-height)] [font-style:var(--bold-16px-font-style)]">
              Grand Total
            </span>
            <span className=" [font-family:var(--bold-16px-font-family)] font-[number:var(--bold-16px-font-weight)] text-[color:var(--variable-collection-green)] text-[length:var(--bold-16px-font-size)] tracking-[var(--bold-16px-letter-spacing)] leading-[var(--bold-16px-line-height)] [font-style:var(--bold-16px-font-style)]">
              {
                Currencies.find(
                  (item) =>
                    item.code === (localStorage.getItem('curr') ?? 'USD')
                )?.symbol
              }
              {getGrandTotal()}
            </span>
          </div>
          <button
            onClick={handleSetBooking}
            className={classNames(
              'rounded-lg h-[45px] w-full font-bold text-lg text-white',
              booking ? 'bg-[#818181]' : 'bg-[#1e90ff]'
            )}
            type="submit">
            {booking ? (
              <div className="flex items-center justify-center gap-3">
                <ArrowLeftIcon /> Go Back
              </div>
            ) : (
              'Book Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
