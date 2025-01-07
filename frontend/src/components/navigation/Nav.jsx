import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Nav = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Obtener la ruta actual
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    // Ocultar Nav en ciertas rutas
    if ([ "/dashboard" ].includes(location.pathname)) {
        return null;
    }

    return (
        <nav className="navbar">
            <NavLink className="logo" to="/">Logo</NavLink>
            <ul className="nav-links">
                {user ? (
                    <>
                        <NavLink className="nav-childs" to="/dashboard">Dashboard</NavLink>
                        <NavLink className="nav-childs" to="/" onClick={handleLogout}>Logout</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink className="nav-childs" to="/login">Login</NavLink>
                        <NavLink className="nav-childs" to="/register">Register</NavLink>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
