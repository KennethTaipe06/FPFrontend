import { AdminLayout } from "../layouts";
import Dashboard from "../pages/Admin/Dashboard";

const routesAdmin = [
    {
        path: "/dashboard",
        layout: AdminLayout,
        component: Dashboard,
        isPrivate: true,
    },
];

export default routesAdmin;
