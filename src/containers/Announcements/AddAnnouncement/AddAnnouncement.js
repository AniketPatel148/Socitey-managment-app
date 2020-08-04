import React from "react";

import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";
import axios from "../../../axios-instance";
import { withRouter } from "react-router-dom";

import classes from "./AddAnnouncement.module.css";

class AddAnnouncement extends React.Component {
	state = {
		data: {
			subject: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Subject of announcement",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			body: {
				elementType: "textarea",
				elementConfig: {
					type: "text",
					placeholder: "Announcemment",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
		},
		formIsValid: false,
		loading: false,
		timeDate: null,
	};

	addHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let formDataIdentifier in this.state.data) {
			formData[formDataIdentifier] = this.state.data[formDataIdentifier].value;
		}
		const Data = {
			...formData,
		};
		console.log(Data);
		axios
			.post("/announcement.json", Data)
			.then((response) => {
				this.setState({ loading: false, data: {} });
				this.props.history.push("/announcements");
				console.log(response);
			})
			.catch((error) => {
				this.setState({ loading: false });
				console.log(error);
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
		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedAddForm = {
			...this.state.data,
		};
		const updatedFormElement = {
			...updatedAddForm[inputIdentifier],
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedAddForm[inputIdentifier] = updatedFormElement;
		let formIsValid = true;
		for (let inputIdentifier in updatedAddForm) {
			formIsValid = updatedAddForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({ data: updatedAddForm, formIsValid: formIsValid });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.data) {
			formElementsArray.push({
				id: key,
				config: this.state.data[key],
			});
		}
		let form = (
			<form onSubmit={this.addHandler}>
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
					Announce
				</button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Add Announcement</h4>
				{form}
			</div>
		);
	}
}

export default withRouter(AddAnnouncement);
