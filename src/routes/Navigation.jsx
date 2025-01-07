import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { map } from "lodash";
import routes from "./routes";
import Nav from "../components/navigation/Nav";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "../components/private/PrivateRoute";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {map(routes, (route, index) => {
          const Component = route.component;
          const Layout = route.layout || React.Fragment;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                route.isPrivate ? (
                  <PrivateRoute>
                    <Layout>
                      <Component />
                    </Layout>
                  </PrivateRoute>
                ) : (
                  <Layout>
                    <Component />
                  </Layout>
                )
              }
            />
          );
        })}
        {/* Ruta de 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
