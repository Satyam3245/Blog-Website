import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface Blog {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
}

export const Content: React.FC = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [authToken , setAuthToken] = useState<boolean>(false);
    const tokenCheck = ()=>{
        const token = localStorage.getItem('authToken');
        setAuthToken(true);
        if(!token){
          setAuthToken(false)
          navigate('/login')
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/blog/blogs')
            .then(response => {
                setBlogs(response.data);
                if (response.data.length === 0) {
                    setError('There are no blogs available.');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Error fetching blogs');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className=''>
            <div className='flex flex-col overflow-x-hidden justify-center items-center gap-y-6'>
                {blogs.map(blog => (
                    <div key={blog.id} className='border rounded-2xl bg-gray-500 w-[600px] max-w-full shadow-md p-4'>
                        <h2 className='text-2xl font-bold mb-2'>{blog.title}</h2>
                        <p className='text-white mb-4'>{blog.content.substring(0, 100)}...</p>
                        <button onClick={tokenCheck} className='border p-1 rounded mx-auto block bg-white text-gray-700 hover:bg-gray-300'>Read Blog</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Page:React.FC=()=>{
    return <div>
        
    </div>
}

