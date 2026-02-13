import React, { useState } from 'react';
import axios from "../api/axiosConfig";
import '../index.css';

  const SignIn = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;   
 
  const resetFields = () => {
    setName('');
    setEmail('');
    setPassword('');
  };


  const handleLogin = async (e) => {
    e.preventDefault();      
    if (!email || !password) {
      alert('Email and password are required');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        '/login',
        { email, password },   
      );

      alert('Login Successful');

      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);  
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('All fields are required for sign in');
      return;
    }


    try {
      setLoading(true);
      const res = await axios.post(
        '/register',
        { name, email, password },
      );

      alert('Sign In Successful');

      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } catch (err) {
      console.error('Sign in failed:', err.response?.data || err.message);
      alert('Sign in failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin">
      <div className="over fixed inset-0 w-full h-full bg-black/60 flex items-center justify-center z-[999]">
        <div className="authmodal bg-black/60 p-12 rounded-[20px] w-[400px] h-[480px] shadow-[0_0_20px_rgba(255,255,255,0.1)] relative animate-[slideIn_0.3s_ease]">
          <div className="header">
            <button  className={activeTab === 'login' ? 'active' : ''} 
              onClick={() => {
                setActiveTab('login');
                resetFields();
              }}>
              Log In
            </button>
            <button  className={activeTab === 'register' ? 'active' : ''}
              onClick={() => {
                setActiveTab('register');
                resetFields();
              }}>
              Sign In
            </button>
            <span className="closebtn absolute -right-2 -top-2 bg-[#ff4444] text-white rounded-full px-2.5 py-1 cursor-pointer" onClick={onClose}>
              X
            </span>
          </div>

          {activeTab === 'login' ? (
            <form className="form flex flex-col gap-3" onSubmit={handleLogin}>
              <input type="email" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <button className="loginbtn mt-10" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          ) : (
            <form className="form flex flex-col gap-3" onSubmit={handleRegister}>
              <input type="text" placeholder="User Name" value={name} onChange={(e) => setName(e.target.value)} required/>
              <input type="email" placeholder="Email Id" value={email}  onChange={(e) => setEmail(e.target.value)} required/>
              <input  type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
              <button className="signinbtn mt-5 " type="submit" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign In'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default SignIn;
