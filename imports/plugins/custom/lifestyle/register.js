import { Reaction } from "server/api";

Reaction.registerPackage({
  label: "Lifestyle",
  name: "lifestyle",
  autoEnable: true,
  registry: [
    {
      route: "/lifestyle",
      name: "lifestyle",
      template: "lifestyle",
      workflow: "coreWorkflow"
    }
  ]
});
