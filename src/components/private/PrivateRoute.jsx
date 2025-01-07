import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  // Verifica si el usuario está autenticado (puede ser un token o usuario en Redux)
  const { user } = useSelector((state) => state.auth);

  // Redirige al login si no hay usuario autenticado
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
