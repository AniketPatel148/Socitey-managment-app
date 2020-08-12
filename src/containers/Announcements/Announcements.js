import React from "react";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Announcement from "../../Components/Announcement/Announcement";

import styles from "./Announcements.module.css";

class Announcements extends React.Component {
	componentDidMount() {
		this.props.onFetchAnnouncements(this.props.token);
	}

	render() {
		let announcements = this.props.announcements;
		return (
			<div>
				{announcements.map((announcement, index) => {
					return (
						<Announcement
							key={index}
							subject={announcement.subject}
							body={announcement.body}
						/>
					);
				})}

				{this.props.loading ? (
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

const mapStateToProps = (state) => {
	return {
		announcements: state.announcements.announcements,
		loading: state.announcements.loading,
		token: state.auth.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchAnnouncements: (token) =>
			dispatch(actions.fetchAnnouncements(token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);
