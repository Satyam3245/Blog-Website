import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

interface UpdateUtilsProps {
  id: string;
}

 export const UpdateUtils: React.FC= () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [id , setId] = useState<string>('')
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('authToken')){
       navigate('/')
    }
    return
  },[])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(
        'http://localhost:3000/api/v1/blog/updateMyBlog',
        { title, content,id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    }
  };
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-green-100 border border-green-300 rounded-lg shadow-lg">
        <div className="text-xl font-semibold text-green-800 mb-4">
          Your Blog is Successfully Updated
        </div>
        <Link to="/myBlog" className="text-blue-500 hover:text-blue-700 font-medium underline">
          Check The Blog
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-x-8 my-12">
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="text-3xl font-semibold mb-2">Update Your Blog</div>
          <div className="text-gray-600 text-base w-[350px] mb-2">
            Unleash your creativity and share your stories with the world.
          </div>
          <div>
            <div className="text-sm mb-1">Blog Title</div>
            <input
              type="text"
              placeholder="Enter Your Blog Title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border w-[350px] p-1 rounded mb-1"
            />
          </div>
          <div>
            <div className="text-sm mb-1">Blog Id (Copy from my Blog)</div>
            <input
              type="text"
              placeholder="Enter Your Blog Id"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border w-[350px] p-1 rounded mb-1"
            />
          </div>
          <div>
            <div className="text-sm mb-1">Blog Content</div>
            <textarea
              placeholder="Enter Your Blog Content"
              id="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-[350px] h-[250px] p-2 border border-gray-300 rounded resize-none overflow-hidden mb-2"
            />
          </div>
          <button
            type="submit"
            className="border py-1 px-[134px] rounded bg-black text-white focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Update Blog
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="w-[400px] border rounded-xl p-5 bg-gray-100">
          <div className="text-xl font-bold">Unleash Your Creativity</div>
          <div className="text-sm text-gray-800">
            Transform your ideas into captivating blog posts that inspire and engage your audience.
          </div>
        </div>
        <div className="w-[400px] border rounded-xl p-5 bg-gray-100">
          <div className="text-xl font-bold">Personalize Your Blog</div>
          <div className="text-sm text-gray-800">
            Choose from a variety of design styles to create a blog that reflects your unique personality and brand.
          </div>
        </div>
        <div className="w-[400px] border rounded-xl p-5 bg-gray-100">
          <div className="text-xl font-bold">Showcase Your Expertise</div>
          <div className="text-sm text-gray-800">
            Share your knowledge and insights with the world, and establish yourself as a thought leader in your field.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUtils;
