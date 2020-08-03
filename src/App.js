import React from "react";
import TopContainer from "./Components/TopContaineer/TopContainer";
import Members from "./Components/Members/members/Members";
import { Link, Route, Switch } from "react-router-dom";
import FullMember from "./Components/Members/FullMember/FullMember";
import ContactForm from "./containers/ContactData/ContactData";
import ContactForm2 from "./containers/ContactData/ContactData2/ContactData2";

import "./App.css";

class App extends React.Component {
	render() {
		return (
			<div>
				<TopContainer />
				<Route path="/" exact>
					<div className="dashboardCardDeck">
						<Link to="/members">
							<div className="dashboardCard no1">Members</div>
						</Link>
						<Link to>
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
				</Switch>
			</div>
		);
	}
}

export default App;
