import Header from "./components/Header"
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import "./MainPage.css"
import "./components/Demo.css"

function MainPage() {
  return (
    <div className="wow">
    <div className="enter">
      <img className="img-1" src="/1.jpg" alt=""/> 
      <img className="img-2" src="/2.jpg" alt=""/> 
    </div> 
    <div className="main">
      <div className="andar">
        <Header />
        <div className="components">
          <SideBar />
          <Chat />
        </div>
      </div>
    </div>
    </div>
  );
}

export default MainPage;
