import { useState ,useEffect,useRef } from "react"
import { FaMoon, FaSun } from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";
 export const AppBar:React.FC = ()=>{
    const [isDark , setIsDark] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleTheme = ()=>{
        setIsDark(!isDark);
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.ctrlKey && event.key === 'k') {
            event.preventDefault();
            inputRef.current?.focus();
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);


    return <div className="w-screen h-16 bg-black text-white flex justify-between items-center px-3">
        <a href="#">
            <div className="text-2xl font-semibold">DevBlog</div>
        </a>
        <div className="flex gap-x-3 ">
            <div className="flex items-center bg-slate-900 px-2 rounded gap-x-1">
                <CiSearch size={20}/>
                <input type="text" placeholder="Search..." className="bg-slate-900 w-[100px] focus:outline-none" />
                <button className="border rounded bg-slate-800 text-sm px-1">Ctrl K</button>
            </div>
            <button className = "px-3 border rounded bg-slate-900 hover:bg-slate-700">SignIn</button>
            <button className = "px-3 border rounded bg-slate-900 hover:bg-slate-700">Login</button>
            <button onClick={handleTheme} className="p-2 border rounded bg-slate-900 hover:bg-slate-700">{isDark? <FaSun/>:<FaMoon/>}</button>
        </div>
        
    </div>
}