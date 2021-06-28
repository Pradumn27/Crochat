import Header from "./components/Header"
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="main">
      <div className="andar">
        <Header />
        <div className="components">
          <SideBar />
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
