import React from "react";
import { Github } from "react-bootstrap-icons";

const Contact = () => {
  return (
    <div id="contactPage">
      <h1>Contact us</h1>
      <div id="contactGithub">
        <a href="https://github.com/mustafaguldag/">
          <Github />
          Mustafa Guldag
        </a>
        <a href="https://github.com/ceyhungulbas/">
          <Github />
          Ceyhun Gulbas
        </a>
      </div>
    </div>
  );
};

export default Contact;
