import React from "react";
import { useEffect, useState } from "react";  
import io from 'socket.io-client';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsMoisture,
} from "react-icons/bs";
import { FaRegSun } from "react-icons/fa";
import { GiPressureCooker } from "react-icons/gi";
import { GiWaterfall } from "react-icons/gi";
import { RiWaterFlashFill } from "react-icons/ri";
import { FaWaterLadder } from "react-icons/fa6";
import { FaTemperatureLow } from "react-icons/fa";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";



function Home() {
  let a = 55;
  const [socket, setSocket] = useState(null);
  const [Humidity, setHumidity] = useState(0);
  const [Temperature, setTemperature] = useState(0);  
  const[Waterflowchart, setwaterflowchart] = useState([]); 
  const[flowRate, setFlowRate] = useState(0);
  const[waterconsumption, setWaterConsumption] = useState(0);
  const[LDR, setLDR] = useState(); 
  const[soilMoisture, setsoilMoisture] = useState(); 
  const updateWaterflowchart = (datarecieved) => {
    
    setwaterflowchart(prevFlowchart => [...prevFlowchart, datarecieved]);
    // console.log(Waterflowchart);
  };

  useEffect(() => {
    const interval = setInterval(updateWaterflowchart, 2000); // Call updateWaterflowchart every 5 seconds
    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

    useEffect(() => {
        try {
            const socketInstance = io('http://localhost:3000');
        setSocket(socketInstance);
        
        // listen for events emitted by the server
      
        socketInstance.on('connect', () => {
          console.log('Connected to server');
        });
        
        socketInstance.on('humidity', (data) => {
            setHumidity(data);
          // console.log(`Received message: ${data}`);
        });
        socketInstance.on('temperature', (data) => {
          setTemperature(data);
        // console.log(`Received message: ${data}`);
      });
      socketInstance.on('flowrate', (data) => {
        setFlowRate(data.flowrate);
        updateWaterflowchart(data);
    });

    socketInstance.on('waterconsumption', (data) => {
      setWaterConsumption(data);
      // console.log(`Received message: ${data}`);
    }
    );

    socketInstance.on('LDR', (data) => {
      setLDR(data);
      // console.log(`Received message: ${data}`);
    }
    );

    socketInstance.on('SoilMoisture', (data) => {
      setsoilMoisture(data);
      // console.log(`Received message: ${data}`);
    }
    );

    socketInstance.on('data', (data) => {
          // console.log(`Received data: ${data}`);
          
    });

        return () => {
            if (socketInstance) {
              console.log("connection alive")
            }else{
                // console.log("connection closed")
            }
          };
            
        } catch (error) {
          console.log(error);
        }
        
        }, []);
  
   
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>TEMPERATURE</h3>
            <FaTemperatureLow className="card_icon" />
          </div>
          <h1>{Temperature}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>HUMIDITY</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
            
          </div>
          <h1>{Humidity}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>SUNLIGHT</h3>
            <FaRegSun className="card_icon" />
          </div>
          <h1>{LDR}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>PRESSURE</h3>
            <GiPressureCooker className="card_icon" />
          </div>
          <h1>42</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>WATER FLOW</h3>
            <GiWaterfall className="card_icon" />
          </div>
          <h1>{flowRate}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>TOTAL WATER CONSUMPTION</h3>
            <RiWaterFlashFill className="card_icon" />
          </div>
          <h1>{waterconsumption}L</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>SOIL MOISTURE</h3>
            <BsMoisture className="card_icon" />
          </div>
          <h1>{soilMoisture}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>AVG WATER CONSUMPTION PER WEEK</h3>
            <FaWaterLadder  className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
  
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Waterflowchart.slice(-100)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="6 6" />
            <XAxis dataKey="time"/>
            <YAxis/>
            <Tooltip />
            <Legend />
            <Line
              type="basisOpen"
              dataKey="flowrate"
              stroke="#8884d8"
              
            />
            {/* <Line type="basis" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
