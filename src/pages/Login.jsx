import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';
import { Link } from 'react-router';

const googleProvider = new GoogleAuthProvider();

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

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
      setTimeout(() => window.location.href = '/', 1500);
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
      setTimeout(() => window.location.href = '/', 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>Login</h2>

        <label style={labelStyle}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email address"
          style={inputStyle}
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter password"
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          className="login-button"
          style={{ ...buttonStyle, backgroundColor: loading ? '#aacdaa' : '#2d6a4f', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div style={orStyle}>OR</div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="google-button"
          style={googleButtonStyle}
        >
          Continue with Google
        </button>

        <p style={registerTextStyle}>
          New to our website?{' '}
          <Link to="/register" style={registerLinkStyle}>
            Register here
          </Link>
        </p>
      </form>

      {/* Hover styles */}
      <style>{`
        .login-button:hover {
          background-color: #1b4f33;
        }
        .google-button:hover {
          background-color: #2d6a4f;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default Login;

// ---------- STYLES ----------
const containerStyle = {
  minHeight: '80vh',
  backgroundColor: '#e6f0e9',
  fontFamily: "'Poppins', sans-serif",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px 20px',
};

const formStyle = {
  backgroundColor: 'white',
  padding: '40px 30px',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(45, 106, 79, 0.3)',
  maxWidth: '400px',
  width: '100%',
  color: '#2d6a4f',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
};

const titleStyle = { marginBottom: '25px', textAlign: 'center', fontWeight: '700', fontSize: '1.8rem' };
const labelStyle = { marginBottom: '6px', fontWeight: '600' };

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  marginBottom: '16px',
  borderRadius: '8px',
  border: '1.5px solid #a7c5a9',
  fontSize: '1rem',
  outline: 'none',
  color: '#2d6a4f',
  boxSizing: 'border-box',
};

const buttonStyle = {
  color: 'white',
  padding: '12px',
  fontWeight: '700',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '30px',
  userSelect: 'none',
  transition: 'all 0.3s ease',
  width: '100%',
  marginTop: '10px',
};

const orStyle = { textAlign: 'center', margin: '20px 0', fontWeight: '600', color: '#52796f' };

const googleButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid #2d6a4f',
  backgroundColor: 'white',
  color: '#2d6a4f',
  fontWeight: '600',
  borderRadius: '30px',
  padding: '12px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  width: '100%',
  fontSize: '1rem',
};

const registerTextStyle = { textAlign: 'center', marginTop: '20px', color: '#386641' };
const registerLinkStyle = { color: '#2d6a4f', fontWeight: '700' };
