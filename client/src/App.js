import React, { useEffect ,lazy,Suspense} from 'react';
import { Switch, Route } from 'react-router-dom'
import {ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



//functions
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser } from '../src/functions/auth'
import {LoadingOutlined} from "@ant-design/icons"

//pages
// import Login from './pages/auth/Login'
// import Register from './pages/auth/Register'
// import Home from './pages/Home'
// import Header from './components/nav/Header'
// import RegisterComplete from './pages/auth/RegisterComplete'
// import ForgotPassword from './pages/auth/ForgotPassword'
// import History from './pages/user/History'
// import Password from './pages/user/Password'
// import Wishlist from './pages/user/Wishlist'
// import AdminDashboard from './pages/admin/AdminDashboard';
// import CategoryCreate from './pages/admin/category/CategoryCreate'
// import SubCreate from './pages/admin/sub/SubCreate'
// import UserRoute from './components/routes/UserRoutes'
// import AdminRoute from './components/routes/AdminRoutes';
// import CategoryUpdate from './pages/admin/category/CategoryUpdate';
// import SubUpdate from './pages/admin/sub/SubUpdate';
// import ProductCreate from './pages/admin/product/ProductCreate';
// import ProductUpdate from './pages/admin/product/ProductUpdate';
// import AllProducts from './pages/admin/product/AllProducts';
// import Product from './pages/Product'
// import CategoryHome from './pages/category/CategoryHome';
// import SubHome from './pages/sub/SubHome';
// import Products from './pages/Products';
// import Cart from './pages/Cart'
// import Search from './components/forms/Search';
// import ItemCreate from './pages/admin/item/ItemCreate'
// import Footer from '../src/components/footer/Footer'
// import SideDrawer from './components/drawer/SideDrawer';
// import Checkout from './pages/Checkout'
// import UserDashBoard from './pages/user/UserDashBoard'

//using lazy suspense
const Login=lazy(()=>import('./pages/auth/Login'));
const Register=lazy(()=>import('./pages/auth/Register'));
const Home=lazy(()=>import('./pages/Home'));
const Header=lazy(()=>import('./components/nav/Header')); 
const RegisterComplete=lazy(()=>import('./pages/auth/RegisterComplete')); 
const ForgotPassword=lazy(()=>import('./pages/auth/ForgotPassword')); 
const History=lazy(()=>import('./pages/user/History')); 
const Password=lazy(()=>import('./pages/user/Password')); 
const Wishlist=lazy(()=>import('./pages/user/Wishlist')); 
const AdminDashboard=lazy(()=>import('./pages/admin/AdminDashboard')); 
const CategoryCreate=lazy(()=>import('./pages/admin/category/CategoryCreate')); 
const SubCreate=lazy(()=>import('./pages/admin/sub/SubCreate'));  
const UserRoute=lazy(()=>import('./components/routes/UserRoutes')); 
const AdminRoute=lazy(()=>import('./components/routes/AdminRoutes')); 
const CategoryUpdate=lazy(()=>import('./pages/admin/category/CategoryUpdate')); 
const SubUpdate=lazy(()=>import('./pages/admin/sub/SubUpdate')); 
const Slider=lazy(()=>import('./pages/admin/Slider')); 
const ProductCreate=lazy(()=>import('./pages/admin/product/ProductCreate')); 
const ProductUpdate=lazy(()=>import('./pages/admin/product/ProductUpdate')); 
const AllProducts=lazy(()=>import('./pages/admin/product/AllProducts')); 
const Product=lazy(()=>import('./pages/Product')); 
const CategoryHome=lazy(()=>import('./pages/category/CategoryHome')); 
const SubHome=lazy(()=>import('./pages/sub/SubHome')); 
const Products=lazy(()=>import('./pages/Products')); 
const Cart=lazy(()=>import('./pages/Cart')); 
const Search=lazy(()=>import('./components/forms/Search')); 
const ItemCreate=lazy(()=>import('./pages/admin/item/ItemCreate')); 
const Footer=lazy(()=>import('../src/components/footer/Footer')); 
const SideDrawer=lazy(()=>import('./components/drawer/SideDrawer')); 
const Checkout=lazy(()=>import('./pages/Checkout')); 
const UserDashBoard=lazy(()=>import('./pages/user/UserDashBoard')); 
const Profile=lazy(()=>import('./pages/user/Profile')); 
const Payement=lazy(()=>import('./pages/user/Payement')); 


const Contact=lazy(()=>import('./pages/Contact')); 







function App() {

  const dispatch = useDispatch();

  const { search } = useSelector((state) => ({ ...state }))

  //to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {

            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                address:res.data.address,
                mobile:res.data.mobile
              },
            });

          })
          .catch(err => console.log(err));
      }
    });

    return () => unsubscribe();

  }, [dispatch])

  return (
   <Suspense fallback={
     <div className="col text-center p-5">
            <LoadingOutlined/>
     </div>
   }>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/search' component={Search} />

        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        {/* user routes */}
        <UserRoute exact path='/user/history' component={History} />
        <UserRoute exact path='/user/password' component={Password} />
        <UserRoute exact path='/user/wishlist' component={Wishlist} />
        <UserRoute exact path='/user/checkout' component={Checkout} />
        <UserRoute exact path='/user/dashboard' component={UserDashBoard} />
        <UserRoute exact path='/user/profile' component={Profile} />
        <UserRoute exact path='/user/payement' component={Payement} />




        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/category' component={CategoryCreate} />
        <AdminRoute
          exact path='/admin/category/:slug'
          component={CategoryUpdate} />

        <AdminRoute exact path='/admin/sub' component={SubCreate} />
        <AdminRoute exact path='/admin/item' component={ItemCreate} />
        <AdminRoute exact path='/admin/slider' component={Slider} />


        <AdminRoute
          exact path='/admin/sub/:slug'
          component={SubUpdate} />

        <AdminRoute exact path='/admin/product' component={ProductCreate} />
        <AdminRoute exact path='/admin/products' component={AllProducts} />

        <AdminRoute exact path='/admin/products' component={AllProducts} />
        <AdminRoute
          exact path='/admin/product/:slug'
          component={ProductUpdate}
        />

        <Route exact path='/product/:slug' component={Product} />
        <Route exact path='/category/:slug' component={CategoryHome} />
        <Route exact path='/sub/:slug' component={SubHome} />
        <Route exact path='/products/:slug' component={Products} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/contact' component={Contact} />

      </Switch>
      <Footer />
   </Suspense>
  );
}

export default App;
