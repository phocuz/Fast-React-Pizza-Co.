import Header from "./Header"
import Loader from "./Loader"
import CartOverview from "../features/cart/CartOverview"
import { Outlet, useNavigation } from "react-router-dom"

function AppLayout() {
    const navigation = useNavigation();
    
    const isLoading = navigation.state === "loading"
    return (
        <div className="grid grid-rows-[auto_1fr_auto] h-screen">
            <Header />
            { isLoading && <Loader /> }
           <div className="overflow-scroll text-center">
            <main >
            < Outlet />
           </main>
           </div>
            <CartOverview />
        </div>
    )
}

export default AppLayout
