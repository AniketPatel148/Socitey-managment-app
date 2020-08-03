import React from "react";
import axios from "../../../axios-instance";
// import { Link } from "react-router-dom";

import styles from "./FullMember.module.css";

class FullMember extends React.Component {
	state = {
		data: [],
	};

	componentDidMount() {
		axios.get("/House.json").then((response) => {
			let data = [];
			for (let i in response.data) {
				if (i === this.props.match.params.house) {
					let k = response.data[i];
					for (let j in k) data.push(k[j]);
				}
			}
			this.setState((prevState) => (prevState.data = data));
		});
	}

	render() {
		let memberFinal = (
			<div>
				{this.state.data.map((member) => {
					console.log(member);
					return (
						<div>
							<span>Name: </span>
							<span>{member.Name}</span>
							<span>Phone no.: </span>
							<span>{member.ContactNumber}</span>
						</div>
					);
				})}
			</div>
		);
		return (
			<div className={styles.container}>
				<div className={styles.mainInfo}>
					<p>
						{" "}
						Head Member: <span>{this.state.data.name}</span>
					</p>
					<p>
						{" "}
						Contact number: <span>{this.state.data.contactNumber}</span>
					</p>
					<p>
						{" "}
						House number: <span>{this.state.data.houseNumber}</span>
					</p>
				</div>
				{memberFinal}
			</div>
		);
	}
}

export default FullMember;
