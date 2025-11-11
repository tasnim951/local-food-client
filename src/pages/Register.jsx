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

  // Handle input change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password validation helper
  const validatePassword = password => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;
    return hasUpper && hasLower && hasLength;
  };

  // Handle form submit
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

      // Update display name and photoURL
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      toast.success('Registration successful! Redirecting...');
      // Redirect after 1.5s, e.g. to homepage
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
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
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Register</h2>

        <label>Name*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Your full name"
        />

        <label>Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Email address"
        />

        <label>Photo URL (optional)</label>
        <input
          type="text"
          name="photoURL"
          value={formData.photoURL}
          onChange={handleChange}
          style={inputStyle}
          placeholder="https://example.com/photo.jpg"
        />

        <label>Password*</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="At least 6 chars, uppercase & lowercase"
        />

        <label>Confirm Password*</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Re-enter your password"
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
          {loading ? 'Registering...' : 'Register'}
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
      </form>
    </div>
  );
}

// Shared input styles
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

// Shared button styles
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

export default Register;
