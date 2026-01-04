import React, { useState, useContext, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';
import { Link } from 'react-router';
import { ThemeContext } from '../contexts/ThemeProvider';

const googleProvider = new GoogleAuthProvider();

function Login() {
  const { darkTheme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return toast.error('Please enter email and password');

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful! Redirecting...');
      setTimeout(() => (window.location.href = '/'), 1500);
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
      setTimeout(() => (window.location.href = '/'), 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Coffee & dark/light theme colors
  const colors = {
    containerBg: darkTheme ? '#3B2F2F' : '#FFF7F0',
    formBg: darkTheme ? '#4B3621' : '#FFF7F0',
    textColor: darkTheme ? '#FDF6F0' : '#4B3621',
    inputBg: darkTheme ? '#5C4033' : '#FFF7F0',
    inputBorder: darkTheme ? '#8B5E3C' : '#D1BFA7',
    placeholderColor: darkTheme ? '#D1BFA7' : '#A88C6D',
    buttonBg: '#8B5E3C',
    buttonHoverBg: '#A67C52',
    googleColor: darkTheme ? '#FDF6F0' : '#4B3621',
    googleBg: darkTheme ? '#5C4033' : '#FFF7F0',
    shadow: darkTheme ? '0 8px 24px rgba(0,0,0,0.6)' : '0 8px 24px rgba(75,54,33,0.3)',
    linkColor: darkTheme ? '#FDF6F0' : '#4B3621',
    registerText: darkTheme ? '#FDF6F0' : '#8C6E58',
  };

  
  useEffect(() => {
    document.documentElement.style.setProperty('--placeholder-color', colors.placeholderColor);
  }, [darkTheme]);

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: `1.5px solid ${colors.inputBorder}`,
    fontSize: '1rem',
    outline: 'none',
    color: colors.textColor,
    backgroundColor: colors.inputBg,
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        fontFamily: "'Poppins', sans-serif",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        backgroundColor: colors.containerBg,
        transition: 'background-color 0.3s ease',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: colors.formBg,
          padding: '40px 30px',
          borderRadius: '12px',
          boxShadow: colors.shadow,
          maxWidth: '400px',
          width: '100%',
          color: colors.textColor,
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
        }}
      >
        <h2
          style={{
            marginBottom: '25px',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '1.8rem',
            color: colors.textColor,
          }}
        >
          Login
        </h2>

        <label style={{ marginBottom: '6px', fontWeight: '600', color: colors.textColor }}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email address"
          style={inputStyle}
        />

        <label style={{ marginBottom: '6px', fontWeight: '600', color: colors.textColor }}>Password</label>
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
          style={{
            color: '#fff',
            padding: '14px',
            fontWeight: '700',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '30px',
            width: '100%',
            marginTop: '10px',
            backgroundColor: loading ? '#A67C52' : colors.buttonBg,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div
          style={{
            textAlign: 'center',
            margin: '20px 0',
            fontWeight: '600',
            color: colors.registerText,
          }}
        >
          OR
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${colors.buttonBg}`,
            backgroundColor: colors.googleBg,
            color: colors.googleColor,
            fontWeight: '600',
            borderRadius: '30px',
            padding: '14px 16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            fontSize: '1rem',
          }}
        >
          Continue with Google
        </button>

        <p
          style={{
            textAlign: 'center',
            marginTop: '20px',
            color: colors.registerText,
          }}
        >
          New to our website?{' '}
          <Link to="/register" style={{ color: colors.linkColor, fontWeight: '700' }}>
            Register here
          </Link>
        </p>
      </form>

     
      <style>{`
        input::placeholder {
          color: var(--placeholder-color);
          opacity: 1;
          font-style: italic;
        }
        button:hover {
          background-color: ${colors.buttonHoverBg} !important;
        }
        @media (max-width: 500px) {
          form {
            padding: 25px 20px !important;
          }
          h2 { font-size: 1.5rem !important; }
          input, button { font-size: 0.95rem !important; padding: 12px !important; }
        }
      `}</style>
    </div>
  );
}

export default Login;
