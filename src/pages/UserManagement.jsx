import { useState, useEffect } from "react";

function UserManagement() {

    // Three librarians who are allowed to access management
    const librarians = [
        {
            name: "Kamohelo",
            membershipId: "L123",
            role: "Librarian"
        },
        {
            name: "Bohkokoa",
            membershipId: "L456",
            role: "Librarian"
        },
        {
            name: "Megan",
            membershipId: "L789",
            role: "Librarian"
        }
    ];


    // Library users
    const [users, setUsers] = useState([]);


    // Librarian login
    const [selectedLibrarian, setSelectedLibrarian] = useState("");
    const [librarianId, setLibrarianId] = useState("");
    const [librarianRole, setLibrarianRole] = useState("");


    // Library member form
    const [memberName, setMemberName] = useState("");
    const [memberId, setMemberId] = useState("");


    // Logged-in librarian
    const [loggedInLibrarian, setLoggedInLibrarian] = useState(null);


    // Load library users
    useEffect(function() {

        const savedUsers =
            JSON.parse(localStorage.getItem("users")) || [];

        setUsers(savedUsers);

    }, []);


    // LIBRARIAN LOGIN
    function handleLibrarianLogin(event) {

        event.preventDefault();


        if (
            selectedLibrarian === "" ||
            librarianId.trim() === "" ||
            librarianRole === ""
        ) {

            alert("Please complete all librarian login fields.");

            return;
        }


        const librarian =
            librarians[Number(selectedLibrarian)];


        if (
            librarian.membershipId.toLowerCase() ===
            librarianId.trim().toLowerCase() &&
            librarian.role === librarianRole
        ) {

            setLoggedInLibrarian(librarian);

            setSelectedLibrarian("");
            setLibrarianId("");
            setLibrarianRole("");

            alert(
                "Login successful. Welcome " +
                librarian.name +
                "!"
            );

        } else {

            alert(
                "Incorrect librarian details. " +
                "Please check your Membership ID and Role."
            );

        }

    }


    // ADD LIBRARY USER
    function handleAddMember(event) {

        event.preventDefault();


        if (
            memberName.trim() === "" ||
            memberId.trim() === ""
        ) {

            alert("Please enter the member's name and Membership ID.");

            return;
        }


        // Check if membership ID already exists
        const existingUser = users.find(function(user) {

            return (
                user.membershipId.toLowerCase() ===
                memberId.trim().toLowerCase()
            );

        });


        if (existingUser) {

            alert("This Membership ID already exists.");

            return;
        }


        const newMember = {

            name: memberName.trim(),

            membershipId: memberId.trim(),

            role: "Member"

        };


        const updatedUsers = [
            ...users,
            newMember
        ];


        setUsers(updatedUsers);

        localStorage.setItem(
            "users",
            JSON.stringify(updatedUsers)
        );


        setMemberName("");
        setMemberId("");


        alert("Library user registered successfully.");

    }


    // UPDATE MEMBER
    function updateMember(index) {

        const newName = prompt(
            "Enter new name:",
            users[index].name
        );


        if (newName === null) {
            return;
        }


        const newMembershipId = prompt(
            "Enter new Membership ID:",
            users[index].membershipId
        );


        if (newMembershipId === null) {
            return;
        }


        if (
            newName.trim() === "" ||
            newMembershipId.trim() === ""
        ) {

            alert("All fields are required.");

            return;
        }


        const updatedUsers = [...users];


        updatedUsers[index] = {

            name: newName.trim(),

            membershipId: newMembershipId.trim(),

            role: "Member"

        };


        setUsers(updatedUsers);

        localStorage.setItem(
            "users",
            JSON.stringify(updatedUsers)
        );


        alert("Library user updated successfully.");

    }


    // DELETE MEMBER
    function deleteMember(index) {

        const confirmation = confirm(
            "Are you sure you want to delete this library user?"
        );


        if (confirmation) {

            const updatedUsers = users.filter(
                function(user, userIndex) {

                    return userIndex !== index;

                }
            );


            setUsers(updatedUsers);

            localStorage.setItem(
                "users",
                JSON.stringify(updatedUsers)
            );


            alert("Library user deleted successfully.");

        }

    }


    // LOGOUT LIBRARIAN
    function logout() {

        setLoggedInLibrarian(null);

        alert("Librarian has been logged out.");

    }


    return (

        <div>

            <h2>User Management</h2>


            {/* LIBRARIAN LOGIN */}

            {!loggedInLibrarian && (

                <div>

                    <h2>Librarian Login</h2>


                    <form onSubmit={handleLibrarianLogin}>

                        <label>Select Librarian</label>

                        <select
                            value={selectedLibrarian}
                            onChange={function(event) {
                                setSelectedLibrarian(
                                    event.target.value
                                );
                            }}
                        >

                            <option value="">
                                Select Librarian
                            </option>

                            {librarians.map(
                                function(librarian, index) {

                                    return (

                                        <option
                                            key={index}
                                            value={index}
                                        >
                                            {librarian.name}
                                        </option>

                                    );

                                }
                            )}

                        </select>


                        <label>Membership ID</label>

                        <input
                            type="text"
                            value={librarianId}
                            onChange={function(event) {
                                setLibrarianId(
                                    event.target.value
                                );
                            }}
                        />


                        <label>Role</label>

                        <select
                            value={librarianRole}
                            onChange={function(event) {
                                setLibrarianRole(
                                    event.target.value
                                );
                            }}
                        >

                            <option value="">
                                Select Role
                            </option>

                            <option value="Librarian">
                                Librarian
                            </option>

                        </select>


                        <button type="submit">
                            Librarian Login
                        </button>

                    </form>

                </div>

            )}


            {/* LIBRARIAN MANAGEMENT AREA */}

            {loggedInLibrarian && (

                <div>

                    <h2>
                        Welcome, {loggedInLibrarian.name}
                    </h2>


                    <p>
                        You are logged in as a Librarian.
                    </p>


                    <button
                        type="button"
                        onClick={logout}
                    >
                        Logout
                    </button>


                    <hr />


                    {/* LIBRARY USER FORM */}

                    <h2>Register Library User</h2>


                    <form onSubmit={handleAddMember}>

                        <label>Library User Name</label>

                        <input
                            type="text"
                            value={memberName}
                            onChange={function(event) {
                                setMemberName(
                                    event.target.value
                                );
                            }}
                        />


                        <label>Membership ID</label>

                        <input
                            type="text"
                            value={memberId}
                            onChange={function(event) {
                                setMemberId(
                                    event.target.value
                                );
                            }}
                        />


                        <button type="submit">
                            Register Library User
                        </button>

                    </form>


                    {/* REGISTERED USERS */}

                    <h2>Registered Library Users</h2>


                    <table>

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Membership ID</th>

                                <th>Role</th>

                                <th>Actions</th>

                            </tr>

                        </thead>


                        <tbody>

                            {users.map(function(user, index) {

                                return (

                                    <tr key={index}>

                                        <td>
                                            {user.name}
                                        </td>

                                        <td>
                                            {user.membershipId}
                                        </td>

                                        <td>
                                            {user.role}
                                        </td>

                                        <td>

                                            <button
                                                type="button"
                                                onClick={function() {
                                                    updateMember(index);
                                                }}
                                            >
                                                Update
                                            </button>


                                            <button
                                                type="button"
                                                onClick={function() {
                                                    deleteMember(index);
                                                }}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

}

export default UserManagement;