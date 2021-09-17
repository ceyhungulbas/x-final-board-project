import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../firebaseConfig";
import firebase from "firebase/app";
import { TrashFill } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const WeeklyBoard = () => {
  let { id } = useParams();

  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    let docRef = await db.collection("users").doc(id);

    docRef.get().then((doc) => {
      setUser(doc.data());
    });
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  let bmi = (user.weight / ((user.height * user.height) / 10000)).toFixed(2);

  // Fetching and storing all exercises
  let [allExercises, setAllExercises] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  // State for Input Value
  const [exercise, setExercise] = useState("");

  // State for Select Day || "Monday" for Default Value
  const [exerciseDay, setExerciseDay] = useState({
    value: "Monday",
  });

  // Select Day
  const handleDayChange = (e) => {
    setExerciseDay({ value: e.target.value });
  };

  // Changing Input Value
  const handleChange = (e) => {
    setExercise({ value: e.target.value });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    allExercises[exerciseDay.value].push(exercise.value);

    // Adding exercise
    await db
      .collection("users")
      .doc(id)
      .collection("workouts")
      .doc(exerciseDay.value)
      .set({
        ...allExercises[exerciseDay.value],
      });

    // For realtime update
    fetchExerciseFunc();

    // Clears input value
    setExercise({
      value: "",
    });
  };

  const removeExercise = async (val, id, key, index) => {
    db.collection("users")
      .doc(id)
      .collection("workouts")
      .doc(key)
      .update({ [val.index]: firebase.firestore.FieldValue.delete() });

    fetchExerciseFunc();
  };

  // Fetch exercise to add new datas with fetched datas
  const fetchExerciseFunc = async () => {
    let docRef = await db.collection("users").doc(id).collection("workouts");

    docRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setAllExercises((prevState) => {
          return { ...prevState, [doc.id]: [...Object.values(doc.data())] };
        });
      });
    });
  };

  useEffect(() => {
    fetchExerciseFunc();
    // eslint-disable-next-line
  }, []);

  // Main DIV Styling
  const daysDivStyling = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    alignContent: "stretch",
    marginTop: "20px",
  };

  return (
    <>
      <div id="userInfoinWeeklyBoard">
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
      <div style={{ textAlign: "-moz-center" }}>
        <Form className="formDatas" id="weeklyBoardForm">
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Exercises"
              value={exercise.value}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Control
            as="select"
            value={exerciseDay.value}
            onChange={handleDayChange}
          >
            <option value="Monday">Monday </option>
            <option value="Tuesday">Tuesday </option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </Form.Control>
          <Button variant="info" onClick={handleSubmit}>
            Add exercise
          </Button>
        </Form>
      </div>
      <div id="daysDiv" style={daysDivStyling}>
        {Object.keys(allExercises).map((key, index) => {
          return (
            <div className="days" key={index}>
              <h3>{key}</h3>
              {allExercises[key].map((val, index) => (
                <p key={index}>
                  <button
                    id="removeExerciseButton"
                    onClick={() => removeExercise(val, id, key, index)}
                  >
                    <TrashFill color="red" />
                  </button>
                  {val}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeeklyBoard;
