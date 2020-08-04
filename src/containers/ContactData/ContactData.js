import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Spinner from "../../Components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../axios-instance";
import Input from "../../Components/UI/Input/Input";

class ContactData extends Component {
	state = {
		addMember: false,
		orderForm: {
			Name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			House: {
				elementType: "input",
				elementConfig: {
					type: "number",
					placeholder: "Your house number",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			ContactNumber: {
				elementType: "input",
				elementConfig: {
					type: "number",
					placeholder: "Your phone number",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},

			EmailID: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your E-Mail",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
		},
		formIsValid: false,
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let formDataIdentifier in this.state.orderForm) {
			formData[formDataIdentifier] = this.state.orderForm[
				formDataIdentifier
			].value;
		}
		const Data = {
			...formData,
		};
		axios
			.post("/House/" + this.state.orderForm.House.value + ".json", Data)
			.then((response) => {
				this.setState({ loading: false, orderForm: {} });
				this.props.history.push("/members");
			})
			.catch((error) => {
				this.setState({ loading: false });
			});
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

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier],
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						label={formElement.id}
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<button className={classes.button} disabled={!this.state.formIsValid}>
					Add
				</button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default withRouter(ContactData);
