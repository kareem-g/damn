/* eslint-disable @typescript-eslint/no-explicit-any */
import {MinusIcon, PlusIcon} from '@heroicons/react/20/solid';
import {createCart} from 'middlewares/createCart.middleware';
import {getCart} from 'middlewares/getCart.middleware';
import {getParticipantInformation} from 'middlewares/getParticipantInformation.middleware';
import {ITour} from 'models/tour';
import {IGroup, ISlot, ISlotProduct} from 'models/tourGroups';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  TicketInterface,
  addTicketsToCart,
  checkoutState,
  clearTicketsAndTotal,
  removeTicketFromCart,
} from 'slices/checkout.slice';
import {toursState} from 'slices/tour.slice';
import {useAppDispatch, useAppSelector} from 'store/hook';
import {classNames} from 'utils/classNames';
import Currencies from 'assets/currencies.json';

const Ticket = ({groupItem, tour}: {groupItem: IGroup; tour: ITour}) => {
  const {cartItems, cartUUID} = useAppSelector(checkoutState);
  const {selectedPickupUuid} = useAppSelector(toursState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [selectedSlot, setSelectedSlot] = useState<ISlot | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<{
    name: string;
    code: string;
  }>({name: '', code: ''});

  const getItemCurrentNumberOfTickets = (item: TicketInterface) => {
    const {ticket, group} = item;
    const targetGroup = cartItems.find(
      (item) => item.item.group.name === group.name
    );
    if (targetGroup) {
      const targetTicket = targetGroup.item?.group?.tickets?.find(
        (ticketItem) => ticketItem.ticket_id === ticket.name
      );

      if (targetTicket) {
        return targetTicket.quantity ?? 0;
      }
    }

    return 0;
  };

  useEffect(() => {
    if (cartUUID) {
      dispatch(getCart(cartUUID));
    }
    if (groupItem.slots[0].languages[0]) {
      setSelectedLanguage(groupItem.slots[0].languages[0]);
    }
    if (groupItem?.slots.length === 1) {
      setSelectedSlot(groupItem?.slots[0]);
      dispatch(clearTicketsAndTotal());
    }
  }, []);
  const getTicketParams = ({
    tour,
    ticket,
    language,
    pickupUuid,
    groupName,
  }: {
    tour?: ITour;
    ticket: ISlotProduct;
    language: {name: string; code: string};
    pickupUuid: string;
    groupName: string;
  }) =>
    ({
      ...(tour && {tour: tour}),
      ticket,
      group: {
        pickupUuid: pickupUuid,
        language: language,
        name: groupName,
        tickets: [
          {
            max_buy: ticket.max_buy,
            min_buy: ticket.min_buy,
            product_id: ticket.product_id,
            name: ticket.name,
            price: ticket.retail_price.value,
            quantity: 0,
            ticket_id: '',
            language: language,
          },
        ],
      },
    } as TicketInterface);
  const total = selectedSlot?.products.reduce(
    (accumulator: number, item: ISlotProduct) => {
      const numberOfTickets = getItemCurrentNumberOfTickets(
        getTicketParams({
          ticket: item,
          pickupUuid: selectedPickupUuid,
          language: selectedLanguage,
          groupName: groupItem.name,
        })
      );

      const retailPrice = item?.retail_price?.value;

      const result = numberOfTickets * retailPrice;

      return accumulator + result; // Accumulate the results
    },
    0
  );

  // Display the total, rounded to 0 decimal places
  const totalRounded = total?.toFixed(0);

  const handleUpdateCart = () => {
    if (cartUUID) {
      dispatch(getCart(cartUUID)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/cart');
        }
      });
    } else {
      const data = cartItems
        .map((item) =>
          item.item.group.tickets.map((ticket) => {
            if (cartUUID) {
              dispatch(
                getParticipantInformation({
                  cartUuid: cartUUID,
                  cartItemUuid: item.item.ticket.product_id,
                })
              );
            }
            return {
              type: item.item.ticket.type,
              product_identifier: item.item.ticket.product_id,
              quantity: ticket.quantity,
              pickup: item.item.group.pickupUuid as string,
            };
          })
        )
        .flat();
      dispatch(createCart(data)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/cart');
        }
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col w-[778px] items-start justify-center gap-[24px] pt-[24px] pb-0 px-0 relative">
        <p className="relative w-[443px] mt-[-1.00px] [font-family:var(--netflix-18-font-family)] font-[number:var(--netflix-18-font-weight)] text-[color:var(--themes-black-100)] text-[length:var(--netflix-18-font-size)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] [font-style:var(--netflix-18-font-style)]">
          <span className="text-[--variable-collection-dark]  [font-family:var(--netflix-18-font-family)] [font-style:var(--netflix-18-font-style)] font-[number:var(--netflix-18-font-weight)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] text-[length:var(--netflix-18-font-size)]">
            Select Ticket and Preferences for -{' '}
          </span>
          <span className="text-[#1e90ff] [font-family:var(--netflix-18-font-family)] [font-style:var(--netflix-18-font-style)] font-[number:var(--netflix-18-font-weight)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] text-[length:var(--netflix-18-font-size)]">
            {groupItem?.name}
          </span>
        </p>
        <hr className="!self-stretch !flex-[0_0_auto] w-full" />
        <div className="inline-flex items-center gap-[24px] relative flex-[0_0_auto]">
          <div className="inline-flex flex-col items-center gap-[8px] relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:var(--netflix-18-font-family)] font-[number:var(--netflix-18-font-weight)] text-[color:var(--variable-collection-black)] text-[length:var(--netflix-18-font-size)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] whitespace-nowrap [font-style:var(--netflix-18-font-style)]">
              Select Time:
            </div>
          </div>
          {groupItem?.slots.map((item: ISlot, index: number) => (
            <button
              key={index}
              onClick={() => {
                setSelectedSlot(item);
                dispatch(clearTicketsAndTotal());
              }}
              className={` font-bold border-[1px] rounded-full px-5 py-1.5 border-black ${
                selectedSlot?.time === item.time
                  ? 'bg-blue-400 text-white'
                  : 'text-[#1E90FF] bg-white'
              }`}>
              {item.time}
            </button>
          ))}
        </div>

        {/* Language */}
        {groupItem.slots[0].languages[0] ? (
          <div className="inline-flex flex-row items-center gap-[8px] relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:var(--netflix-18-font-family)] font-[number:var(--netflix-18-font-weight)] text-[color:var(--variable-collection-black)] text-[length:var(--netflix-18-font-size)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] whitespace-nowrap [font-style:var(--netflix-18-font-style)]">
              Select Language:
            </div>
            {groupItem?.slots.map((item: ISlot, index: number) => (
              <button
                key={index}
                className="text-[#1E90FF] bg-white font-bold border-[1px] rounded-full px-5 py-1.5 border-black">
                <select
                  onChange={(e) => {
                    setSelectedLanguage(JSON.parse(e.target.value));
                  }}
                  className="outline-none border-none ring-0 focus-within:ring-0 px-4 py-1 cursor-pointer">
                  {item.languages.map((lang) => (
                    <option
                      key={lang.code}
                      value={JSON.stringify({
                        name: lang.name,
                        code: lang.code,
                      })}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </button>
            ))}
          </div>
        ) : null}

        <hr className="!self-stretch !flex-[0_0_auto] w-full" />
        <div className="flex flex-wrap items-start gap-[24px_24px] relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex flex-col items-center gap-[8px] relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:var(--netflix-18-font-family)] font-[number:var(--netflix-18-font-weight)] text-[color:var(--variable-collection-black)] text-[length:var(--netflix-18-font-size)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] whitespace-nowrap [font-style:var(--netflix-18-font-style)]">
              Choose Ticket:
            </div>
          </div>

          <div className="flex flex-col w-[778px] items-start gap-[24px] relative">
            {selectedSlot?.products.map((item: ISlotProduct) => (
              <div
                key={item.product_id}
                className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative w-fit [font-family:'Roboto-Regular',Helvetica] font-normal text-[color:var(--variable-collection-blue-2)] text-[14px] tracking-[0] leading-[normal] whitespace-nowrap">
                  <span className="text-[--variable-collection-dark] ">
                    {item.name} -{' '}
                  </span>
                  <span className="[font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#7db347]">
                    {item.retail_price.formatted_iso_value}
                  </span>
                </p>
                <div className="inline-flex items-center justify-center gap-[8px] relative bg-[--variable-collection-white] rounded-[10px] border-y-2 border-solid border-[#1c1c1c80]">
                  <button
                    onClick={() =>
                      dispatch(
                        removeTicketFromCart(
                          getTicketParams({
                            ticket: item,
                            pickupUuid: selectedPickupUuid,
                            groupName: groupItem.name,
                            language: selectedLanguage,
                          })
                        )
                      )
                    }
                    className={classNames(
                      'rounded-[4.57px_0px_0px_4.57px] flex w-[24px] items-center justify-center gap-[5.14px] px-[20.57px] py-[6.29px] relative',
                      getItemCurrentNumberOfTickets(
                        getTicketParams({
                          ticket: item,
                          pickupUuid: selectedPickupUuid,
                          groupName: groupItem.name,
                          language: selectedLanguage,
                        })
                      ) > 0
                        ? 'bg-[--variable-collection-blue-2]'
                        : 'bg-[#9eb0c1]'
                    )}>
                    <MinusIcon
                      className="!relative !w-[11.43px] !h-[11.43px] !ml-[-14.29px] !mr-[-14.29px]"
                      color="#F8FBFF"
                    />
                  </button>
                  <span className="relative w-fit [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[--variable-collection-blue-2] text-[14px] tracking-[0] leading-[normal] whitespace-nowrap">
                    {getItemCurrentNumberOfTickets(
                      getTicketParams({
                        ticket: item,
                        pickupUuid: selectedPickupUuid,
                        groupName: groupItem.name,
                        language: selectedLanguage,
                      })
                    )}
                  </span>
                  <button
                    disabled={
                      getItemCurrentNumberOfTickets(
                        getTicketParams({
                          ticket: item,
                          pickupUuid: selectedPickupUuid,
                          groupName: groupItem.name,
                          language: selectedLanguage,
                        })
                      ) === item.max_buy
                    }
                    onClick={() =>
                      dispatch(
                        addTicketsToCart(
                          getTicketParams({
                            ticket: item,
                            tour: tour,
                            language: selectedLanguage,
                            pickupUuid: selectedPickupUuid,
                            groupName: groupItem.name,
                          })
                        )
                      )
                    }
                    className={classNames(
                      'bg-[--variable-collection-blue-2] rounded-[0px_4.57px_4.57px_0px] flex w-[24px] items-center justify-center gap-[5.14px] px-[20.57px] py-[6.29px] relative',
                      getItemCurrentNumberOfTickets(
                        getTicketParams({
                          ticket: item,
                          pickupUuid: selectedPickupUuid,
                          groupName: groupItem.name,
                          language: selectedLanguage,
                        })
                      ) === item.max_buy
                        ? 'bg-gray-400'
                        : ''
                    )}>
                    <PlusIcon
                      className="!relative !w-[11.43px] !h-[11.43px] !ml-[-14.29px] !mr-[-14.29px]"
                      color="#F8FBFF"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex flex-col items-center gap-[8px] relative flex-[0_0_auto]">
            <p className="relative w-fit mt-[-1.00px] [font-family:var(--netflix-18-font-family)] font-[number:var(--netflix-18-font-weight)] text-[color:var(--variable-collection-black)] text-[length:var(--netflix-18-font-size)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] whitespace-nowrap [font-style:var(--netflix-18-font-style)]">
              <span className="text-[--variable-collection-dark]  [font-family:var(--netflix-18-font-family)] [font-style:var(--netflix-18-font-style)] font-[number:var(--netflix-18-font-weight)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] text-[length:var(--netflix-18-font-size)]">
                Total:{' '}
              </span>
              <span className="text-[#7db347] [font-family:var(--netflix-18-font-family)] [font-style:var(--netflix-18-font-style)] font-[number:var(--netflix-18-font-weight)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] text-[length:var(--netflix-18-font-size)]">
                {
                  Currencies.find(
                    (item) =>
                      item.code === (localStorage.getItem('curr') ?? 'USD')
                  )?.symbol
                }
                {Number(totalRounded) > 0 ? totalRounded : 0}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-5">
            <button
              disabled={cartItems?.length === 0}
              onClick={() => handleUpdateCart()}
              className="px-[16px] py-[6px] bg-[color:var(--variable-collection-green)] rounded-[8px] inline-flex items-center justify-center gap-[8px] relative flex-[0_0_auto] border border-solid border-[#1c1c1c80]">
              <div className="relative w-fit mt-[-1.00px] [font-family:var(--netflix-18-font-family)] font-[number:var(--netflix-18-font-weight)] text-[color:var(--variable-collection-dark)] text-[length:var(--netflix-18-font-size)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] whitespace-nowrap [font-style:var(--netflix-18-font-style)]">
                Add Tour To Cart
              </div>
            </button>
            <button
              onClick={() => handleUpdateCart()}
              className="px-[16px] py-[6px] border-[color:var(--variable-collection-green)] rounded-[8px] inline-flex items-center justify-center gap-[8px] relative flex-[0_0_auto] border border-solid">
              <div className="relative w-fit mt-[-1.00px] [font-family:var(--netflix-18-font-family)] font-[number:var(--netflix-18-font-weight)] text-[color:var(--variable-collection-dark)] text-[length:var(--netflix-18-font-size)] tracking-[var(--netflix-18-letter-spacing)] leading-[var(--netflix-18-line-height)] whitespace-nowrap [font-style:var(--netflix-18-font-style)]">
                Go To Checkout
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
