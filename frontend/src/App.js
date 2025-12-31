import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddCategory from './pages/AddCategory';
import ManageCategory from './pages/ManageCategory';
import AddFood from './pages/AddFood';
import ManageFood from './pages/ManageFood';
import SearchPage from './pages/SearchPage';
import Register from './components/Register';
import Login from './components/Login';
import FoodDetail from './pages/FoodDetail';
import Cart from './pages/Cart';
import PaymentPage from './pages/PaymentPage';
import MyOrder from './pages/MyOrders';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './pages/ChangePassword';
import OrdersNotConfirmed from './pages/OrdersNotConfirmed';
import OrdersConfirmed from './pages/OrdersConfirmed';
import FoodBeingPrepared from './pages/FoodBeingPrepared';
import FoodPickup from './pages/FoodPickup';
import OrdersDelivered from './pages/OrdersDelivered';
import OrdersCancelled from './pages/OrdersCancelled';
import AllFoods from './pages/AllFoods';
import OrderReport from './pages/OrderReport';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin-login" element={<AdminLogin />}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
        <Route path="/add-category" element={<AddCategory />}></Route>
        <Route path="/manage-category" element={<ManageCategory />}></Route>
        <Route path="/add-food" element={<AddFood />}></Route>
        <Route path="/manage-food" element={<ManageFood />}></Route>
        <Route path="/orders-confirmed" element={<OrdersConfirmed />}></Route>
        <Route path="/orders-not-confirmed" element={<OrdersNotConfirmed />}></Route>
        <Route path="/food-being-prepared" element={<FoodBeingPrepared />}></Route>
        <Route path="/food-pickup" element={<FoodPickup />}></Route>
        <Route path="/orders-delivered" element={<OrdersDelivered />}></Route>
        <Route path="/orders-cancelled" element={<OrdersCancelled />}></Route>
        <Route path="/all-foods" element={<AllFoods />}></Route>
        <Route path="/order-report" element={<OrderReport />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/food/:id" element={<FoodDetail />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route path="/my-orders" element={<MyOrders />}></Route>
        <Route path="/order-details/:order_number" element={<OrderDetails />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
