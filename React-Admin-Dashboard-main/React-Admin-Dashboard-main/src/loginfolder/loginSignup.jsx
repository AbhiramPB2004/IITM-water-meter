import React, { useEffect } from "react"
import { useState } from "react"
import axios, { Axios } from "axios";
import {useNavigate} from "react-router-dom";
import  './loginsignup.css'; 

const LoginSignUp = () =>{
const [Page,SetPage] = useState(true);
const[Password,SetPassword] = useState();
const[email,SetEmail] = useState();
const[Username,SetUsername] = useState();
const[University,SetUniversity] = useState();
const[Age,SetAge] = useState();
const[Password2,SetPassword2] = useState();
const[Email2,SetEmail2] = useState();
const[Username2,SetUsername2] = useState();
const[University2,SetUniversity2] = useState();
const[Age2,SetAge2] = useState();
const[errorStatus,setError] = useState();
const navigate = useNavigate();
const action = "Login";
const changeScreenPage =()=>{
    Page?SetPage(false):SetPage(true);
    console.log(Page);
}

// useEffect(() => {
//     axios.defaults.withCredentials = true;
//     axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
//     axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3001';
//     axios.post('http://localhost:3001/JWTAuthenticate').then((response) => {
//     const data = response.data;
//     if(data === "Valid Token"){
//         navigate('/account');
//         console.log("Valid Token");
//     }else{
//         console.log("Invalid Token");
//     });
//     // axios.defaults.withCredentials = true;
//     // axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
//     // axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3001';
//     // axios.post('http://localhost:3001/JWTAuthenticate').catch(function (error) {
//     //     console.log(error);
//     // }).then((response) => {
//     // const data = response.data;
//     // console.log(data);
//     // if(data === "Valid Token"){
//     //     console.log("Valid Token");
//     //     navigate('/');
//     // }else{
//     //     console.log("Invalid Token");
//     // }
//     // });
// },[]);

useEffect(() => {
  
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = ['http://localhost:3001','http://localhost:5173'];
    console.log("JWTAuthenticate");
    axios.post('http://localhost:3001/JWTAuthenticate',{"jwt":"jwt"}).catch(function (error) {
        console.log(error);
    }).then((response) => {
        const data = response.data;
        
    if(data === "Valid Token"){
        console.log("Valid Token");
        
    }else{
        // navigate('/Login');
        console.log("Invalid Token");
    }
    });
},[]);



// const JWTTest = async(e) =>{
//     axios.defaults.withCredentials = true;
//     axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
//     axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3001';
//     await axios.post('http://localhost:3001/JWTAuthenticate',{jwt:"jwt"}).catch(function (error) {
//         console.log(error);
//     }).then((response) => {
//         const data = response.data;
//         console.log(data);
//     });
    
// }

const SignupPost = async(e) =>{
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3001';

await axios.post('http://localhost:3001/SignUp', {
        username: Username,
        university: University,
        email: email,
        age: Age,
        password: Password,
        password2: Password2,
        email2: Email2,
        username2: Username2,
        university2: University2,
        age2: Age2
})      // ,{withCredentials: true,}
    .then( (response) => {
        const data = response.data;
        if(data === "Data inserted"){
            console.log("Data inserted");
            navigate('/');
        }else{
            setError(data);
        }
    })
    .catch( (error) => {
        setError("Server Error");
        console.log(error.name);
    }); 


}

    return (
        
        <div className="container">
        <div className="header">
          <div className="title"></div>
  
          <div className="inputs">
            {action === "Login" ? (
              <div></div>
            ) : (
              <>
                <div className="text">Username</div>
                <input
                  type="text"
                  placeholder="Type your username"
                  id="userIcon"
                />
              </>
            )}
            <div className="text">Email</div>
            <input type="email" placeholder="Type your email" id="emailIcon" />
            <div className="text">Password</div>
  
            <input
              type="password"
              placeholder="Type your password"
              id="passwordIcon"
            />
          </div>
          <div className="section">
            <button
              className={action === "Login" ? "submit" : "subimit"}
              onClick={() => {
                setAction("Sign Up");
              }}
            >
              Login
            </button>
            <div
              className={action === "Sign Up" ? "signup" : "signup"}
              onClick={() => {
                setAction("Login");
              }}
            >
              Or Sign Up
            </div>
          </div>
        </div>
      </div>
   
        




    )
}

export default LoginSignUp
