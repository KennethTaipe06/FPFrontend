import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./routes/Navigation";
import 'semantic-ui-css/semantic.min.css';

function App() {
    return (
        <>
            <Navigation />
            <ToastContainer />
        </>
    );
}

export default App;
