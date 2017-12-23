import { Hooks, Logger, Reaction } from "/server/api";
import { Shops } from "/lib/collections";


function addRolesToVisitors() {
  // Add the aboutUs permission to all default roles since it's available to all
  Logger.info("::: Adding lifestyle route permissions to default roles");
  const shop = Shops.findOne(Reaction.getShopId());
  Shops.update(shop._id, {
    $addToSet: { defaultVisitorRole: "lifestyle" }
  }
  );
  Shops.update(shop._id, {
    $addToSet: { defaultRoles: "lifestyle" }
  });
}

Hooks.Events.add("afterCoreInit", () => {
  addRolesToVisitors();
});
