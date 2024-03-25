import {createAsyncThunk} from '@reduxjs/toolkit';
import {signInAnonymously} from 'firebase/auth';
import {addDoc, collection, doc, getDocs, setDoc} from 'firebase/firestore';
import {IOrder} from 'models/order';
import {db, auth} from 'utils/firebase';
import http from 'utils/http';
interface FetchError {
  errorMessage: string | undefined;
}

export const createNewOrder = createAsyncThunk<
  IOrder,
  {
    cart_uuid: string;
    email_notification: string;
    user_uuid: string;
    user_email: string;
  },
  {rejectValue: FetchError}
>('createNewOrder', async (params, thunkApi) => {
  try {
    const response = await http.post<
      {cart_uuid: string; email_notification: string},
      {data: IOrder}
    >(`/orders`, {
      cart_uuid: params.cart_uuid,
      email_notification: params.email_notification,
    });
    const order = response.data as IOrder;
    signInAnonymously(auth)
      .then((res) => {
        const user = res.user;
        localStorage.setItem('token', user.uid);
        setDoc(doc(db, 'users', user.uid), {
          firebaseUser: JSON.stringify(user),
          uid: user.uid,
          authProvider: 'anonymous',
          email: params.user_email,
          role: 'user',
          registrationSource: 'web',
          createdAt: new Date().getTime(),
        }).then(() => {
          if (res.user.uid) {
            addDoc(collection(db, 'users', user.uid, 'orders'), {
              order: JSON.stringify(response.data),
              items: response.data.items,
              status: response.data.status,
              cart_uuid: params.cart_uuid,
              order_uuid: response.data.uuid,
              createdAt: new Date().getTime(),
            });
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    return order;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});
export interface CancelationProps {
  order_uuid: string;
  item_uuid: string;
  cancellation_reason: string;
  cancellation_additional_info: string;
}
export const cancelAnOrder = createAsyncThunk<
  any,
  CancelationProps,
  {rejectValue: FetchError}
>('cancelAnOrder', async (data: CancelationProps, {rejectWithValue}) => {
  try {
    const response = await http.delete<{
      cart_uuid: string;
      email_notification: string;
    }>(`/orders/` + data.order_uuid + '/items/' + data.item_uuid);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const checkOrderItemRefundPolicy = createAsyncThunk<
  any,
  {order_uuid: string; item_uuid: string},
  {rejectValue: FetchError}
>(
  'checkOrderItemRefundPolicy',
  async (data: {order_uuid: string; item_uuid: string}, {rejectWithValue}) => {
    try {
      const response = await http.get<{
        order_uuid: string;
        item_uuid: string;
      }>(
        `/orders/` +
          data.order_uuid +
          '/items/' +
          data.item_uuid +
          '/refund-policies'
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getAllUserOrders = createAsyncThunk<
  any,
  {user_uuid: string},
  {rejectValue: FetchError}
>('getAllUserOrders', async (data: {user_uuid: string}, {rejectWithValue}) => {
  try {
    const token = localStorage.getItem('token') ?? data.user_uuid;
    const docRef = collection(db, 'users', token as string, 'orders');
    const snapshot = await getDocs(docRef);
    const orders_data = snapshot.docs.map((doc) => {
      return doc.data();
    });
    return orders_data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
