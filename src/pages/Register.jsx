import React, { useState, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';
import { ThemeContext } from '../contexts/ThemeProvider';

const googleProvider = new GoogleAuthProvider();

function Register() {
  const { darkTheme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = password => /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6;

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, photoURL, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) return toast.error('Please fill all required fields');
    if (!validatePassword(password)) return toast.error('Password must have uppercase, lowercase & minimum 6 characters');
    if (password !== confirmPassword) return toast.error('Passwords do not match');

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL: photoURL || null });
      toast.success('Registration successful! Redirecting...');
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

  // --------- Dynamic Theme Colors ---------
  const colors = {
    containerBg: darkTheme ? '#4B3621' : '#FFF7F0', 
    formBg: '#FFF7F0', 
    textColor: '#4B3621', 
    inputBg: '#FFF7F0', 
    inputBorder: '#D1BFA7', 
    placeholderColor: '#A88C6D',
    buttonBg: '#4B3621',
    buttonHoverBg: '#3C2B1F',
    orColor: '#8C6E58',
    googleColor: '#4B3621',
    googleBg: '#FFF7F0',
    shadow: darkTheme ? '0 8px 24px rgba(0,0,0,0.5)' : '0 8px 24px rgba(45,106,79,0.3)',
  };

  return (
    <div style={{
      minHeight: '80vh',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      backgroundColor: colors.containerBg,
      transition: 'background-color 0.3s ease',
    }}>
      <form onSubmit={handleSubmit} style={{
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
      }}>
        <h2 style={{ marginBottom: '25px', textAlign: 'center', fontWeight: '700', fontSize: '1.8rem' }}>Register</h2>

        <label style={{ marginBottom: '6px', fontWeight: '600' }}>Name*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
          style={{
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
          }}
        />

        <label style={{ marginBottom: '6px', fontWeight: '600' }}>Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email address"
          style={{
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
          }}
        />

        <label style={{ marginBottom: '6px', fontWeight: '600' }}>Photo URL (optional)</label>
        <input
          type="text"
          name="photoURL"
          value={formData.photoURL}
          onChange={handleChange}
          placeholder="https://example.com/photo.jpg"
          style={{
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
          }}
        />

        <label style={{ marginBottom: '6px', fontWeight: '600' }}>Password*</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="At least 6 chars, uppercase & lowercase"
          style={{
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
          }}
        />

        <label style={{ marginBottom: '6px', fontWeight: '600' }}>Confirm Password*</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          placeholder="Re-enter your password"
          style={{
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
          }}
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
            userSelect: 'none',
            transition: 'all 0.3s ease',
            width: '100%',
            marginTop: '10px',
            backgroundColor: loading ? '#8C6E58' : colors.buttonBg,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div style={{ textAlign: 'center', margin: '20px 0', fontWeight: '600', color: colors.orColor }}>OR</div>

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
            padding: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            fontSize: '1rem',
          }}
        >
          Continue with Google
        </button>
      </form>

      {/* Responsive */}
      <style>{`
        @media (max-width: 500px) {
          form {
            padding: 25px 20px !important;
          }
          h2 { font-size: 1.5rem !important; }
          input, button { font-size: 0.95rem !important; padding: 12px !important; }
        }
        input::placeholder {
          color: ${colors.placeholderColor};
          opacity: 1;
          font-style: italic;
        }
        button:hover {
          background-color: ${colors.buttonHoverBg} !important;
        }
      `}</style>
    </div>
  );
}

export default Register;
