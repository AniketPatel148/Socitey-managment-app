import React from "react";

import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<DrawerToggle clicked={props.drawerToggleClicked} />
		<div className={classes.Logo}>Sahdev Bunglows</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems isAuth={props.isAuthenticated} />
		</nav>
	</header>
);

export default toolbar;
