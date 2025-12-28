import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./components/layout/RootLayout";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import NotFound from "./NotFound";
import SignUp from "./pages/SignUp";

function App() {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout/>}>
      <Route index element={<Dashboard />}/>
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