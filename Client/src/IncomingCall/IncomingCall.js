import React,{useContext} from 'react';
import { SocketContext } from '../VideoContext/Context';
import "./IncomingCall.css"

const IncomingCallDialog = () => {
  const {answerCall} = useContext(SocketContext);
  const handleAcceptButtonPressed = () => {
    answerCall();
  };

  const handleRejectButtonPressed = () => {
    // rejectIncomingCallRequest();
  };

  return (
    <div className='direct_call_dialog background_secondary_color'>
      {/* <span className='direct_call_dialog_caller_name'>{callerUsername}</span> */}
      <div className='direct_call_dialog_button_container'>
        <button className='direct_call_dialog_accept_button' onClick={handleAcceptButtonPressed}>
          Accept
        </button>
        <button className='direct_call_dialog_reject_button' onClick={handleRejectButtonPressed}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default IncomingCallDialog;