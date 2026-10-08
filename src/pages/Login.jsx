import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();


    // The only librarians allowed to log in
    const librarians = [
        {
            name: "Librarian 1",
            membershipId: "LIB001",
            role: "Librarian"
        },
        {
            name: "Librarian 2",
            membershipId: "LIB002",
            role: "Librarian"
        },
        {
            name: "Librarian 3",
            membershipId: "LIB003",
            role: "Librarian"
        }
    ];


    const [selectedLibrarian, setSelectedLibrarian] = useState("");

    const [membershipId, setMembershipId] = useState("");

    const [role, setRole] = useState("");


    function handleLogin(event) {

        event.preventDefault();


        if (
            selectedLibrarian === "" ||
            membershipId.trim() === "" ||
            role === ""
        ) {

            alert("Please complete all login fields.");

            return;
        }


        const librarian =
            librarians[Number(selectedLibrarian)];


        if (
            librarian.membershipId.toLowerCase() ===
            membershipId.trim().toLowerCase() &&
            librarian.role === role
        ) {

            alert(
                "Login successful. Welcome " +
                librarian.name +
                "!"
            );


            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(librarian)
            );


            navigate("/dashboard");

        } else {

            alert(
                "Incorrect login details. " +
                "Please check your Membership ID and Role."
            );

        }

    }


    return (

        <div>

            <h1>MASERU PUBLIC LIBRARY</h1>

            <h2>Librarian Login</h2>


            <form onSubmit={handleLogin}>


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
                    value={membershipId}
                    onChange={function(event) {

                        setMembershipId(
                            event.target.value
                        );

                    }}
                    placeholder="Enter librarian Membership ID"
                />


                <label>Role</label>

                <select
                    value={role}
                    onChange={function(event) {

                        setRole(
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
                    Login
                </button>


            </form>

        </div>

    );
}

export default Login;