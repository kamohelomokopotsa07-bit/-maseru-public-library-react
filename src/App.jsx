import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Bookmanagement from "./pages/Bookmanagement";
import Transactions from "./pages/Transactions";
import UserManagement from "./pages/UserManagement";

import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/books" element={<Bookmanagement />} />

                <Route path="/transactions" element={<Transactions />} />

                <Route path="/users" element={<UserManagement />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;