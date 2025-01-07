import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../features/auth/authSlice"; // Asegúrate de que está importado correctamente
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Obtener datos del usuario desde el estado global
  const { user, userInfo, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo && user?.access) { // Verificar que existe el token antes de hacer la petición
      dispatch(getUserInfo());
    }
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, userInfo, user?.access, isError, message]);

  if (isLoading) return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos

  if (isError) return <div>Error: {message}</div>; // Mostrar mensaje de error si falla la solicitud

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      {userInfo ? (
        <div>
          <h2>Hello, {userInfo.first_name} {userInfo.last_name}</h2>
          {/* Mostrar más datos del usuario */}
        </div>
      ) : (
        <div>No user info available</div>
      )}
    </div>
  );
};

export default Dashboard;
