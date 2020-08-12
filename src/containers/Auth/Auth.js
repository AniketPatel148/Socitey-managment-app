import React from "react";
import Button from "../../Components/UI/Button/Button";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Input from "../../Components/UI/Input/Input";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

import styles from "./Auth.module.css";

class Auth extends React.Component {
	state = {
		authForm: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "E-mail",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			house: {
				elementType: "input",
				elementConfig: {
					type: "number",
					placeholder: "House number",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password",
				},
				value: "",
				validation: {
					required: true,
					minLength: 8,
				},
				valid: false,
				touched: false,
			},
		},
		isSignUp: true,
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	inputChangeHandler = (event, inputIdentifier) => {
		const updatedForm = {
			...this.state.authForm,
			[inputIdentifier]: {
				...this.state.authForm[inputIdentifier],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.authForm[inputIdentifier].validation
				),
				touched: true,
			},
		};

		this.setState({ authForm: updatedForm });
	};

	onSubmitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(
			this.state.authForm.email.value,
			this.state.authForm.password.value,
			this.state.isSignUp
		);
	};

	signUpChangeHandler = () => {
		const signUp = this.state.isSignUp;
		this.setState({ isSignUp: !signUp });
		console.log(this.state.isSignUp);
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.authForm) {
			formElementsArray.push({
				id: key,
				config: this.state.authForm[key],
			});
		}

		let authRedirect = null;
		if (this.props.isAuth) {
			authRedirect = <Redirect to="/" />;
			console.log(this.props.isAuth);
		}

		let form = (
			<form onSubmit={this.onSubmitHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangeHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="Success">Submit</Button>
			</form>
		);
		let errorMessage = null;

		if (this.props.error) {
			errorMessage = this.props.error.message;
		}
		if (this.props.loading) {
			form = <Spinner />;
		}

		return (
			<div className={styles.AuthData}>
				{authRedirect}
				{errorMessage}
				{form}
				<Button clicked={this.signUpChangeHandler} btnType="Danger">
					{this.state.isSignUp ? "Switch To Login" : "SignUp"}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state.auth);
	return {
		error: state.auth.error,
		loading: state.auth.loading,
		isAuth: state.auth.token != null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignUp) =>
			dispatch(actions.authenticate(email, password, isSignUp)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
