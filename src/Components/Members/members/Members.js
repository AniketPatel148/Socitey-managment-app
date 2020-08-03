import React from "react";
import Member from "../Member/Member";
import axios from "../../../axios-instance";
import { Link } from "react-router-dom";
import Spinner from "../../UI/Spinner/Spinner";
// import Button from "../../UI/Button/Button";

import classes from "./Members.module.css";

class Members extends React.Component {
	state = {
		members: [],
		loading: true,
	};

	componentDidMount() {
		axios
			.get("/heads.json")
			.then((response) => {
				console.log(response.data);
				const members = [];
				for (let i in response.data) {
					let k = response.data[i];
					for (let j in k) members.push(k[j]);
				}
				console.log(members);
				this.setState({ members: members, loading: false });
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div className={classes.main}>
				{this.state.loading ? (
					<Spinner />
				) : (
					this.state.members.map((member) => {
						return (
							<Link to={"/sahdev/" + member.House} key={member.House}>
								<Member
									house={member.House}
									name={member.Name}
									contact={member.ContactNumber}
								/>
							</Link>
						);
					})
				)}

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
