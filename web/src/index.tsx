import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import { App } from "./components/app";

declare const require: any;
require("normalize-css");
require("../../../web/src/style");

const rootElement = document.getElementById("app");

function render(Component: any) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement);
}

render(App);

declare const module: any;
if (module.hot) {
    module.hot.accept("./components/app", () => {
        const NextApp = require("./components/app").default;
        render(App);
    });
}
