import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
interface Blog {
  id:string;
  title: string;
  content: string;
  authorId: string;
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
        console.log(token) 
        const response = await axios.get('/api/v1/blog/myBlog', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        setToken(token);
        setBlogs(response.data);
        console.log(blogs)
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
    <div>
      {blogs.map(blog=>(
        <div key={blog.id}>
          <div>{blog.title}</div>
          <div>{blog.content}</div>
        </div>
      ))}
    </div>
  );
};

export default MyBlog;
