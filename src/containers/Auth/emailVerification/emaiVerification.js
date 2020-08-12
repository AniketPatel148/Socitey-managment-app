import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";

class emailVerfication extends React.Component {
	componentDidMount() {
		this.props.onEmailVerified();
	}

	sendVerificationEmail(e) {
		e.preventDefault();
		this.props.onSendEmail(this.props.token);
	}
	render() {
		let redirect = null;
		if (this.props.emailVerified) {
			redirect = <Redirect to="/" />;
		}
		console.log("exe");
		return (
			<div>
				{redirect}
				<h1>Email Verification page</h1>
				<button onClick={(e) => this.sendVerificationEmail(e)}>
					Send Verification Email
				</button>
			</div>
		);
	}
}

const mapStateToPtops = (state) => {
	console.log(state.auth);
	return {
		token: state.auth.token,
		emailVerified: state.auth.emailVerified,
	};
};

const mapDispatchToPtops = (dispatch) => {
	return {
		onSendEmail: (token) => dispatch(actions.emailVerificartionSend(token)),
		onEmailVerified: () => dispatch(actions.emailVerified()),
	};
};

export default connect(mapStateToPtops, mapDispatchToPtops)(emailVerfication);
