import React from "react";
import Members from "./containers/Members/Members/Members";
import { Link, Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import FullMember from "./containers/Members/FullMember/FullMember";
import ContactForm from "./containers/ContactData/ContactData";
import ContactForm2 from "./containers/ContactData/ContactData2/ContactData2";
import Announcements from "./containers/Announcements/Announcements";
import AddAnnouncement from "./containers/Announcements/AddAnnouncement/AddAnnouncement";
import * as actions from "./store/actions/index";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Layout from "./hoc/Layout/Layout";
import EmailVerification from "./containers/Auth/emailVerification/emaiVerification";

import "./App.css";

class App extends React.Component {
	componentDidMount() {
		this.props.onAutoAuth();
	}

	render() {
		let redirectToAuth = null;
		if (!this.props.emailVerified) {
			redirectToAuth = <Redirect to="/verifyEmail" />;
		}
		if (!this.props.tokenID) {
			redirectToAuth = <Redirect to="/auth" />;
			console.log("/auth", this.props);
		}

		return (
			<div>
				{redirectToAuth}
				<Layout>
					<Route path="/auth">
						<Auth />
					</Route>
					<Route path="/verifyEmail">
						<EmailVerification />
					</Route>
					<Route path="/logout">
						<Logout />
					</Route>
					<Route path="/" exact>
						<div className="dashboardCardDeck">
							<Link to="/members">
								<div className="dashboardCard no1">Members</div>
							</Link>
							<Link to="/announcements">
								<div className="dashboardCard no2">Anouncments</div>
							</Link>
							<Link to>
								<div className="dashboardCard no3">Complaints</div>
							</Link>
							<Link to>
								<div className="dashboardCard no4">Events</div>
							</Link>
						</div>
					</Route>
					<Switch>
						<Route path="/members" exact>
							<Members />
						</Route>
						<Route path="/sahdev/:house" component={FullMember} />
						<Route path="/addsocietymember">
							<ContactForm />
						</Route>
						<Route path="/addsocietyfamily">
							<ContactForm2 />
						</Route>
						<Route path="/announcements">
							<Announcements />
						</Route>
						<Route path="/addannouncement">
							<AddAnnouncement />
						</Route>
					</Switch>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tokenID: state.auth.token != null,
		emailVerified: state.auth.emailVerified,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAutoAuth: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
