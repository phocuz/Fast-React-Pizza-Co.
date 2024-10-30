import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchedOrder() {

       const navigate = useNavigate()

    function handleSubmit(e){
            e.preventDefault();
            if(!query) return;
            navigate(`/order/${query}`);
            setQuery("")

    }
    const [query,setQuery] =useState("");
    return (
      <form onSubmit={handleSubmit}>
         <input 
       placeholder="Search order #"
       value={query}
       onChange={(e)=>setQuery(e.target.value)}
       type="text" className=" rounded-full bg-yellow-100 px-4 py-2 text-sm placeholder:text-stone-400 sm:focus:w-72 sm:w-62 focus:outline-none focus:ring focus:ring-yellow-800 focus:ring-opacity-50 " />
      </form>
    )
}

export default SearchedOrder