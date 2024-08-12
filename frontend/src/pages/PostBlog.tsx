import axios from "axios";
import React, { useState } from "react"
import { Link } from "react-router-dom";
export const PostBlog:React.FC = ()=>{
    const [title , setTitle] = useState<string>('');
    const [content , setContent] = useState<string>('');
    const [error , setError] = useState<string|null>(null);
    const [success , setSuccess] = useState<boolean>(false);
    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        const token = localStorage.getItem('authToken')
        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/blog',
                {
                  title,
                  content,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              setError(null)
              setTitle('')
              setContent('')
              setSuccess(true)
              
        } catch (error) {
            setError('Error is Occurred please re Login or Re trying Again')   
        }
    }
    if(success){
        return <div>
            <div>Your Blog is Created</div>
            <Link to="/createblog" className="font-blue-500"> Upload the New Blog </Link>
            <Link to="/" className="font-blue-500">Go to Home</Link>
        </div>
    }
    if(error){
        return <div>{error}</div>
    }
    return <div className="flex justify-center gap-x-8 my-12 ">
        <div className="flex flex-col">
            <form onSubmit={handleSubmit}>
                <div className="text-3xl font-semibold mb-2">Create Your Blog</div>
                <div className="text-gray-600 text-base w-[350px] mb-2">Unleash your creativity and share your stories with the world.</div>
                <div>
                    <div className="text-sm mb-1">Blog Title</div>
                    <input 
                        type="text"
                        placeholder="Enter Your Blog Title" 
                        id="title" 
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                        className="border w-[350px] p-1 rounded mb-1"
                    />
                </div>
                <div>
                    <div className="text-sm mb-1">Blog Content</div>
                    <textarea  
                        placeholder="Enter Your Blog Content" 
                        id="content" 
                        onChange={(e)=>{setContent(e.target.value)}}
                        value={content}
                        className="w-[350px] h-[250px] p-2 border border-gray-300 rounded resize-none overflow-hidden mb-2"
                    />
                </div>
                <button type="submit" className="border py-1 px-[134px] rounded bg-black text-white focus:outline-none focus:ring-4 focus:ring-blue-500">Create Blog</button>
            </form>
        </div>
        <div className="flex flex-col gap-y-4">
            <div className="w-[400px] border rounded-xl p-5 bg-gray-100">
                <div className="text-xl font-bold">Unleash Your Creativity</div>
                <div className="text-sm text-gray-800">Transform your ideas into captivating blog posts that inspire and engage your audience.</div>
            </div>
            <div className="w-[400px] border rounded-xl p-5 bg-gray-100">
                <div className="text-xl font-bold">Personalize Your Blog</div>
                <div className="text-sm text-gray-800">Choose from a variety of design styles to create a blog that reflects your unique personality and brand.</div>
            </div>
            <div className="w-[400px] border rounded-xl p-5 bg-gray-100">
                <div className="text-xl font-bold">Showcase Your Expertise</div>
                <div className="text-sm text-gray-800">Share your knowledge and insights with the world, and establish yourself as a thought leader in your field.</div>
            </div>
        </div>
    </div>
}