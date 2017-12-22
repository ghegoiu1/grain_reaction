import { Logger, Router } from "/client/api";

function logSomeStuff() {
  Logger.warn("We're arriving at the product page!");
}
// add that to the product detail page onEnter hook

Router.Hooks.onEnter("aboutUs", logSomeStuff);
