import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = password => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;
    return hasUpper && hasLower && hasLength;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, photoURL, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must have uppercase, lowercase & minimum 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || null,
      });
      toast.success('Registration successful! Redirecting...');
      setTimeout(() => { window.location.href = '/'; }, 1500);
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
      setTimeout(() => { window.location.href = '/'; }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>Register</h2>

        <label style={labelStyle}>Name*</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} placeholder="Your full name" />

        <label style={labelStyle}>Email*</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} placeholder="Email address" />

        <label style={labelStyle}>Photo URL (optional)</label>
        <input type="text" name="photoURL" value={formData.photoURL} onChange={handleChange} style={inputStyle} placeholder="https://example.com/photo.jpg" />

        <label style={labelStyle}>Password*</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required style={inputStyle} placeholder="At least 6 chars, uppercase & lowercase" />

        <label style={labelStyle}>Confirm Password*</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required style={inputStyle} placeholder="Re-enter your password" />

        <button type="submit" disabled={loading} className="register-button" style={{ ...buttonStyle, backgroundColor: loading ? '#aacdaa' : '#2d6a4f', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div style={orStyle}>OR</div>

        <button type="button" onClick={handleGoogleSignIn} className="google-button" style={googleButtonStyle}>
          Continue with Google
        </button>
      </form>

      {/* Hover styles */}
      <style>{`
        .register-button:hover {
          background-color: #1b4f33;
        }
        .google-button:hover {
          background-color: #2d6a4f;
          color: white;
        }
        input::placeholder {
          color: #a7c5a9;
          opacity: 1;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

export default Register;

// ---------- STYLES ----------
const containerStyle = {
  minHeight: '80vh',
  fontFamily: "'Poppins', sans-serif",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px 20px',
  backgroundColor: '#e6f0e9',
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
