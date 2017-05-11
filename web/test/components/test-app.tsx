import { assert } from "chai";
import { shallow } from "enzyme";
import * as React from "react";

import { App } from "../../src/components/app";

describe("App", () => {
    it("renders the right text", () => {
        const app = shallow(<App />);
        assert.equal(app.text(), "App");
    });
});
