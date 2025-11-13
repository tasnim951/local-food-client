import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';
import { Link } from 'react-router';

const googleProvider = new GoogleAuthProvider();

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundColor: '#e6f0e9',
        fontFamily: "'Poppins', sans-serif",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(45, 106, 79, 0.3)',
          maxWidth: '400px',
          width: '100%',
          color: '#2d6a4f',
        }}
      >
        <h2 style={{ marginBottom: '20px', 
            textAlign: 'center' }}>
                Login</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Email address"
        />

        <label>Password</label>
          
          <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Enter password"
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            backgroundColor: loading ? '#aacdaa' : '#2d6a4f',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '20px',
            width: '100%',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div
          style={{
            textAlign: 'center',
            margin: '20px 0',
            fontWeight: '600',
            color: '#52796f',
          }}
        >
          OR
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          style={{
            ...buttonStyle,
            backgroundColor: '#4285F4',
            width: '100%',
          }}
        >
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', 
            marginTop: '20px', 
            color: '#386641' }}>

          New to our website?{' '}

          <Link to="/register"
           style={{ color: '#2d6a4f',
            fontWeight: '700' }}>
            Register here

          </Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  margin: '6px 0 14px 0',
  borderRadius: '6px',
  border: '1.5px solid #a7c5a9',
  fontSize: '1rem',
  outline: 'none',
  color: '#2d6a4f',
};

const buttonStyle = {
  color: 'white',
  padding: '12px',
  fontWeight: '700',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '30px',
  userSelect: 'none',
  transition: 'background-color 0.3s ease',
};

export default Login;
