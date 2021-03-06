import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Layout.css";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<div>
				<Toolbar
					isAuthenticated={this.props.isAuthenticated}
					drawerToggleClicked={this.sideDrawerToggleHandler}
				/>
				{this.props.isAuthenticated ? (
					<SideDrawer
						isAuthenticated={this.props.isAuthenticated}
						open={this.state.showSideDrawer}
						closed={this.sideDrawerClosedHandler}
					/>
				) : null}
				<main className={classes.Content}>{this.props.children}</main>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token,
	};
};

export default connect(mapStateToProps)(Layout);
