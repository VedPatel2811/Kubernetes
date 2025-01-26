const AUTH0_DOMAIN = "dev-qapjd3lozedt2jn1.us.auth0.com"; // Replace with your Auth0 domain
const CLIENT_ID = "70ibFtYBbilQV1iWhfI9zaF9Qc3rfgqu"; // Replace with your Auth0 client ID
const REDIRECT_URI = "http://localhost:3999"; // Replace with your callback URL

// Redirect the user to Auth0 login page
export const login = () => {
  const authUrl = `https://${AUTH0_DOMAIN}/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid%20profile%20email`;
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
          client_secret: "YOUR_CLIENT_SECRET", // Securely store on server in production
          redirect_uri: REDIRECT_URI,
          code, // Authorization code from callback
        }),
      });

      const data = await response.json();
      sessionStorage.setItem("access_token", data.access_token);
      sessionStorage.setItem("id_token", data.id_token);

      console.log("Tokens stored in sessionStorage:", data);
      window.history.replaceState({}, document.title, "/"); // Clean up query params
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  }
};

// Get the access token from sessionStorage
export const getAccessToken = () => sessionStorage.getItem("access_token");

// Get the ID token from sessionStorage
export const getIdToken = () => sessionStorage.getItem("id_token");

// Log the user out and clear tokens
export const logout = () => {
  sessionStorage.clear(); // Clear tokens from sessionStorage
  const logoutUrl = `https://${AUTH0_DOMAIN}/v2/logout?client_id=${CLIENT_ID}&returnTo=${REDIRECT_URI}`;
  window.location.href = logoutUrl;
};

// Check if the user is authenticated (based on token presence)
export const isAuthenticated = () => !!getAccessToken();
