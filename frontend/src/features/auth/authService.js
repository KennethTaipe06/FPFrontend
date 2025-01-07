import axios from "axios";
const BACKEND_DOMAIN = "http://192.168.1.5:8000"; //esto se cambia
const REGISTER_URL = `${BACKEND_DOMAIN}/auth/users/`;
const LOGIN_URL = `${BACKEND_DOMAIN}/auth/jwt/create/`;
const ACTIVATE_URL = `${BACKEND_DOMAIN}/auth/users/activation/`;
const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/auth/users/reset_password/`;
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/auth/users/reset_password_confirm/`;
const GET_USER_INFO = `${BACKEND_DOMAIN}/auth/users/me/`;

// Register user

const register = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await axios.post(REGISTER_URL, userData, config);
    return response.data;
}

//Login user

const login = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await axios.post(LOGIN_URL, userData, config);
    if (response.data && response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data)); // Guarda el token correctamente
    }
    return response.data;
};

//Logout user
const logout = () => {
    return localStorage.removeItem('user');
}

// Activate user
const activate = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await axios.post(ACTIVATE_URL, userData, config);
    return response.data;
}

// Reset password
const resetPassword = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await axios.post(RESET_PASSWORD_URL, userData, config);
    return response.data;
}

// Reset password confirm
const resetPasswordConfirm = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, userData, config);
    return response.data;
}

// get user info
const getUserInfo = async (accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    };
    const response = await axios.get(GET_USER_INFO, config);
    return response.data;
};

const authService = { register, login, logout, activate, resetPassword, resetPasswordConfirm, getUserInfo };

export default authService;