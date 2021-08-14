import React, { useEffect } from 'react';
import useStorage from '../../StorageHook/useStorage';
import { motion } from 'framer-motion';
import db from "../../Firebase";
import "./Profile.css"

const ProgressBar = ({ file, setFile,setPhoto,friends,id}) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
        db.collection("users").doc(id).update({
            photoUrl:url,
        })
        friends.map((friend) => {
            db.collection("users").doc(friend.data.friend).collection("chats").doc(friend.data.friendRoomId).update({
                photo: url,
            })
        })
        setPhoto(url);
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
} 

export default ProgressBar;