import "./styles.css";
import Header from "./View/Header/Header";
import Menubar from "./View/Menu/Menu";
import Content from "./View/Content/Content";
const App = () => {
  return (
    <div className="marketplace-container">
      <Header />
      <div className="main-layout">
        <Menubar />
        <div className="content">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default App;
