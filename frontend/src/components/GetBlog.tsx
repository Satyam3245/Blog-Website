import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
interface Blog {
    title : string;
    content : string
}
export const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/v1/blog/getBlog`, { params: { id } })
                .then(response => {
                    setBlog(response.data);
                    console.log(id)
                    setLoading(false);
                })
                .catch(() => {
                    setError('Error fetching blog details');
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
        </div>
    );
};

