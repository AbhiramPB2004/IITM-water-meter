import React from "react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import"./chat.css";
const Chatbot =() =>{
const navigate = useNavigate();
const [Message,SetMessage] = useState([]);
 
const [previousMessage,SetPreviousMessage] = useState();
const [botmessage,SetBotmessage] = useState([]);
const [Value,setValue] = useState();

const ChatUpdate = () =>{   
    // SetMessage([...Message,{message: Value,TypeOfUser: "user"}]);
    const data = {prompt: Value}
    axios.post("http://localhost:5500/chatcompletions",data).then((response) => {
        console.log(response);  
    SetMessage([...Message,{message: Value,TypeOfUser: "user"},{message: response.data,TypeOfUser:"bot"}]);
    });


    
}



    // console.log(Value)
    return(
        <div className="chat-full">
        
            <section className="Side-Bar">
                <button className="new-chat-button">+ NEW CHAT</button>
            <ul className="history">
                <li>history</li>
            </ul>
    
            </section>
            <section className="chat-box">
            {/* <h1 className="header-chat">Career Genie</h1> */}
           
            <ul className="feed">
                {Message.map((message) => { return(
                
                <li><p>{ message.TypeOfUser }</p>

                <p>{message.message}</p>
                
                </li>)})}

          
            </ul>
            
            <div className="bottom-section">
                <div className="input-section">
                    <input className="chat-input" value={Value} onChange={(e) =>{setValue(e.target.value)}}/>
                    <div id="submit" onClick={ChatUpdate}> » </div>
                    
            </div>
                </div>
            
        </section>
        </div>
    )
}

export default Chatbot