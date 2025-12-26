import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./footer/Footer";

function RootLayout() {
    return ( 
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
     );
}

export default RootLayout;