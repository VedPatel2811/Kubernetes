const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_AUTH0_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_AUTH0_REDIRECT_URI;
const AUDIENCE = `https://${AUTH0_DOMAIN}/api/v2/`; // Auth0 API for fetching user info

// Redirect the user to Auth0 login page
export const login = () => {
  const authUrl = `https://${AUTH0_DOMAIN}/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid%20profile%20email&audience=${AUDIENCE}`;
  window.location.href = authUrl;
};

// Exchange authorization code for tokens
export const handleCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    try {
      const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: CLIENT_ID,
          client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET, // Secure
          redirect_uri: REDIRECT_URI,
          code, // Authorization code from callback
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("id_token", data.id_token);

        // Fetch user email and store it
        const email = await fetchUserEmail(data.access_token);
        if (email) {
          sessionStorage.setItem("user_email", email);
          console.log("✅ Email stored successfully:", email);
        }
      }

      window.history.replaceState({}, document.title, "/"); // Clean up URL
    } catch (error) {
      console.error("❌ Error fetching tokens:", error);
    }
  }
};


// Fetch user email using Auth0 API
export const fetchUserEmail = async (accessToken) => {
  try {
    console.log("Fetching user email with token:", accessToken); // Debugging

    const response = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("✅ User info response:", JSON.stringify(data, null, 2)); // Full response

    return data.email || null;
  } catch (error) {
    console.error("❌ Error fetching user email:", error);
    return null;
  }
};


// Get stored tokens
export const getAccessToken = () => sessionStorage.getItem("access_token");
export const getIdToken = () => sessionStorage.getItem("id_token");

// Get stored user email
export const getUserEmail = () => sessionStorage.getItem("user_email");

// Check if the user is authenticated
export const isAuthenticated = () => !!getAccessToken();
