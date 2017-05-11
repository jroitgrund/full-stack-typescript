import * as React from "react";

declare const require: any;
const styles = require("../../../../web/src/components/app-style");

export class App extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <div className={styles.mainApp}>
                <h1>App</h1>
            </div>
        );
    }
}
