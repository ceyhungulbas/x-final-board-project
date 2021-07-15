import React from "react";
import { useState} from "react";
// You will be able to use this, when you paste your firestore configs inside the firebaseConfig.js file
import db from "../firebaseConfig";

export const Home = () => {
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Adding a new doc to the collection
    db.collection("users").add({
        name,
        height,
        weight,
    });
    setName("")
    setHeight("")
    setWeight("")
    // Buradan id'yi alip urlye ekleyip weeklyboard'a gidecek
  };


  const [name, setName] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  

  
  return (
  <div>
    <h1>Home</h1>
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange = {(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="height"
          placeholder="Height in cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="text"
          name="weight"
          placeholder="Weight in kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      
  </div>
  );
  };

export default Home;