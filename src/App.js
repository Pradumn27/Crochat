import Routess from "./routess"
import { useStateValue } from "./StateReducer/StateProvider"
import { auth } from './Firebase';
import { useEffect } from "react"
import { actionTypes } from './StateReducer/Reducer';
import Login from "./Auth/Login";

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      })
    })
  });
  return (
    <>
      {user ? (
        <div >
          <Routess />
        </div>) : <Login />}
    </>
  );
}

export default App;
