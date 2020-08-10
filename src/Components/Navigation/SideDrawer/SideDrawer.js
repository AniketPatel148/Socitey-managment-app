import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}
	return (
		<div>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(" ")}>
				<div className={classes.Logo}></div>
				<nav>
					<NavigationItems
						isAuth={props.isAuthenticated}
						clicked={props.closed}
					/>
				</nav>
			</div>
		</div>
	);
};

export default sideDrawer;
