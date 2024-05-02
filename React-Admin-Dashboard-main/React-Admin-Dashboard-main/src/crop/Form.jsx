import React from "react";
import "./Form.css";
import Circle from "./Circle";
import { FaTemperatureLow } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function Form() {
  let data = { N: "", P: "", K: "", Temp: "",Humidity:"",Ph:"",Rainfall: "" },
    form = document.querySelector(".form form");
  // form.addEventListener('submit', () => {
  //     let name = document.querySelector('.form form #name').value,
  //         password = document.querySelector('.form form #password').value,
  //         email = document.querySelector('.form form #email').value,
  //         number = document.querySelector('.form form #number').value,
  //         data = {name:name,password:password,email:email,number:number}

  //     setFormData([...formData,data])
  // })


  


  const [formdata1,setFormData1] = React.useState([]);
  const [Result, setResult] = React.useState();
  const [Result2, setResult2] = React.useState(); 
  const [Result3, setResult3] = React.useState(); 

  function N(event) {
    data.N = event.target.value;
    console.log(data.N);
  }
  function P(event) {
    data.P = event.target.value;
    console.log(data.P)
  }
  function K(event) {
    data.K = event.target.value;
  }
  function Temp(event) {
    data.Temp = event.target.value;
  }
  function Humidity(event) {
    data.Humidity = event.target.value;
  }
  function Ph(event) {
    data.Ph = event.target.value;
  }

  function Rainfall(event) {
    data.Rainfall = event.target.value;
  }

  // function onSubmitForm(event) {
  //   // event.preventDefault();
  //   setFormData1([...formData, data]);
  //   console.log(data);  
  // }

  function submit(event){
    console.log(data);
    setFormData1([...formdata1,data]);
    event.preventDefault();
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:5500';
    // console.log(formdata1);
    axios.post('http://localhost:5500/predict',data).then((response) => {  
      console.log(response);
      setResult(response.data.element1);
      setResult2(response.data.element2);
      setResult3(response.data.element3);
    })
  }

  return (
    <>
    
    
    <div className="outer">
    <Circle />
    {/* <h1>RECOMMENDATION's </h1> */}
    <main className="main-container22">
    <h1>Top Recomended crops </h1>
    <div className="card11">
          <div className="card-inner11">
            <h3>Recomendation 1</h3>
            {/* <FaTemperatureLow className="card_icon" /> */}
          </div>
          <h1>{Result}</h1>
        </div>
        <div className="space"></div>
        <div className="card11">
          <div className="card-inner11">
            <h3>Recomendation 2</h3>
            {/* <FaTemperatureLow className="card_icon" /> */}
          </div>
          <h1>{Result2}</h1>
        </div>
        <div className="space"></div>
        <div className="card11">
          <div className="card-inner11">
            <h3>Recomendation 3</h3>
            {/* <FaTemperatureLow className="card_icon" /> */}
          </div>
          <h1>{Result3}</h1>
        </div>
   </main>
    
    <div className="form">
        <center>
        <h2>CROP</h2>
        <h2>RECOMMENDATION</h2>
        </center>
      <form>
        <div class="input-container ic1">
          <input
            type={"number"}
            id={"name"}
            className={"input"}
            autoComplete={"off"}
            placeholder={" "}
            onChange={(e) => {N(e)}}
          ></input>
          <div class="cut"></div>
          <label for={"text"} className={"placeholder"}>
            Nitrogen value
          </label>
        </div>
        <div class="input-container ic1">
          <input
            type={"number"}
            id={"password"}
            className={"input"}
            autoComplete={"off"}
            placeholder={" "}
            onChange={(e) => {P(e)}}
          ></input>
          <div class="cut"></div>
          <label for={"password"} className={"placeholder"}>
            Phosphor value
          </label>
        </div>
        <div class="input-container ic1">
          <input
            type={"number"}
            id={"email"}
            className={"input"}
            autoComplete={"off"}
            placeholder={" "}
            onChange={K}
          ></input>
          <div class="cut"></div>
          <label for={"email"} className={"placeholder"}>
            Potassium value
          </label>
        </div>
        <div class="input-container ic1">
          <input
            type={"number"}
            id={"number"}
            className={"input"}
            autoComplete={"off"}
            placeholder={" "}
            onChange={Temp}
          ></input>
          <div class="cut"></div>
          <label for={"number"} className={"placeholder"}>
            Temperature value in <sup>0</sup>C
          </label>
        </div>

        <div class="input-container ic1">
          <input
            type={"number"}
            id={"number"}
            className={"input"}
            autoComplete={"off"}
            placeholder={" "}
            onChange={Humidity}
          ></input>
          <div class="cut"></div>
          <label for={"number"} className={"placeholder"}>
            Humidity value
          </label>
        </div>

        <div class="input-container ic1">
          <input
            type={"number"}
            id={"number"}
            className={"input"}
            autoComplete={"off"}
            placeholder={" "}
            onChange={Ph}
          ></input>
          <div class="cut"></div>
          <label for={"number"} className={"placeholder"}>
            Soil pH value
          </label>
        </div>

        <div class="input-container ic1">
          <input
            type={"number"}
            id={"number"}
            className={"input"}
            autoComplete={"off"}
            placeholder={" "}
            onChange={Rainfall}
          ></input>
          <div class="cut"></div>
          <label for={"number"} className={"placeholder"}>
            Precipitation rate
          </label>
        </div>
        <input type={"submit"} onClick={submit} className={"submit"}></input>
      </form>
    </div>
    </div>
    </>
  );
}

export default Form;
