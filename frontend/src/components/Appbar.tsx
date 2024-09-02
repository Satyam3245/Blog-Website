import React, { useState ,useEffect,useRef } from "react"
import { FaMoon, FaSun } from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
 export const AppBar:React.FC = ()=>{
    const navigate = useNavigate();
    const [isDark , setIsDark] = useState(false);
    const [authToken , setAuthToken] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleTheme = ()=>{
        setIsDark(!isDark);
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setAuthToken(true);
        if(!token){
          setAuthToken(false)
        }
      }, []);


    return <div className="w-screen h-16 bg-black text-white flex justify-between items-center px-3">
        <a href="#">
            <div className="text-2xl font-semibold">DevBlog</div>
        </a>
        <div className="flex gap-x-3 ">
            <div className="flex items-center bg-slate-900 px-2 rounded gap-x-1">
                <CiSearch size={20}/>
                <Input/>
            </div>
            <button onClick={()=>{{authToken?navigate('/myBlog'):navigate('/signup')}}} className = "px-3 border rounded bg-slate-900 hover:bg-slate-700">{authToken?'My Blog':'Sign Up'}</button>
            <button onClick={()=>{{authToken?navigate('/createblog'):navigate('/login')}}} className = "px-3 border rounded bg-slate-900 hover:bg-slate-700">{authToken?'Post Blog':'Login'}</button>
            <button onClick={handleTheme} className="p-2 border rounded bg-slate-900 hover:bg-slate-700">{isDark? <FaSun/>:<FaMoon/>}</button>
        </div>
        
    </div>
}
