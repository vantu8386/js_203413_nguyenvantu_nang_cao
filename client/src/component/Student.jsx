import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Student() {
  const [sortBy, setSortBy] = useState(true);
  const [students, setStudents] = useState([]);
  const [createStudent, setCreateStudent] = useState({
    name: "",
    description: "",
  });
  const [selectedStudent, setSelectedStudent] = useState({
    name: "",
    description: "",
  });

  const { name, description } = createStudent;

  const loadStudents = () => {
    axios
      .get("http://localhost:3000/api/v1/users")
      .then((res) => setStudents(res.data.users))
      .catch((err) => console.log(err));
  };

  const hanleChange = (e) => {
    setCreateStudent({ ...createStudent, [e.target.name]: e.target.value });
  };

  const hanleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/users", createStudent)
      .then((res) => {
        console.log(res);
        loadStudents();
        setCreateStudent({
          name: "",
          description: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleEditClick = (student) => {
    console.log(student);
    setSelectedStudent({
      id_user: student.id_user,
      name: student.name,
      description: student.description,
    });
  };
  const hanleSubmitUpdate = (e) => {
    e.preventDefault();
    console.log(selectedStudent);
    axios
      .patch(
        `http://localhost:3000/api/v1/users/${selectedStudent.id_user}`,
        selectedStudent
      )
      .then((res) => {
        console.log(res.data);
        loadStudents();
        setSelectedStudent({
          id: "",
          name: "",
          description: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const hanleChangeUpdate = (e) => {
    setSelectedStudent({ ...selectedStudent, [e.target.name]: e.target.value });
  };

  const handleDelete = (student) => {
    const studentId = student.id_user;
    axios
      .delete(`http://localhost:3000/api/v1/users/${studentId}`)
      .then((res) => {
        console.log(res.data);
        loadStudents();
      })
      .catch((err) => console.log(err));
  };

  const handleSort = (sortStudent) => {
    const sortedStudents = [...students];
    sortedStudents.sort((a, b) => {
      if (sortBy) {
        return a.id_user - b.id_user;
      } else {
        return b.id_user - a.id_user;
      }
    });
    setStudents(sortedStudents);
    setSortBy(!sortBy);
  };

  useEffect(() => {
    loadStudents();
  }, []);
  return (
    <>
      <div className="student">
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create Student
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Create Student
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form onSubmit={hanleSubmit}>
                  <label>Name</label>
                  <br />
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={hanleChange}
                  />
                  <br />
                  <label>Description</label>
                  <br />
                  <textarea
                    id=""
                    cols="50"
                    rows="5"
                    name="description"
                    value={description}
                    onChange={hanleChange}
                  ></textarea>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <h1>List Student</h1>
        <table className="table ">
          <thead>
            <tr>
              <th scope="col" onClick={handleSort}>
                stt <i className="fa-solid fa-sort"></i>
              </th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((e, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{e.name}</td>
                  <td>{e.description}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => handleEditClick(e)}
                    >
                      Update
                    </button>
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex={-1}
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="staticBackdropLabel"
                            >
                              Update Student
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            <form onSubmit={hanleSubmitUpdate}>
                              <label>Name</label>
                              <br />
                              <input
                                type="text"
                                name="name"
                                value={selectedStudent.name}
                                onChange={hanleChangeUpdate}
                              />
                              <br />
                              <label>Description</label>
                              <br />
                              <textarea
                                cols="50"
                                rows="5"
                                name="description"
                                value={selectedStudent.description}
                                onChange={hanleChangeUpdate}
                              ></textarea>
                              <br />
                              <button
                                type="submit"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                              >
                                Update
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger xoa"
                      onClick={() => handleDelete(e)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
