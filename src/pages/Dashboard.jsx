import { useContext, useEffect } from "react";
import { PetContext } from "../contexts/PetContext";
import { UserContext } from "../contexts/UserContext";
import { instance } from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { Table } from "react-bootstrap";
import { CheckLg, ExclamationCircle } from "react-bootstrap-icons";
import capitalize from "../utilities/capitalize";

const Dashboard = ({ title }) => {
    const { allPets, setAllPets } = useContext(PetContext);
    const { allUsers, setAllUsers } = useContext(UserContext);

    useEffect(() => {
        /* eslint-enable */
        document.title = title;
        getAllPets();
        getAllUsers();
        /* eslint-disable */
    }, []);

    const getAllPets = async () => {
        const res = await instance.get("http://localhost:8080/pet");
        setAllPets(res.data);
    };

    const getAllUsers = async () => {
        const res = await instance.get("http://localhost:8080/user");
        setAllUsers(res.data);
    };

    const navigate = useNavigate();

    return (
        <div id="dashboard" className="d-flex justify-content-center">
            <div id="dashboard-pets">
                <div
                    className="d-flex justify-content-between align-items-center"
                    id="dashboard-pets-header"
                >
                    <h2>Pets</h2>
                    <div className="dashboard-stats">
                        <h4>Total: {allPets.length}</h4>
                        <h6>
                            Dogs:{" "}
                            {allPets.filter(pet => pet.type === "dog").length}
                        </h6>
                        <h6>
                            Cats:{" "}
                            {allPets.filter(pet => pet.type === "cat").length}
                        </h6>
                        <h6>
                            Available:{" "}
                            {
                                allPets.filter(
                                    pet => pet.status === "available"
                                ).length
                            }
                        </h6>
                        <h6>
                            Fostered:{" "}
                            {
                                allPets.filter(pet => pet.status === "fostered")
                                    .length
                            }
                        </h6>
                        <h6>
                            Adopted:{" "}
                            {
                                allPets.filter(pet => pet.status === "adopted")
                                    .length
                            }
                        </h6>
                    </div>
                </div>
                <div
                    className="d-flex flex-wrap mt-4"
                    id="dashboard-pets-container"
                >
                    {allPets.length > 0 ? (
                        <Table
                            striped
                            borderless
                            hover
                            className="dashboard-table"
                        >
                            <thead className="p-2">
                                <tr>
                                    <th>ID</th>
                                    <th>Owner ID</th>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Registered</th>
                                    <th>Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPets.map(item => {
                                    const {
                                        id,
                                        uid,
                                        type,
                                        name,
                                        status,
                                        createdAt,
                                        updatedAt,
                                    } = item;
                                    return (
                                        <tr
                                            key={id}
                                            onClick={() =>
                                                navigate(`/editpet?id=${id}`)
                                            }
                                        >
                                            <td>{id}</td>
                                            <td>{uid ? uid : "—"}</td>
                                            <td>{capitalize(type)}</td>
                                            <td>{name}</td>
                                            <td>{capitalize(status)}</td>
                                            <td>
                                                {new Date(
                                                    createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                {updatedAt
                                                    ? new Date(
                                                          createdAt
                                                      ).toLocaleDateString()
                                                    : "—"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    ) : (
                        <div
                            className="d-flex justify-content-center align-items-center"
                            id="dashboard-pets-placeholder"
                        >
                            <ExclamationCircle />
                            <h4 className="ms-2">
                                There are currently no pets registered
                            </h4>
                        </div>
                    )}
                </div>
            </div>
            <div id="dashboard-users">
                <div
                    className="d-flex justify-content-between align-items-center"
                    id="dashboard-users-header"
                >
                    <h2>Users</h2>
                    <div className="dashboard-stats">
                        <h4>Total: {allUsers.length}</h4>
                        <h6>
                            Members:{" "}
                            {allUsers.filter(user => !user.isAdmin).length}
                        </h6>
                        <h6>
                            Admins:{" "}
                            {allUsers.filter(user => user.isAdmin).length}
                        </h6>
                    </div>
                </div>
                <div
                    className="d-flex flex-wrap mt-4"
                    id="dashboard-users-container"
                >
                    <Table striped borderless hover className="dashboard-table">
                        <thead className="p-2">
                            <tr>
                                <th>ID</th>
                                <th>Admin</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Registered</th>
                                <th>Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map(item => {
                                const {
                                    id,
                                    isAdmin,
                                    first_name,
                                    last_name,
                                    email,
                                    phone,
                                    createdAt,
                                    updatedAt,
                                } = item;
                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{isAdmin ? <CheckLg /> : ""}</td>
                                        <td>{first_name + " " + last_name}</td>
                                        <td>{email}</td>
                                        <td>{phone}</td>
                                        <td>
                                            {new Date(
                                                createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            {updatedAt
                                                ? new Date(
                                                      updatedAt
                                                  ).toLocaleDateString()
                                                : "—"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
