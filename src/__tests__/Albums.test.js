import React from "react";
import { shallow } from "enzyme";
import Albums from "../components/Albums";

it("renders without crashing", () => {
  shallow(<Albums />);
});
