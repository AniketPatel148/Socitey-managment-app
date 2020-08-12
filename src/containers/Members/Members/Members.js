import React from "react";
import Member from "../../../Components/Member/Member";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import * as actions from "../../../store/actions/index";
// import Button from "../../UI/Button/Button";

import classes from "./Members.module.css";

class Members extends React.Component {
	componentDidMount() {
		this.props.onFetchMembers(this.props.token);
	}
	render() {
		let members = <Spinner />;
		if (!this.props.loading)
			members = this.props.members.map((member) => {
				return (
					<Link to={"/sahdev/" + member.House} key={member.House}>
						<Member
							house={member.House}
							name={member.Name}
							contact={member.ContactNumber}
						/>
					</Link>
				);
			});
		return (
			<div className={classes.main}>
				{members}
				<div>
					<Link to="/addsocietymember" exact>
						<button className={classes.link}>Add Family Members</button>
					</Link>
					<Link to="/addsocietyfamily" exact>
						<button className={classes.link}>Add Society Family</button>
					</Link>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchMembers: (token) => dispatch(actions.fetchMembers(token)),
	};
};

const mapStateToProps = (state) => {
	return {
		members: state.members.members,
		loading: state.members.loading,
		token: state.auth.token,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
