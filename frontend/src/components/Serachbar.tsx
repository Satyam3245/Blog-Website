import axios from "axios";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";


export const SearchBar = ()=>{
    const [title , setTitle] = useState<string|null>(null);
    const [res,setRes] = useState<string[]|null>(null);
    const [error , setError] = useState<boolean>(false);
    const [loading , setLoading] = useState<boolean>(true);
    const handleSearch = async (event:React.FormEvent)=>{
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/vi/blog/searchBlog',{
                title
            })
            setRes(response.data);
        } catch (error) {
            setError(true)
        }finally{

        }
    }
    if(error){
        return <h1>500 - Error is Occurred</h1>
    }
    return <div className="flex items-center bg-slate-900 px-2 rounded gap-x-1">
                <CiSearch size={20}/>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search..." className="bg-slate-900 w-[100px] focus:outline-none" onChange={(e)=>{setTitle(e.target.value)}}/>
                    <button className="border rounded bg-slate-800 text-sm px-1" type="submit">Search</button>
                </form>
    </div>
}
const SearchData = (data:object[])=>{
    return <div>
        
    </div>
}