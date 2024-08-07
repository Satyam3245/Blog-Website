import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
export const Footer:React.FC = ()=>{
    return<div className="flex justify-around items-center bg-slate-800 text-white p-7">
        <div className="text-3xl font-bold">100xDevBlog</div>
        <div>
            <div className="font-medium mb-4">Quick Links</div>
            <div>100xDevBlog</div>
            <div>Privacy Policy</div>
        </div>
        <div className="flex flex-col gap-y-3">
            <div className="text-xl">Follow Us</div>
            <div className="flex gap-x-2">
                <div><FaGithub size={30}/></div>
                <div><FaInstagram size={30}/></div>
                <div><FaYoutube size={30}/></div>
            </div>
        </div>
    </div>
}