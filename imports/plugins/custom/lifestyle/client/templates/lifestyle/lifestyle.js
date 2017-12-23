import React, { Component } from "react";
import { registerComponent } from "/imports/plugins/core/components/lib/index";

class Lifestyle extends Component {
  render() {
    return <div className="container">lifestyle</div>;
  }
}

registerComponent("lifestyle", Lifestyle);
