import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import {btn} from "semantic-ui-react";
import registerServiceWorker from "./registerServiceWorker";

import { makeMainRoutes } from "./routes";

ReactDOM.render(makeMainRoutes(), document.getElementById("root"));
