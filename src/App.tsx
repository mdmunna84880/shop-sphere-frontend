/** @format */

import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./components/layout/RootLayout";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import NotFound from "./NotFound";
import SignUp from "./pages/SignUp";
import { getTotals } from "./store/slices/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  // Select items to listen for changes
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // 2. Calculate Totals on every change
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
