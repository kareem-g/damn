/* eslint-disable @typescript-eslint/no-explicit-any */
import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/root-reducer';
import {ITour} from '../models/tour';
import {Dayjs} from 'dayjs';
import {ISlotProduct} from 'models/tourGroups';
import {getCartCustomerDataSchema} from 'middlewares/getCartCustomerDataSchema.middleware';
import {getParticipantInformation} from 'middlewares/getParticipantInformation.middleware';
import {createCart} from 'middlewares/createCart.middleware';
import {getCart} from 'middlewares/getCart.middleware';

export interface TicketInterface {
  tour?: ITour;
  ticket: ISlotProduct;

  group: {
    pickupUuid: string | undefined;
    name: string;
    language?: {
      name: string;
      code: string;
    };
    tickets: [
      {
        min_buy: number | string;
        max_buy: number | string;
        ticket_id: string;
        product_id: string | undefined;
        name: string;
        quantity: number;
        price: string | number;
        language?: {
          name: string;
          code: string;
        };
      }
    ];
  };
}
export interface ITourTicket extends ITour {
  tour?: ITour;
  tickets: TicketInterface[];
  selectedTourDateAndTime?: {
    date: Dayjs | null;
    time: string | null;
  };
}

interface Cart {
  uuid: string;
  items: CartItems[] | [];
  full_price: Price;
  full_price_without_service_fee: Price;
  discount: Price;
  total_discount: Price;
  retail_price: Price;
  retail_price_without_service_fee: Price;
  service_fee: Price;
  preferred_payment_gateway: string;
}

interface ISelectedOptions {
  [ticketId: string]: ISlotProduct[]; // Store an array of selected options for each ticket
}

interface Price {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

export interface CartItem {
  item: TicketInterface;
}
interface ApiRequestSchema {
  title: string;
  type: string;
  required: any[];
  properties: {
    firstname: string;
    lastname: string;
    email: string;
    musement_newsletter: string;
    allow_profiling: string;
    thirdparty_newsletter: string;
    events_related_newsletter: string;
    city: string;
    address: string;
    zipcode: string;
    tax_id: string;
    extra_customer_data: {
      [key: string]: any;
    };
  };
}
interface ICheckoutState {
  cartProducts: ITourTicket[];
  total: number;
  cartUUID: string | null;
  tickets: TicketInterface[];
  customerDataSchema: ApiRequestSchema | null;
  participantInformation: {requiredField: any}[];
  extraCustomerData: {requiredField: any; id: string}[];
  totalTickets: number;
  cart: Cart | null;
  selectedOptions: ISelectedOptions; // Add this property
  cartItems: CartItem[];
  itemsParticipantInformation: {requiredField: any}[];
  participants: {fields: {requiredField: any}[]}[];
}

const initialState: ICheckoutState = {
  cartProducts: [],
  total: 0,
  cartUUID: localStorage.getItem('cartUUID') ?? null,
  tickets: [],
  totalTickets: 0,
  participantInformation: [],
  extraCustomerData: [],
  customerDataSchema: null,
  cart: null,
  selectedOptions: {},
  cartItems: [], // Initialize as an empty array,
  itemsParticipantInformation: [],
  participants: [],
};

export interface CartItems {
  product_id: string;
  quantity: number;
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCart: (state, action: {payload: Cart}) => {
      state.cart = action.payload;
    },
    updateCartItems: (state, action: {payload: CartItems[]}) => {
      if (state.cart) {
        state.cart.items = [...action.payload];
      }
    },

