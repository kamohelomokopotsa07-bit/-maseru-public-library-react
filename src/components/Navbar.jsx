import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav>

            <h1>MASERU PUBLIC LIBRARY</h1>

            <div>
                <Link to="/dashboard">DASHBOARD</Link>

                <Link to="/books">BOOK MANAGEMENT</Link>

                <Link to="/transactions">TRANSACTIONS</Link>

                <Link to="/users">USER MANAGEMENT</Link>
            </div>

        </nav>
    );
}

export default Navbar;