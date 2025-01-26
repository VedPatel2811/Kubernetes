import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginPage.css"; // Add CSS for the modal (see below)

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0(); // Auth0 login function
  const [isOpen, setIsOpen] = useState(false); // State to handle modal visibility

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal} className="login-button">Login</button>
      
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Login</h2>
            <p>Please log in to access your account.</p>
            <div className="modal-actions">
              <button
                onClick={() => {
                  loginWithRedirect();
                  closeModal();
                }}
                className="login-action-button"
              >
                Login with Auth0
              </button>
              <button onClick={closeModal} className="close-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
