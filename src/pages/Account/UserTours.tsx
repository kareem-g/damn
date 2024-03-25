import {ArrowUpIcon} from '@heroicons/react/20/solid';
import CancelationPopup from 'components/CancelationPopup/CancelationPopup';
import {checkOrderItemRefundPolicy} from 'middlewares/orders.middleware';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {toursState} from 'slices/tour.slice';
import {useAppDispatch, useAppSelector} from 'store/hook';
import {classNames} from 'utils/classNames';
import {IDateFormat, dateFormatter} from 'utils/dateFormatter';

const UserTours = () => {
  const {orders} = useAppSelector(toursState);
  const dispatch = useAppDispatch();
  const [cancelationOpened, setCancelationOpened] = useState<boolean>(false);
  const handleOpenCancelationPopup = (
    order_uuid: string,
    item_uuid: string
  ) => {
    dispatch(
      checkOrderItemRefundPolicy({order_uuid: order_uuid, item_uuid: item_uuid})
    );
    setCancelationOpened((state) => !state);
  };
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900">Last 30 Tours</h3>
      {orders.map((order) => {
        console.log(order);
        return (
          <div key={order.order_uuid}>
            <h3 className="text-lg mt-10 font-bold text-gray-900">
              Order Date:{' '}
              {dateFormatter(
                order.createdAt,
                IDateFormat.NORMAL
              ).toLocaleString()}
            </h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {order.items.map((item) => (
                <div
                  key={item.uuid}
                  className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                  <CancelationPopup
                    cart_item_uuid={item.uuid}
                    item={item.product}
                    order_uuid={order.order_uuid}
                    isOpen={cancelationOpened}
                    setOpen={setCancelationOpened}
                  />
                  <dt>
                    <div className="absolute  ">
                      <img
                        src={item.product.cover_image_url}
                        className="h-12 w-12  rounded-md"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">
                      {item.product.title}
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {item.product.retail_price.value} $
                    </p>
                    <p
                      className={classNames(
                        //   item.changeType === 'increase'
                        'text-green-600',
                        // : 'text-red-600',
                        'ml-2 flex items-baseline text-sm font-semibold'
                      )}>
                      {/* {item.changeType === 'increase' ? ( */}
                      <ArrowUpIcon
                        className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                        aria-hidden="true"
                      />
                      {item.product.discount_amount.value} Tickets
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="w-full flex items-center justify-between text-sm">
                        <Link
                          to={'/tour/' + item.uuid + '?uuid=' + item.uuid}
                          className="font-medium text-indigo-600 hover:text-indigo-500">
                          View Tour
                        </Link>
                        <button
                          onClick={() =>
                            handleOpenCancelationPopup(order.uuid, item.uuid)
                          }
                          className="font-medium text-red-600 hover:text-red-500">
                          Cancel Tour
                        </button>
                      </div>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}
    </div>
  );
};
export default UserTours;
