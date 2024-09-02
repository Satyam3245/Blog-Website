import axios from "axios";
import { useState } from "react"

export const Input = () => {
    const [blog, setBlog] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    console.log(blog);
    const callFun = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:3000/api/v1/blog/searchBlog?title=${blog}`);
            setLoading(false);
            const data = res.data;
            console.log(data);
            setError(null);
        } catch (error) {
            setError('Something Happened!');
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={callFun}>
                <input
                    type="text"
                    className="bg-slate-900 w-[150px] focus:outline-none"
                    placeholder="Search..."
                    onChange={(e) => setBlog(e.target.value)}
                />
                <button
                    className="border rounded bg-slate-800 text-sm px-1"
                    type="submit"
                >
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </form>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}
