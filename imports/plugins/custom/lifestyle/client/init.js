import { Logger, Router } from "/client/api";

function logSomeStuff() {
  Logger.warn("We're arriving at the LIFESTYLE page!");
}
// add that to the product detail page onEnter hook

Router.Hooks.onEnter("lifestyle", logSomeStuff);
