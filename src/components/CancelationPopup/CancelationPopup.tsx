import React, {Fragment, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline';
import {useAppDispatch} from 'store/hook';
import {cancelAnOrder} from 'middlewares/orders.middleware';
import {useFormik} from 'formik';
import Input from 'components/Input/Input';
import TextArea from 'components/Input/TextArea';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
  cart_item_uuid: string;
  order_uuid: string;
}
const CancelationPopup: React.FC<Props> = ({
  isOpen,
  setOpen,
  cart_item_uuid,
  item,
  order_uuid,
}) => {
  const cancelButtonRef = useRef(null);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      cancellation_reason: '',
      cancellation_additional_info: '',
    },
    onSubmit(values, formikHelpers) {
      dispatch(
        cancelAnOrder({
          order_uuid: order_uuid,
          item_uuid: cart_item_uuid,
          cancellation_reason: 'CANCELLED-BY-CUSTOMER',
          cancellation_additional_info: values.cancellation_additional_info,
        })
      ).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          formikHelpers.resetForm();
          setOpen(false);
        }
      });
    },
  });

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-5"
        initialFocus={cancelButtonRef}
        onClose={(e) => console.log(e)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="z-20 relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <div className="mx-auto flex  items-center justify-center   w-full">
                      <div className="bg-red-100 w-12 sm:mx-0 sm:h-10 flex items-center justify-center rounded-full h-12 flex-shrink-0">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div className="mt-3 text-center sm:mt-5 flex flex-col items-center justify-center ">
                      <div className="w-60  object-contain rounded-md overflow-hidden mb-5">
                        <img
                          src={item.cover_image_url}
                          alt="Image cover"
                          className="object-cover"
                        />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-sm font-normal leading-6 text-gray-500 flex items-center gap-1 justify-center whitespace-nowrap">
                        You Wanna Cancel{' '}
                        <p className="text-base text-gray-900 font-semibold">
                          " {item.title} "
                        </p>{' '}
                        ?
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Date: {item.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5 w-full my-5">
                      <Input
                        placeholder="Cancelation Reason"
                        formik={formik}
                        label="Cancelation Reason"
                        id="cancelation_reason"
                        name="cancelation_reason"
                        type="text"
                      />
                      <TextArea
                        placeholder="Write Additional Info"
                        formik={formik}
                        label="Cancelation additional info"
                        id="cancellation_additional_info"
                        name="cancellation_additional_info"
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2">
                      Cancel Tour
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}>
                      Close
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default CancelationPopup;
