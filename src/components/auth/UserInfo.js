import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function UserInfo(props) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }

    setUser(getUser());
  })

  function getUser(){
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.user;
  }

  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token;
  }


  return (
    <>
      <Button variant="primary" className="m-1" onClick={handleShow}>
        Show User Info
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Username: {user.username}
          <br />
          First Name: {user.first_name}
          <br />
          Last Name: {user.last_name}
          <br />
          Email: {user.email}
          <br />
          Role: {user.role}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserInfo;