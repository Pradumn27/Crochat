import UserChecker from "./UserChecker"
import { useStateValue } from "./StateReducer/StateProvider"
import { auth } from './Firebase';
import { useEffect, useState } from "react"
import { actionTypes } from './StateReducer/Reducer';
import Login from "./Auth/Login";
import Loading from "./Loading/Loading";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [isLoading,setIsLoading] = useState(true);
  const [check,setCheck] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      });
      user?setCheck(true):setCheck(false);
      setIsLoading(false);
    });
  },[user,check]);
  return (
    <>
      {isLoading?<Loading/>:check?(
        <div >
          <UserChecker />
        </div>) : <Login />}
    </>
  );
}

export default App;
