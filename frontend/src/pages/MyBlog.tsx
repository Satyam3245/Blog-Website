import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { UpdateUtils } from './UpdateBlog';
interface Blog {
  id:string;
  title: string;
  content: string;
  authorId: string;
}
interface CopyButtonProps {
  textToCopy : string;
}
export const MyBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token , setToken] = useState<string|null>(null)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('authToken');
         
        const response = await axios.get('http://localhost:3000/api/v1/blog/myBlog', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setToken(token);
        setBlogs(response.data);
        
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
        navigate('/login')
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if(!token){
    return<div>
        <div>Please Log In</div>
        <Link to="/login" className=''>Log In Here</Link>
    </div>
  }
  if (error) {
    return <p>{error}</p>;
  }
  if(blogs.length==0){
    return <div>You Don't Have Any Blog Please Post the Blog</div>
  }
  return (
    <div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {blogs.map((blog) => (
      <div
        key={blog.id}
        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
      >
        <div className="text-lg font-semibold text-gray-800 mb-2">{blog.title}</div>
        <div className="text-lg font-semibold text-gray-800 mb-2">{blog.id  }</div>
        <CopyButton textToCopy={blog.id}/>
        <div className="text-gray-600 mb-4">
          {blog.content.substring(0,100)}... 
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          
        >
          Click
        </button>
      </div>
    ))}
  </div>
</div>

  );
};

const CopyButton:React.FC<CopyButtonProps> = ({textToCopy})=>{
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };
  return <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => copyToClipboard(textToCopy)}
          >
            Copy ID
  </button>
}
export default MyBlog;
