import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" clicked={props.clicked} exact>
			Home
		</NavigationItem>
		<NavigationItem clicked={props.clicked} link="/members">
			Members
		</NavigationItem>
		<NavigationItem clicked={props.clicked} link="/announcements">
			Announcement
		</NavigationItem>
		<NavigationItem clicked={props.clicked} link="/logout">
			Log Out
		</NavigationItem>
	</ul>
);

export default navigationItems;
