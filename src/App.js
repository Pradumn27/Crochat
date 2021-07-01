import MainPage from "./MainPage";
import {useStateValue} from './StateReducer/StateProvider';
import Login from "./Auth/Login"
function App() {
  const [{user},dispatch] = useStateValue()
  return (
    <div >
      {!user?<Login/>:
      <MainPage/>}
    </div>
  );
}

export default App;
