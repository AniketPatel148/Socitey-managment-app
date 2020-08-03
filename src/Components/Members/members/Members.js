import React from "react";
import Member from "../Member/Member";
import axios from "../../../axios-instance";
import { Link } from "react-router-dom";
// import Button from "../../UI/Button/Button";

import classes from "./Members.module.css";

class Members extends React.Component {
	state = {
		members: [],
	};

	componentDidMount() {
		axios
			.get("/House.json")
			.then((response) => {
				console.log(response.data);
				const members = [];
				for (let i in response.data) {
					members.push(i);
				}
				this.setState((prevState) => (prevState.members = members));
			})
			.catch((err) => console.log(err));
	}

	render() {
		console.log(this.state.members[0]);
		return (
			<div className={classes.main}>
				{this.state.members.map((member) => {
					return (
						<Link to={"/sahdev/" + member} key={member}>
							<Member house={member} />
						</Link>
					);
				})}

				<div>
					<Link to="/addsocietymember" exact>
						<button className={classes.link}>Add Society Members</button>
					</Link>
					<Link to="/addsocietyfamily" exact>
						<button className={classes.link}>Add Family</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default Members;
