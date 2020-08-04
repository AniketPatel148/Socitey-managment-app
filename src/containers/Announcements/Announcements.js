import React from "react";
import { Link } from "react-router-dom";
import axios from "../../axios-instance";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Announcement from "../../Components/Announcement/Announcement";

import styles from "./Announcements.module.css";

class Announcements extends React.Component {
	state = {
		announcements: [],
		loading: true,
	};

	componentDidMount() {
		axios
			.get("/announcement.json")
			.then((response) => {
				let announcement = [];
				for (let i in response.data) {
					announcement.push(response.data[i]);
				}
				this.setState({ loading: false, announcements: announcement });
			})
			.catch((err) => {
				console.log(err);
				this.setState({ loading: false });
			});
	}

	render() {
		let announcements = this.state.announcements;
		console.log(announcements);
		return (
			<div>
				{announcements.map((announcement, index) => {
					console.log(announcement);
					return (
						<Announcement
							key={index}
							subject={announcement.subject}
							body={announcement.body}
						/>
					);
				})}

				{this.state.loading ? (
					<Spinner />
				) : (
					<div className={styles.buttonContainer}>
						<button className={styles.button}>
							<Link to="/addannouncement">Add Announcement</Link>
						</button>
					</div>
				)}
			</div>
		);
	}
}

export default Announcements;
