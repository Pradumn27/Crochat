import {useStateValue} from './StateReducer/StateProvider';
import Login from "./Auth/Login";
import Jag from "./routess"

function App() {
  const [{user},dispatch] = useStateValue()
  return (
    <div >
      {!user?<Login/>:
      <Jag/>}
    </div>
  );
}

export default App;
