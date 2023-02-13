import React, { useEffect, useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import userDataService from "../../Services/crudFirebase";
import "../../styles.css";

export default function Dashboard({ getUserId }) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [photoURL, setphotoURL] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const history = useNavigate();
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history("/");
    } catch {
      setError("Failed to log out");
    }
  }
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await userDataService.getAllUsers();
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  function handleTodo() {
    history("/todo");
  }
  const handleUpdate=(doc)=>{
    getUserId(doc.id)
  }
  useEffect(() => {
    if (currentUser?.photoURL) {
      setphotoURL(currentUser.photoURL);
    }
  }, [currentUser]);
  return (
    <>
      <Card>
        <Card.Body>
          {users.map((doc, index) => {
            if (doc.email === currentUser.email) {
              return (
                <>
                  <h2 className="text-left mb-4 mx-2 text">Profile</h2>
                  <div className="d-flex">
                    <div>
                      <img
                        src={photoURL}
                        width="100px"
                        height="100px"
                        style={{
                          borderRadius: "50%",
                          border: "4px solid gray",
                          marginLeft: "80px",
                        }}
                        alt="Profile"
                        className="avatar mb-4 mx-2"
                      />
                      <br />
                      <h5 className="text-right mx-2">Hello {doc.name} !</h5>
                    </div>
                  </div>
                  <div className="mx-2">
                    <strong>Your Email is </strong> {doc.email} <br />
                    <strong>Your Contact is </strong> {doc.contact} <br />
                  </div>
                  <NavLink
                      to="/update-profile"
                      className="mt-3 mx-2"
                      variant="outline-dark"
                      onClick={handleUpdate(doc.id)}
                    >
                      Update Profile ?
                    </NavLink>
                  <div className="d-flex">
                    <Button
                      className="mx-2 my-3"
                      variant="outline-danger"
                      onClick={handleLogout}
                    >
                      Log Out
                    </Button>
                    <Button
                      className="mt-3 mx-5"
                      variant="warning"
                      style={{ color: "white" }}
                      onClick={handleTodo}
                    >
                      ToDo
                    </Button>
                  </div>
                </>
              );
            }
          })}
        </Card.Body>
      </Card>
    </>
  );
}
