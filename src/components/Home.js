import React from "react";
import { useState } from "react";
import db from "../firebaseConfig";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Home = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Adding a new doc to the collection
    db.collection("users").add({
      name,
      height,
      weight,
    });
    setName("");
    setHeight("");
    setWeight("");
  };
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  return (
    <div style={{ textAlign: "-moz-center" }}>
      <h1>Home</h1>
      <Form className="formDatas" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Client's Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Client's Height</Form.Label>
          <Form.Control
            type="text"
            placeholder="Height"
            onChange={(e) => setHeight(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Client's Weight</Form.Label>
          <Form.Control
            type="text"
            placeholder="Weight"
            onChange={(e) => setWeight(e.target.value)}
          />
        </Form.Group>
        <Button variant="warning" type="submit">
          Add Client
        </Button>
      </Form>
    </div>
  );
};
export default Home;
