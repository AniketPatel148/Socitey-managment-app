import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./Member.module.css";

const Member = (props) => {
	return (
		<div className={styles.container}>
			<div className={styles.icon}>
				<FontAwesomeIcon icon={faUser} size="2x" />
			</div>
			<div className={styles.info}>
				<p>Owner: {props.name}</p>
				<p>House: {props.house}</p>
				<p>Contact: {props.contact}</p>
			</div>
		</div>
	);
};

export default Member;
