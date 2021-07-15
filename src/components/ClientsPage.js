import React from "react";
import { useState, useEffect } from "react";
import db from "../firebaseConfig";
import {
  Link
} from "react-router-dom";


const ClientsPage = () => {

  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
  
    // Fetching all the collection
    const collection = await db.collection("users").get();
    const arrayOfDocs = collection.docs.map((doc) => {
      // console.log("doc.id", doc.id);
      return { id: doc.id, ...doc.data() };
    });
    console.log("arrayOfDocs",arrayOfDocs)
    setUsers(arrayOfDocs);
    


  };

  useEffect(() => {
    fetchUsers();
  }, []);

console.log("users: ", users)
  // https://github.com/KaterinaLupacheva/react-sorting-with-dropdown/blob/master/src/App.js
  // https://dev.to/ramonak/react-how-to-dynamically-sort-an-array-of-objects-using-the-dropdown-with-react-hooks-195p
  
  // const [data, setData] = useState(users);
  // const [sortType, setSortType] = useState('name');
  // useEffect(() => {
  //   const sortArray = type => {
  //     const types = {
  //       name: 'name',
  //       bmi: 'bmi',
  //     };
  //     const sortProperty = types[type];
  //     const sorted = [...bands].sort((a, b) => b[sortProperty] - a[sortProperty]);
  //     setData(sorted);
  //   };

  //   sortArray(sortType);
  // }, [sortType]); 
  

  return (
    <>
      <div>
        <h1>Clients List</h1>

        {/* <select onChange={(e) => setSortType(e.target.value)}> 
          <option value="name">Name</option>
          <option value="bmi">BMI</option>
        </select> */}



        {users.map((user) => 
        {   
        const removeClient = async () => {
          await db.collection('users').doc(user.id).delete()
          fetchUsers()
        }

        const editClient = async () => {
          let editedName = prompt("New name: ")
          let editedHeight = prompt("New height: ")
          let editedWeight = prompt("New weight: ")
          await db.collection('users').doc(user.id).set({
            name : editedName,
            height : editedHeight,
            weight : editedWeight
          })
          fetchUsers()
        }

    
        let bmi = (user.weight/((user.height*user.height)/10000)).toFixed(2)
        
        return (
          // CAN I SORT DATA???
          <div id={user.name.replace(/ /g, "")} className="clients">
            <span>Name: {user.name}</span>
            <br />
            <span>Height: {user.height}cm</span>
            <br />
            <span>Weight: {user.weight}kg</span>
            <br />
            <span>BMI: {bmi}</span>
            <br />
            {/* <button onClick={navigateToBoard}>Go to Weekly Board</button> */}
            <button onClick={editClient}>Edit Client</button>
            <button onClick={removeClient}>Good Bye Client</button>
            <button><Link to={`/weeklyBoard/${user.id}`}>Select Client</Link></button>
            <br />
            <br />
          </div>
        );
      })}
      </div>
    </>
    )
  };
  export default ClientsPage;