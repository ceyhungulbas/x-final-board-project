import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../firebaseConfig";
// https://firebase.google.com/docs/firestore/query-data/get-data





const WeeklyBoard = () => {
  let {id} = useParams()
  // console.log("id: ", id)

  const [user, setUser] = useState([])

  const fetchUser = async () => {

    let docRef = await db.collection("users").doc(id);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("fetchUser Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

        setUser(doc.data())

    });
}

  useEffect(() => {
    fetchUser();
  }, []);

// console.log("user ", user)

let bmi = (user.weight/((user.height*user.height)/10000)).toFixed(2)

// Fetching and storing all exercises 
let [allExercises, setAllExercises] = useState({
  "Monday" : [],
  "Tuesday" : [],
  "Wednesday" : [],
  "Thursday" : [],
  "Friday" : [],
  "Saturday" : [],
  "Sunday" : [],
})

// State for Input Value
const [exercise, setExercise] = useState('')

// State for Select Day || "Monday" for Default Value
const [exerciseDay, setExerciseDay] = useState({
  value : 'Monday'
})

// Select Day
const handleDayChange = (e) => {
  setExerciseDay({value: e.target.value})
}

// Changing Input Value
const handleChange = (e) => {
  setExercise({value: e.target.value});
}

// Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  allExercises[exerciseDay.value].push(exercise.value)

  // Adding exercise
  await db.collection("users").doc(id)
    .collection("workouts").doc(exerciseDay.value).set({
    ...allExercises[exerciseDay.value]
  })

  // For realtime update
  let docRef = await db.collection("users").doc(id).collection("workouts")
  docRef.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      setAllExercises((prevState) => {
        return {...prevState, [doc.id]: [...Object.values(doc.data())]}
      })
    });
  });

  // For realtime update
  // fetchExerciseFunc()

};


// Fetch exercise to add new datas
const fetchExerciseFunc = async () => {

  let docRef = await db.collection("users").doc(id).collection("workouts")
  
  docRef.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      setAllExercises((prevState) => {
        return {...prevState, [doc.id]: [...Object.values(doc.data())]}
      })
    });
  });

}

console.log("allExercises: ", allExercises)

useEffect(() => {
  fetchExerciseFunc();
}, []);




// const LiTagData = () => {
//   let data = Object.values(allExercises)
//   const listData = data.map((d) => <li key={d.name}>{d.name}</li>)
//   return listData
// }

// {allExercises.map((item) => (
//   <span id={item.id}>
//     {Object.values(item).map((val) => (
//       <span>{val}</span>
//     ))}
//   </span>
// ))}


return (
  <>
    <div>
      <span>Name: {user.name}</span>
      <br />
      <span>Height: {user.height}cm</span>
      <br />
      <span>Weight: {user.weight}kg</span>
      <br />
      <span>BMI: {bmi}</span>
      <br />
      <br />
    </div>
    <form id="weeklyBoardForm">
      <input type="text" placeholder="Exercises" value={exercise.value} onChange={handleChange} />
      <select value={exerciseDay.value} onChange={handleDayChange}>
        <option value="Monday">Monday </option>
        <option value="Tuesday">Tuesday </option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
      <input type="submit" onClick = {handleSubmit} />
    </form>
    <div id="daysDiv">
      {Object.keys(allExercises).map((key) => {
        return <div className="days">
          <h1>{key}</h1>
          <p>
            
          </p>
          
        </div>
      })}
 
      {/* <table>
        <tr>
          {Object.keys(allExercises).map((key) => {
            return <th>{key}</th>
          })}
        </tr>
        {allExercises.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
      </table> */}
      {/* <tr>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
        <th>Sunday</th>
      </tr>
      <tr>
        <td>
          {allExercises.Monday}
        </td>
        <td>
          {allExercises.Tuesday}
        </td>
        <td>
          {allExercises.Wednesday}
        </td>
        <td>
          {allExercises.Thursday}
        </td>
        <td>
          {allExercises.Friday}
        </td>
        <td>
          {allExercises.Saturday}
        </td>
        <td>
          {allExercises.Sunday}
        </td>
      </tr> */}
    </div>
  </>
  )
};


export default WeeklyBoard;