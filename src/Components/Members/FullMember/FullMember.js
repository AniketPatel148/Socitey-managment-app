import React from "react";
import axios from "../../../axios-instance";
// import { Link } from "react-router-dom";

import styles from "./FullMember.module.css";

class FullMember extends React.Component {
	state = {
		data: {},
	};

	componentDidMount() {
		axios.get("/.json").then((response) => {
			for (let i in response.data) {
				if (
					response.data[i].orderData.houseNumber ===
					this.props.match.params.house
				) {
					this.setState(
						(prevState) => (prevState.data = response.data[i].orderData)
					);
				}
			}
		});
	}

	render() {
		// let membersObject = this.state.data.Members;

		// let memberFinal;

		// if (membersObject) {
		// 	var membersArray = Object.keys(membersObject).map(function (key) {
		// 		Using Number() to convert key to number type
		// 		Using obj[key] to retrieve key value
		// 		return [membersObject[key], String(key)];
		// 	});

		// 	memberFinal = (
		// 		<div className={styles.membersContainer}>
		// 			{membersArray.map((arr) => (
		// 				<div className={styles.member}>
		// 					<span>{arr[1]}: </span>
		// 					<span>{arr[0]}</span>
		// 				</div>
		// 			))}
		// 		</div>
		// 	);
		// }
		// console.log(this.state.data, this.props);
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
			</div>
		);
	}
}

export default FullMember;
