// register.js
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "About",
  name: "aboutUs",
  autoEnable: true,
  registry: [
    {
      route: "/aboutUs",
      name: "aboutUs",
      template: "aboutUs",
      workflow: "coreWorkflow"
    }
  ]
});
