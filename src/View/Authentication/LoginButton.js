import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0(); // Destructure login function from Auth0

  return (
    <button onClick={() => loginWithRedirect()} className="login-button">
      Login
    </button>
  );
};

export default LoginButton;
