import React from "react";
import { replaceComponent } from "/imports/plugins/core/components/lib";
import { getRawComponent } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";

const NavBar = getRawComponent("NavBar");

class CustomNavBar extends NavBar {
  renderCustomMenu() {
    // Logger.info("Goes in here");
    const routes = [
      {
        path: "aboutUs",
        label: "About Us"
      },
      {
        path: "lifestyle",
        label: "Lifestyle"
      }
    ];

    const routesList = routes.map(function (route, index) {
      return <a key={index} href={Reaction.Router.pathFor(route.path)}> {route.label} </a>;
    });

    return <div> {routesList} </div>;
  }

  render() {
    return (
      <div className="rui navbar">
        {this.props.visibility.hamburger && this.renderHamburgerButton()}
        {this.props.visibility.brand && this.renderBrand()}
        {this.props.visibility.tags && this.renderTagNav()}
        {this.renderCustomMenu()}
        {this.props.visibility.search && this.renderSearchButton()}
        {this.props.visibility.notifications && this.renderNotificationIcon()}
        {this.props.visibility.languages && this.renderLanguage()}
        {this.props.visibility.currency && this.renderCurrency()}
        {this.props.visibility.mainDropdown && this.renderMainDropdown()}
        {this.props.visibility.cartContainer && this.renderCartContainerAndPanel()}
      </div>
    );
  }
}

replaceComponent("NavBar", CustomNavBar);

export default CustomNavBar;
