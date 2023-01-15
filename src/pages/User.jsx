import { useEffect, useState } from "react";
import { instance } from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { Button, Table } from "react-bootstrap";
import { ArrowLeft, ExclamationCircle } from "react-bootstrap-icons";
import capitalize from "../utilities/capitalize";

const User = ({ title }) => {
    const [userDetails, setUserDetails] = useState({});
    const [userPets, setUserPets] = useState([]);

    useEffect(() => {
        /* eslint-enable */
        document.title = title;
        getUserWithPets();
        /* eslint-disable */
    }, []);

    const getUserWithPets = async () => {
        const params = new URL(document.location).searchParams;
        const id = params.get("id");
        const res = await instance.get(`http://localhost:8080/user/${id}/full`);
        setUserDetails(res.data.user);
        setUserPets(res.data.pets);
    };

    const navigate = useNavigate();

    return (
        <div id="dashboard">
            <div id="back-button-container-user-details">
                <Button
                    variant="secondary"
                    className="mb-3"
                    id="back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    <ArrowLeft className="me-2" />
                    Back to Dashboard
                </Button>
            </div>
            <div id="dashboard-body" className="d-flex justify-content-center">
                <div id="dashboard-left">
                    <div
                        className="d-flex justify-content-between align-items-center"
                        id="dashboard-left-header"
                    >
                        <h2>
                            {userDetails.firstName + " " + userDetails.lastName}
                        </h2>
                        <div className="dashboard-stats">
                            <h4>
                                Member Since:{" "}
                                {new Date(
                                    userDetails.createdAt
                                ).toLocaleDateString()}
                            </h4>
                        </div>
                    </div>
                    <div
                        className="d-flex flex-wrap mt-4"
                        id="dashboard-left-container"
                    >
                        <Table striped borderless id="user-details-table">
                            <tbody>
                                <tr>
                                    <td>User ID</td>
                                    <td>{userDetails.id}</td>
                                </tr>
                                <tr>
                                    <td>First Name</td>
                                    <td>{userDetails.firstName}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>{userDetails.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Admin</td>
                                    <td>
                                        {userDetails.isAdmin ? "Yes" : "No"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <a
                                            href={`mailto:${userDetails.email}`}
                                            id="user-email"
                                        >
                                            {userDetails.email}
                                        </a>
                                    </td>
                                </tr>
                                {userDetails.phone && (
                                    <tr>
                                        <td>Phone</td>
                                        <td>
                                            <a
                                                href={`tel:${userDetails.phone}`}
                                                id="user-phone"
                                            >
                                                {userDetails.phone}
                                            </a>
                                        </td>
                                    </tr>
                                )}
                                {userDetails.bio && (
                                    <tr>
                                        <td>Bio</td>
                                        <td>{userDetails.bio}</td>
                                    </tr>
                                )}
                                <tr>
                                    <td>Registered On</td>
                                    <td>
                                        {new Date(
                                            userDetails.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Updated Profile On</td>
                                    <td>
                                        {new Date(
                                            userDetails.updatedAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div id="dashboard-right">
                    <div
                        className="d-flex justify-content-between align-items-center"
                        id="dashboard-right-header"
                    >
                        <h2>{`${userDetails.firstName}'s Pets`}</h2>
                        <div className="dashboard-stats">
                            <h4>Total: {userPets.length}</h4>
                        </div>
                    </div>
                    <div
                        className="d-flex flex-wrap mt-4"
                        id="dashboard-right-container"
                    >
                        {userPets.length > 0 ? (
                            <>
                                <h2 className="mobile-please-rotate mb-4">
                                    Please rotate device to landscape to view
                                    table
                                </h2>
                                <Table
                                    striped
                                    borderless
                                    hover
                                    className="dashboard-table"
                                >
                                    <thead className="p-2">
                                        <tr>
                                            <th>ID</th>
                                            <th>Type</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Registered</th>
                                            <th>Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userPets.map(item => {
                                            const {
                                                id,
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
                                                        navigate(
                                                            `/editpet?id=${id}`
                                                        )
                                                    }
                                                >
                                                    <td>{id}</td>
                                                    <td>{capitalize(type)}</td>
                                                    <td>{name}</td>
                                                    <td>
                                                        {capitalize(status)}
                                                    </td>
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
                            </>
                        ) : (
                            <div
                                className="d-flex justify-content-center align-items-center"
                                id="dashboard-right-placeholder"
                            >
                                <ExclamationCircle />
                                <h4 className="ms-2">
                                    {`There are currently no pets under ${userDetails.firstName}'s care`}
                                </h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
