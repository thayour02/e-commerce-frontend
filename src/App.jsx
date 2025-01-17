import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Footer from './components/footer';
import Menu from './pages/menu';
import Register from './pages/register';
import Login from './pages/login';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './context/authProvider';
import LoadingSpinner from './components/loading';
import PrivateRouter from './privateRoute/privateRouter';
import UpdateProfile from './dashBoard/update-profile';
import CartItems from './pages/cart';
import DashBoardLayout from './dashBoard/admin';
import User from './pages/admin/user';
import DashBoard from './pages/admin/dash';
import { useLocation, Navigate } from 'react-router-dom';
import Addmenu from './pages/admin/addmenu';
import ManageItems from './pages/admin/items';
import CheckOut from './pages/checkout';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from './api/apiRequest';
import UpdateMenu from './pages/admin/update-menu';

function App() {
  const { loading, user } = useContext(AuthContext);
  const [loadUser, setLoadUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadUser(user);
      setUserLoading(false);
    }, 1500);

    return () => clearTimeout(timer); 
  }, [user]);

  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  if (loading || userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] to-100%'>
      {!isDashboardRoute && <Navbar />}
      <div className='min-h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/update-profile' element={<PrivateRouter><UpdateProfile /></PrivateRouter>} />
          <Route path='/cart-page' element={<PrivateRouter><CartItems /></PrivateRouter>} />
          <Route path='/checkout' element={<PrivateRouter><CheckOut /></PrivateRouter>} />

        </Routes>
      </div>

      <Routes>
        {
         !loadUser || loadUser?.role !== 'admin' ? (
          <Route path='/dashboard/*' element={<Navigate replace to='/' />} />
          ) : (
            <Route path='/dashboard' element={<PrivateRouter><DashBoardLayout /></PrivateRouter>}>
              <Route path='' element={<DashBoard />} />
              <Route path='users' element={<User />} />
              <Route path='add-menu' element={<Addmenu />} />
              <Route path='manage-items' element={<ManageItems />} />
              <Route path='update-menu/:id' element={<UpdateMenu />} />
            </Route>
          )
        }
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