    addTicketsToCart: (state, action: PayloadAction<TicketInterface>) => {
      const {ticket, group, tour} = action.payload;

      let ticketIndex: any;
      // function calculateTotalPriceOfSelectedTickets(
      //   cartItems: CartItem[]
      // ): number {
      //   return cartItems.reduce((totalPrice, cartItem) => {
      //     const groupTotalPrice = cartItem.item.group.tickets.reduce(
      //       (groupTotalPrice, ticketItem) => {
      //         return groupTotalPrice + ticketItem.price * ticketItem.quantity;
      //       },
      //       0
      //     );

      //     // Check if the group.tickets array is empty.
      //     // @ts-ignore
      //     if (cartItem.item.group.tickets.length === 0) {
      //       return totalPrice;
      //     }

      //     return totalPrice + groupTotalPrice;
      //   }, 0);
      // }

      // Check if the group already exists in the cart.
      const existingGroupIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.item.group.name === group.name
      );
      const existingTicket =
        state.cartItems[existingGroupIndex]?.item?.group?.tickets[ticketIndex!];
      if (existingGroupIndex !== -1) {
        // If the group exists, find the ticket in the group and increment its quantity.
        const existingTicketIndex = state.cartItems[
          existingGroupIndex
        ].item.group.tickets.findIndex(
          (ticketItem) => ticketItem.ticket_id === ticket.name
        );

        ticketIndex = existingTicketIndex;
        if (existingTicketIndex !== -1) {
          state.cartItems[existingGroupIndex].item.group.tickets[
            existingTicketIndex
          ].quantity += 1;
        } else {
          // If the ticket doesn't exist in the group, add it.
          state.cartItems[existingGroupIndex].item.group.tickets.push({
            min_buy: ticket.min_buy,
            max_buy: ticket.max_buy,
            ticket_id: ticket.name,
            product_id: existingTicket?.product_id,
            name: ticket.name,
            quantity: 1, // Set an initial quantity
            price: ticket.retail_price.value,
            language: {
              code: 'de',
              name: 'German',
            },
          });
        }
      } else {
        // If the group doesn't exist, create a new group and add the ticket to it.
        state.cartItems.push({
          item: {
            tour: tour,
            ticket: ticket,
            group: {
              pickupUuid: group.pickupUuid,
              language: {
                name: group.language?.name as string,
                code: group.language?.code as string,
              },
              // totalPriceOfSelectedTickets: calculateTotalPriceOfSelectedTickets(
              //   state.cartItems
              // ),
              name: group.name,
              tickets: [
                {
                  min_buy: ticket.min_buy,
                  max_buy: ticket.max_buy,
                  ticket_id: ticket.name,
                  product_id: existingTicket?.product_id,
                  name: ticket.name,
                  quantity: ticket.min_buy > 1 ? ticket.min_buy : 1, // Set an initial quantity
                  price: ticket.retail_price.value,
                  language: {
                    name: group.language?.name as string,
                    code: group.language?.code as string,
                  },
                },
              ],
            },
          },
        });
      }
    },

    // removeTicketFromCart(
    //   state,
    //   action: PayloadAction<RemoveTicketFromCartPayload>
    // ) {
    //   const { ticket_id } = action.payload;

    //   // Find the cart item that contains the ticket to be removed.
    //   const cartItemIndex = state.cartItems.findIndex((cartItem) =>
    //     cartItem.item.group.tickets.some(
    //       (ticketItem) => ticketItem.ticket_id === ticket_id
    //     )
    //   );

    //   if (cartItemIndex !== -1) {
    //     // Find the ticket in the cart item and remove it.
    //     const ticketIndex = state.cartItems[
    //       cartItemIndex
    //     ].item.group.tickets.findIndex(
    //       (ticketItem) => ticketItem.ticket_id === ticket_id
    //     );

    //     if (ticketIndex !== -1) {
    //       state.cartItems[cartItemIndex].item.group.tickets.splice(
    //         ticketIndex,
    //         1
    //       );
    //     }

    //     console.log("ticketIndex", ticketIndex);
    //     console.log("cartItemIndex", cartItemIndex);
    //     console.log("ticket_id", ticket_id);
    //     // If the cart item is empty after removing the ticket, remove the cart item.
    //     // if (state.cartItems[cartItemIndex].item.group.tickets) {
    //     //   if (state.cartItems[cartItemIndex].item.group.tickets.length === '0') {
    //     //     state.cartItems.splice(cartItemIndex, 1);
    //     //   }
    //     // }
    //   }
    // },

