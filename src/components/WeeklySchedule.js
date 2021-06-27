import React from "react";
import { useState, useEffect } from "react";
import db from "../firebaseConfig";

const WeeklySchedule = () => {
  const [users, setUsers] = useState([])
  const fetchUsers = async () => {
  
    // Fetching all the collection
    const collection = await db.collection("users").get();
    const arrayOfDocs = collection.docs.map((doc) => {
      // console.log(doc.id);
      return { id: doc.id, ...doc.data() };
    });
    setUsers(arrayOfDocs);
  };
  useEffect(() => {
    fetchUsers();
  }, []);




  return (
  <div>
    <h1>Weekly Schedule</h1>
  
     {users.map((user) => 
  {   return (
      <div>
        <span>Name: {user.name}</span>
        <br />
        <span>Height: {user.height}cm</span>
        <br />
        <span>Weight: {user.weight}kg</span>
        <br />
        <span>BMI: {(user.weight/((user.height*user.height)/10000)).toFixed(2)}</span>
        <br />
      </div>
    );
  })}
  </div>)
};

export default WeeklySchedule;