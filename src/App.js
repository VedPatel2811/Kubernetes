import "./App.css";
import Header from "./View/Header/Header";
import Content from "./View/Content/Content";
import Description from "./View/Description/Description";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react"; // Import Auth0 Provider

const App = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN} // Use environment variables for Auth0
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/description/:id" element={<Description />} />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
};

export default App;
