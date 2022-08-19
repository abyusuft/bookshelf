import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import auth from '../../firebase.init'
import { useAuthState } from "react-firebase-hooks/auth";
import './Chat.css'
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { allUsers } from '../../components/Redux/actions/bookActions';
import ChatContainer from '../../components/ChatContainer/ChatContainer';
import { io } from "socket.io-client";
import ChatWelcome from '../../components/ChatWelcome/ChatWelcome';
const Chat = () => {
  const currentUser = useSelector((state) => state?.newUser?.user)
  const [user] = useAuthState(auth);
  const [showChats, setshowChats] = useState([])
  const allUser = useSelector((state) => state.allUser.allUsers)
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)
  const [currentChat, setCurrentChat] = useState(undefined);
  const socket = useRef();

  const allAdmins = allUser?.filter(user => user.user_role === "admin")
  const users = allUser?.filter(user => user.user_role === "user")
 
  useEffect(() => {
    
    const fetchUsers = async () => {
      setLoading(true);
      const res = await axios.get('https://book-shelf-webapp.herokuapp.com/all-users');
      dispatch(allUsers(res.data))
      setLoading(false);
    
    };
  if(allUser.length === 0 ){ 
   
    fetchUsers();
  }
  }, [])

 
  useEffect(() => {
    if(currentUser?.user_role==="admin"){
        setshowChats(users)
    }
    else if(currentUser?.user_role === "user"){
      setshowChats(allAdmins)
  
    }
  }, [currentUser,allUser])
  useEffect(() => {
    if (currentUser) {
      socket.current = io("https://book-shelf-webapp.herokuapp.com");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  if(loading){
    return <Loading/>
  }
  const handleContact = (chat) => {
    setCurrentChat(chat);
    console.log(chat) 
  }
  return (
    <div >
      <p className="text-3xl text-[#00124E] font-semibold p-5 ">
        Chat with { currentUser?.user_role === "user" ? "Admin" :  "users"}
        </p>
      <div className='grid  h-[70vh] w-[90vw] mb-10 border rounded mx-auto'>
        <div className="w-full border-r">
          {/* current user information */}
          <div className="border-b flex items-center ">
            <div class="avatar p-4 ">
              <div class="w-14 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
              <div>
                <p className='ml-1 font-semibold'>{currentUser?.user_name}</p>
              </div>
          </div>
          {/* all users  */}
<div className="overflow-auto h-[50vh] ">
  
    {
      showChats?.map(chatUser =>  <div className="bg-base-200 my-2" onClick={() => handleContact(chatUser)}>
      <div class="avatar p-4 flex items-center ">
        <div class="w-10 rounded-full">
          
          <img src={user?.user_photo_url ? user?.user_photo_url : `https://api.multiavatar.com/${chatUser.user_name}.png`} alt="user photo" />
        </div>
        
          <p className='ml-2 font-semibold'>{chatUser.user_name}</p>
       
      </div>
    </div> )
    }
</div>
        </div>
     
        {currentChat === undefined ? (
                  <ChatWelcome/>

          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
      </div>
        </div>
  )
}

export default Chat