import React from "react";
import { useState} from "react";
// You will be able to use this, when you paste your firestore configs inside the firebaseConfig.js file
import db from "../firebaseConfig";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
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
  };
  const [name, setName] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  return (
  <div>
    <h1>Home</h1>
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Name" onChange = {(e) => setName(e.target.value)} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
        {/* <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange = {(e) => setName(e.target.value)}
        required/> */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
         <Form.Label>Height</Form.Label>
         <Form.Control type="text" placeholder="Height" onChange={(e) => setHeight(e.target.value)} />
        </Form.Group>
        {/* <input
          type="text"
          name="height"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        required/> */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
         <Form.Label>Weight</Form.Label>
         <Form.Control type="text" placeholder="Weight" onChange={(e) => setWeight(e.target.value)} />
        </Form.Group>
        <Button variant="warning" type="submit">
          Submit
        </Button>
        {/* <input
          type="text"
          name="weight"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        required/>
        <button type="submit">Submit</button> */}
      </Form>
  </div>
  );
  };
export default Home;