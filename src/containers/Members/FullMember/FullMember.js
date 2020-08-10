import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import styles from "./FullMember.module.css";

class FullMember extends React.Component {
	componentDidMount() {
		this.props.onFetchFullMember(this.props.match.params.house);
	}

	render() {
		let memberFinal = (
			<div>
				{this.props.fullMember.map((member) => {
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
				{this.props.loading ? <Spinner /> : memberFinal}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		fullMember: state.fullmember.fullmember,
		loading: state.fullmember.loading,
		error: state.fullmember.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchFullMember: (houseId) => dispatch(actions.fetchFullMemmber(houseId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FullMember);
