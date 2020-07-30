import React from "react";
import TopContainer from "./Components/TopContaineer/TopContainer";
import Members from "./Components/Members/Members";

import "./App.css";

class App extends React.Component {
	render() {
		return (
			<div>
				<TopContainer />
				<div className="dashboardCardDeck">
					<div className="dashboardCard">Members</div>
					<div className="dashboardCard">Anouncments</div>
					<div className="dashboardCard">Complaints</div>
					<div className="dashboardCard">Events</div>
				</div>
				<Members />
			</div>
		);
	}
}

export default App;
