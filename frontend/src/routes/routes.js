import routesAdmin from "./routes.admin";
import routesUser from "./routes.user";
import routesAuth from "./routes.auth";

const routes = [...routesAdmin, ...routesUser, ...routesAuth];

export default routes;
