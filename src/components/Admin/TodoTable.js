import React, { useEffect, useState } from "react";
import { Button, Table , Card } from "react-bootstrap";
import { useNavigate ,Link} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { todoDataService } from "../../Services/crudFirebase";

export default function TodoTable() {
  const [todos, setTodos] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    const data = await todoDataService.getAllTodos();
    console.log(data.docs);
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  function todoLister() {
    navigate("/admin-panel");
  }
  async function handleLogout() {
    try {
      await logout();
      navigate("/admin-login");
    } catch {}
  }
  return (
    <>
      <Card className="px-4 py-3">
        <h1>Todo Table</h1>
          <small>List of Todos :</small>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>STATUS</th>
              <th>TASKNAME</th>
              <th>TODOID</th>
              <th>USERID</th>
            </tr>
          </thead>
          <tbody>
            {todos &&
              todos.map((doc) => {
                return (
                  <tr key={doc.id}>
                    <td>{doc.status}</td>
                    <td>{doc.taskname}</td>
                    <td>{doc.todoid}</td>
                    <td>{doc.userid}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div className="mb-2 d-flex">
          <Button variant="danger edit mx-1" onClick={handleLogout}>
            Logout
          </Button>
          <Link to="/admin-panel">

          <Button variant="outline-dark edit mx-1">
            Admin Panel
          </Button>
          </Link>
        </div>
      </Card>
    </>
  );
}
