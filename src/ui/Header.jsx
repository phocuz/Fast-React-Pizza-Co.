import { Link } from "react-router-dom"
import SearchedOrder from "../features/order/SearchedOrder"
import Username from "../features/user/Username"
function Header() {
    return (
        <header className="bg-yellow-500  uppercase font-semibold text-2xl px-4 py-3 border-b-3 border-stone-500 sm:px-6 flex justify-between items-center">
            <Link to="/" className="tracking-widest">fast react pizza co.</Link>
            <SearchedOrder />
            <Username />
        </header>
    )
}

export default Header
