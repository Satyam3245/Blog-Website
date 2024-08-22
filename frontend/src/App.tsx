import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { MyBlog } from './pages/MyBlog';
import { PostBlog } from './pages/PostBlog';
import UpdateUtils from './pages/UpdateBlog';
import { BlogDetail } from './components/GetBlog';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/myBlog' element={<MyBlog/>}/>
        <Route path='/createblog' element={<PostBlog/>}/>
        <Route path='/updateblog' element={<UpdateUtils/>}/>
        <Route path='/getBlog/:id' element={<BlogDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
