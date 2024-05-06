import React, { useState } from 'react';
import "./Input.css";
import axios from 'axios';

const Input = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/users", {id,user,password,country})
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="parent">
      <h1>User Input</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type='text' placeholder='ID'onChange={(e) => setId(e.target.value)} required></input>
        <input type='text' placeholder='User'onChange={(e) => setUser(e.target.value)} required></input>
        <input type='text' placeholder='Password'onChange={(e) => setPassword(e.target.value)} required></input>
        <input type='text' placeholder='Country' onChange={(e) => setCountry(e.target.value)} required></input>
        <button type="Submit">Submit</button>
      </form>
      
    </div>
  );
};

export default Input;
