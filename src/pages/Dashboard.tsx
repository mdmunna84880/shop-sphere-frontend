import Banner from "@/components/dashboard/Banner";
import FeaturesSection from "@/components/dashboard/FeaturedSection";
import ProductList from "@/components/product/ProductList";

function Dashboard() {
    return ( 
        <div>
            <Banner />
            <FeaturesSection />
            <ProductList />
        </div>
     );
}

export default Dashboard;