    // Remove Ticket from Cart
    removeCartItem: (state, {payload}: PayloadAction<TicketInterface>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.item.tour?.uuid !== payload.tour?.uuid
      );
    },
    removeTicketFromCart: (state, action: PayloadAction<TicketInterface>) => {
      const {ticket, group} = action.payload;

      const existingGroupIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.item.group.name === group.name
      );

      if (existingGroupIndex !== -1) {
        // If the group exists, find the ticket in the group and increment its quantity.
        const existingTicketIndex = state.cartItems[
          existingGroupIndex
        ].item.group.tickets.findIndex(
          (ticketItem: any) => ticketItem.ticket_id === ticket.name
        );

        // if (existingTicketIndex !== -1) {
        //   state.cartItems[existingGroupIndex].item.group.tickets[
        //     existingTicketIndex
        //   ].quantity ===
        //   state.cartItems[existingGroupIndex].item?.group?.tickets[
        //     existingTicketIndex
        //   ].min_buy
        //     ? -state.cartItems[existingGroupIndex].item?.group?.tickets[
        //         existingTicketIndex
        //       ].min_buy
        //     : -1;
        // }

        if (existingTicketIndex !== -1) {
          const currentQuantity =
            state.cartItems[existingGroupIndex].item.group.tickets[
              existingTicketIndex
            ].quantity;
          const minBuy =
            state.cartItems[existingGroupIndex].item.group.tickets[
              existingTicketIndex
            ].min_buy;

          if (currentQuantity === minBuy) {
            state.cartItems[existingGroupIndex].item.group.tickets[
              existingTicketIndex
            ].quantity -= minBuy;
          } else {
            state.cartItems[existingGroupIndex].item.group.tickets[
              existingTicketIndex
            ].quantity -= 1;
          }
        }

        // If the ticket quantity is 0, remove the ticket from the group.
        if (
          state.cartItems[existingGroupIndex].item.group.tickets[
            existingTicketIndex
          ]?.quantity === 0
        ) {
          state.cartItems[existingGroupIndex].item.group.tickets.splice(
            existingTicketIndex,
            1
          );
        }

        // If the group has no tickets, remove the group from the cart.
        if (
          (state.cartItems[existingGroupIndex].item.group.tickets
            .length as any) === 0
        ) {
          state.cartItems.splice(existingGroupIndex, 1);
        }
      }
    },

    clearTicketsAndTotal: (state) => {
      state.totalTickets = 0;
      state.tickets = [];
    },
    // setTickets: (
    //   state,
    //   { payload: tickets }: { payload: TicketInterface[] }
    // ) => {
    //   state.total = 0;
    //   state.tickets = tickets;
    //   tickets.forEach((ticket: TicketInterface) => {
    //     state.total += ticket.options.price;
    //   });
    // },
    clearCartTours: (state) => {
      state.cartProducts = [];
      state.tickets = [];
      state.total = 0;
      state.totalTickets = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getParticipantInformation.pending, (state) => {
      state.itemsParticipantInformation = [];
      state.participants = [];
    });
    builder.addCase(createCart.fulfilled, (state, {payload}) => {
      state.cartUUID = payload.uuid;
    });
    builder.addCase(getCart.fulfilled, (state, {payload}) => {
      state.cartUUID = payload.uuid;
    });

    builder.addCase(getParticipantInformation.fulfilled, (state, {payload}) => {
      Object.keys(payload.properties.participants.items.properties).forEach(
        (uuid: string) => {
          const target = state.itemsParticipantInformation.find(
            (item) =>
              item.requiredField.title ===
              payload.properties.participants.items.properties[uuid].title
          );
          console.log(target, uuid);
          if (
            target === undefined &&
            payload.properties.participants.items.required.includes(uuid)
          ) {
            state.itemsParticipantInformation.push({
              requiredField: {
                ...payload.properties.participants.items.properties[uuid],
                fieldId: uuid,
              },
            });
          }
        }
      );
      for (
        let index = 0;
        index < payload.properties.participants.minItems;
        index++
      ) {
        state.participants.push({fields: state.itemsParticipantInformation});
      }
    });
    builder.addCase(getCartCustomerDataSchema.pending, (state) => {
      state.participantInformation = [];
      state.extraCustomerData = [];
    });
    builder.addCase(getCartCustomerDataSchema.fulfilled, (state, {payload}) => {
      Object.keys(payload.properties).forEach((uuid: string) => {
        const target = state.participantInformation.find(
          (item) => item.requiredField.title === payload.properties[uuid].title
        );
        if (target === undefined && payload.required.includes(uuid))
          if (uuid === 'extra_customer_data') {
            const extraCustomerData = payload.properties[uuid];
            Object.keys(extraCustomerData.properties).forEach((field) => {
              const target = state.extraCustomerData.find(
                (item) =>
                  item.requiredField.title ===
                  extraCustomerData.properties[field].title
              );
              if (
                target === undefined &&
                extraCustomerData.required.includes(field)
              ) {
                Object.keys(
                  extraCustomerData.properties[field].properties
                ).forEach((fieldItem) => {
                  const fieldTarget = state.extraCustomerData.find(
                    (item) =>
                      item.id === field &&
                      item.requiredField.title ===
                        extraCustomerData.properties[field].properties[
                          fieldItem
                        ].title
                  );

                  if (fieldTarget === undefined) {
                    state.extraCustomerData.push({
                      id: field,
                      requiredField: {
                        ...extraCustomerData.properties[field].properties[
                          fieldItem
                        ],
                        fieldId: fieldItem,
                      },
                    });
                  }
                });
              }
            });
          } else {
            state.participantInformation.push({
              requiredField: {...payload.properties[uuid], fieldId: uuid},
            });
          }
      });
    });
  },
});
export const {
  // addProductToCart,
  // removeProductFromCart,
  removeTicketFromCart,
  addTicketsToCart,
  removeCartItem,
  // setTickets,
  clearCartTours,
  clearTicketsAndTotal,
  setCart,
  updateCartItems,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;

export const selectCart = createSelector(
  (state: any) => state.checkout,
  (checkout) => checkout.cart
);

export const selectAddedTicketsToCart = createSelector(
  (state: RootState) => state.checkout,
  (checkout) => checkout.tickets
);

export const checkoutState = (state: RootState) => state.checkout;
