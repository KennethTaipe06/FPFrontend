import ActivatePage from "../pages/Auth/ActivatePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import ResetPasswordPageConfirm from "../pages/Auth/ResetPasswordPageConfirm";

const routesAuth = [
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/activate/:uid/:token", component: ActivatePage },
    { path: "/reset-password", component: ResetPasswordPage },
    { path: "/password/reset/confirm/:uid/:token", component: ResetPasswordPageConfirm },
];

export default routesAuth;
