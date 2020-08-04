import React from "react";
import styles from "./Announcement.module.css";

const Announcemet = (props) => {
	let year = new Date().getFullYear();
	let month = new Date().getMonth();
	let date = new Date().getDate();
	let hour = new Date().getHours();
	let minutes = new Date().getMinutes();

	return (
		<div className={styles.container}>
			<div className={styles.subject}>{props.subject}</div>
			<div className={styles.body}>{props.body}</div>
			<div className={styles.date}>
				{" "}
				{date}/{month}/{year} {hour}:{minutes}{" "}
			</div>
		</div>
	);
};

export default Announcemet;
