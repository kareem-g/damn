import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from 'pages/Home/Home';
import Layout from 'components/Layout/Layout';
import TourDetails from 'pages/TourDetails/TourDetails';
import Cart from 'pages/Cart/Cart';
import CompletedBookings from 'pages/Bookings/Completed';
import UpcomingBookings from 'pages/Bookings/Upcoming';
import FavoriteBookings from 'pages/Bookings/Favorites';
import Tours from 'pages/Tours/Tours';
import Login from 'pages/Login/Login';
import Registration from 'pages/Registration/Registration';
import ForgotPassword from 'pages/ForgotPassword/ForgotPassword';
import Account from 'pages/Account/Account';
import {useAppDispatch, useAppSelector} from 'store/hook';
import {SignUserIn, authState} from 'slices/auth.slice';
import {useEffect} from 'react';
import {getAllUserOrders} from 'middlewares/orders.middleware';

function App() {
  const {user} = useAppSelector(authState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(SignUserIn({token: localStorage.getItem('token') as string}));
      dispatch(
        getAllUserOrders({user_uuid: localStorage.getItem('token') as string})
      );
    }
  }, [localStorage.getItem('token')]);
  return (
    <Layout
      noLayoutRoutes={[
        '/login',
        '/registration',
        '/ForgotPassword',
        '/account',
        '/account/tours',
        '/account/liked_tours',
        '/account/calender',
        '/account/flights',
      ]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/tours" element={<Tours />} />
        {user?.uid ? <Route path="/account/*" element={<Account />} /> : null}

        {/* <Route path="/tour_desc/:id" element={<TourDescription />} /> */}
        <Route path="/bookings">
          <Route path="completed" element={<CompletedBookings />} />
          <Route path="upcoming" element={<UpcomingBookings />} />
          <Route path="favorites" element={<FavoriteBookings />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
