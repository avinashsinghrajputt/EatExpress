import { useState } from 'react';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Assuming UserContext is defined elsewhere in your application


  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div className="button-group">
          <button
            className="login-btn"
            onClick={() => {
              setShowLoginModal(true);
              setShowSignupModal(false);
            }}
          >
            Login
          </button>
          <button
            className="signup-btn"
            onClick={() => {
              setShowSignupModal(true);
              setShowLoginModal(false);
            }}
          >
            Signup
          </button>
        </div>
      ) : (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button
              onClick={() => setShowLoginModal(false)}
              className="close-btn"
            >
              ✕
            </button>
            <h2 className="modal-title login-title">Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="form"
            >
              <input type="email" placeholder="Email Address" className="input" />
              <input
                type="password"
                placeholder="Password"
                className="input"
              />
              <button type="submit" className="submit-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button
              onClick={() => setShowSignupModal(false)}
              className="close-btn"
            >
              ✕
            </button>
            <h2 className="modal-title signup-title">Create Account</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="form"
            >
              <input
                type="text"
                placeholder="Full Name"
                className="input"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="input"
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
              />
              <button type="submit" className="submit-btn signup-btn">
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPopup;
