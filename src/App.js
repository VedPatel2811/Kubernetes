import "./styles.css";
import Header from "./View/Header/Header";
import Menubar from "./View/Menu/Menu";
import Content from "./View/Content/Content";
import Description from "./View/Description/Description";
const App = () => {
  return (
    <div className="marketplace-container">
      <Header />
      <div className="main-layout">
        <Menubar />
        <div className="content">
          <Description/>
          {/* <Content /> */}
        </div>
      </div>
    </div>
  );
};

export default App;
