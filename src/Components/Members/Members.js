import React from "react";
import Member from "./Member/Member";
import axios from "../../axios-instance";

class Members extends React.Component {
	state = {
		members: null,
	};

	componentWillMount() {
		axios
			.get("/House.json")
			.then((response) => console.log(response.data))
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div>
				<Member name="Aniket" house="39" contact="123456" />
				<Member name="Aniket" house="39" contact="123456" />
				<Member name="Aniket" house="39" contact="123456" />
				<Member name="Aniket" house="39" contact="123456" />
			</div>
		);
	}
}

export default Members;
