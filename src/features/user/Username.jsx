import { useSelector } from "react-redux"

function Username() {
    const userName = useSelector((state) => state.user.userName);
    

    if (!userName) return;

    return (
        <div className="hidden md:block">
        <h1>{userName}</h1>
        </div>
    )
}

export default Username
