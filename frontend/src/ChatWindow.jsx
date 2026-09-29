import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import React, { useContext , useState, useEffect} from "react";
import { PuffLoader } from "react-spinners";




function ChatWindow() {

    const {prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId,prevChats, setPrevChats, setNewChat}= useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsopen] = useState(false);

    const getReply = async ()=>{
        setNewChat(false);
        setLoading(true);
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:prompt,
                threadId:currThreadId
            })
        };
        try{
            const response = await fetch("https://projectgptbackend.onrender.com/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    //Append new chat to preveous chat
    useEffect(()=>{
      if(prompt && reply){
        setPrevChats(prevChats =>(
          [...prevChats,{
            role:"user",
            content:prompt
          },{
            role:"assistant",
            content:reply
          }]
        ))
      }

      setPrompt("");
    },[reply]);

  const handleProfileClick = ()=>{
    setIsopen(!isOpen);

  }

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span className="sigmaGPT">
          ProjectGPT <i className="fa-solid fa-angle-down"></i>
        </span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

     {
         isOpen && 
         <div className="dropDown">
          <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i>Upgrade</div>
          <div className="dropDownItem"><i class="fa-solid fa-gear"></i>Settings</div>
          <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i>Log out</div>
         </div>
     }

      <Chat />

      <PuffLoader color="#fff" loading={loading}>
        
      </PuffLoader>

      <div className="chatInput">
        <div className="inputBox">
          <input placeholder="Ask anything" 
              value={prompt} 
              onChange={(e)=>setPrompt(e.target.value)} 
              onKeyDown={(e)=> e.key ==='Enter'?getReply() : ''}/>

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </div>
        </div>
        <p className="info">
          ProjectGPT can make mistakes. Check important info. See Cookies Preferences.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
