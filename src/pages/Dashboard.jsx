import { useEffect, useState } from "react";
import { instance } from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { Table } from "react-bootstrap";
import { CheckLg, ExclamationCircle } from "react-bootstrap-icons";
import capitalize from "../utilities/capitalize";

const Dashboard = ({ title }) => {
    const [allPets, setAllPets] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        document.title = title;
        getAllPets();
        getAllUsers();
    }, [title]);

    const getAllPets = async () => {
        const res = await instance.get(
            "https://thepethaven-be.azurewebsites.net/pet"
        );
        setAllPets(res.data);
    };

    const getAllUsers = async () => {
        const res = await instance.get(
            "https://thepethaven-be.azurewebsites.net/user"
        );
        setAllUsers(res.data);
    };

    const navigate = useNavigate();

    return (
        <div id="dashboard" className="d-flex justify-content-center">
            <div id="dashboard-left">
                <div
                    className="d-flex justify-content-between align-items-center"
                    id="dashboard-left-header"
                >
                    <h2>Pets</h2>
                    <div className="dashboard-stats">
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
                        <h4>Total: {allPets.length}</h4>
                    </div>
                </div>
                <div
                    className="d-flex flex-wrap mt-4"
                    id="dashboard-left-container"
                >
                    <h2 className="mobile-please-rotate">
                        Please rotate device to landscape to view table
                    </h2>
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
                                                          updatedAt
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
                            id="dashboard-left-placeholder"
                        >
                            <ExclamationCircle />
                            <h4 className="ms-2">
                                There are currently no pets registered
                            </h4>
                        </div>
                    )}
                </div>
            </div>
            <div id="dashboard-right">
                <div
                    className="d-flex justify-content-between align-items-center"
                    id="dashboard-right-header"
                >
                    <h2>Users</h2>
                    <div className="dashboard-stats">
                        <h6>
                            Members:{" "}
                            {allUsers.filter(user => !user.isAdmin).length}
                        </h6>
                        <h6>
                            Admins:{" "}
                            {allUsers.filter(user => user.isAdmin).length}
                        </h6>
                        <h4>Total: {allUsers.length}</h4>
                    </div>
                </div>
                <div
                    className="d-flex flex-wrap mt-4"
                    id="dashboard-right-container"
                >
                    <h2 className="mobile-please-rotate">
                        Please rotate device to landscape to view table
                    </h2>
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
                                    <tr
                                        key={id}
                                        onClick={() =>
                                            navigate(`/user?id=${id}`)
                                        }
                                    >
                                        <td>{id}</td>
                                        <td>{isAdmin ? <CheckLg /> : ""}</td>
                                        <td id="admin-check">
                                            {first_name + " " + last_name}
                                        </td>
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
