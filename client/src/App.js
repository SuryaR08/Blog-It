import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddBlog from "./components/AddBlog";
import BlogDetail from "./components/BlogDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import EditBlog from "./components/EditBlog";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUserId = sessionStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setUser({ token: storedToken, id: storedUserId });
    }
  }, []);

  const handleLogin = (token, userId) => {
    setUser({ token, id: userId });
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userId);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        {user && (
          <Route
            path="/add-blog"
            element={<AddBlog token={user.token} userId={user.id} />}
          />
        )}
        {user && (
          <Route
            path="/profile"
            element={<Profile userId={user.id} token={user.token} />}
          />
        )}
        {user && <Route path="/editblog/:blogId" element={<EditBlog />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
