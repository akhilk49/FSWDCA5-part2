import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './counter.css'

const Counter = () => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [userData, setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedName, setSelectedName] = useState('All');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/users");

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      const user = userData?.find(user => user.id === count.toString());
      setCurrentUser(user);
    }, [count, userData]);

    useEffect(() => {
        if (selectedName === 'All') {
          setCurrentUser(null); 
        } else {
          const filtered = userData.find(user => user.country === selectedName);
          setCurrentUser(filtered);
        }
      }, [selectedName, userData]);
  
    const start = () => {
      if (countRef.current !== null) return;
      countRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    };
  
    const pause = () => {
      clearInterval(countRef.current);
      countRef.current = null;
    };
  
    const stop = () => {
      clearInterval(countRef.current);
      countRef.current = null;
      setCount(0);
    };

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
      };
  
    return (
      <div className="parent">
        <h1>React Counter</h1>
        <p>Count: {count}</p>
        <div className="counter">
          <button onClick={start}>Start</button>
          <button onClick={pause}>Pause</button>
          <button onClick={stop}>Stop</button>
        </div>
        <button>
          <NavLink to="/input" className="nav-link">
            user Input
          </NavLink>
        </button>
        <div>
          <select onChange={handleNameChange} value={selectedName}>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
            <option value="China">China</option>
            <option value="New Zealand">NewZealand</option>
            <option value="Finland">Finland</option>
            <option value="Nepal">Nepal</option>
            <option value="France">France</option>
          </select>
        </div>
        {currentUser && (
          <div className='userdata'>
            <h2>User Data:</h2>
            <p>ID: {currentUser.id}</p>
            <p>User: {currentUser.user}</p>
            <p>Password: {currentUser.password}</p>
            <p>Country: {currentUser.country}</p>
          </div>
        )}
      </div>
    );
}

export default Counter;
