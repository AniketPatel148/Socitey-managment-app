import React from "react";
import axios from "../../../axios-instance";
// import { Link } from "react-router-dom";
import Spinner from "../../UI/Spinner/Spinner";
import styles from "./FullMember.module.css";

class FullMember extends React.Component {
	state = {
		data: [],
		loading: true,
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
			this.setState({ loading: false });
		});
	}

	render() {
		let memberFinal = (
			<div>
				{this.state.data.map((member) => {
					return (
						<div className={styles.member}>
							<p>{member.Name}</p>
							<p>{member.ContactNumber}</p>
							<p>{member.EmailID}</p>
						</div>
					);
				})}
			</div>
		);
		return (
			<div className={styles.container}>
				{this.state.loading ? <Spinner /> : memberFinal}
			</div>
		);
	}
}

export default FullMember;
