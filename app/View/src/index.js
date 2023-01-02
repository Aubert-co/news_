import React from "react"
import ReactDOM from "react-dom/client"

import Routes from "./pages/router.js";

const App  =()=><Routes/>

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App/>)