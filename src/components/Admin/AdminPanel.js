import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import userDataService from "../../Services/crudFirebase";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await userDataService.getAllUsers();
    console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  function todoLister() {
    navigate("/todo-table");
  }
  async function handleLogout() {
    try {
      await logout();
      navigate("/admin-login");
    } catch {}
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h1>Users Table</h1>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Username</th>
                <th>User email</th>
                <th>User Contact</th>
              </tr>
            </thead>
            <tbody>
              {users.map((doc) => {
                return (
                  <tr key={doc.id}>
                    <td>{doc.name}</td>
                    <td>{doc.email}</td>
                    <td>{doc.contact}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="mb-2 d-flex">
            <Button variant="danger edit mx-3" onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="outline-dark edit mx-3" onClick={todoLister}>
              View Todos
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default AdminPanel;
