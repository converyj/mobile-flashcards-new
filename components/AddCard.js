import React, { Component, Fragment } from "react";
import { Text, KeyboardAvoidingView, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import TouchButton from "./TouchButton";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { handleAddCardToDeck } from "../actions";

/**
 * Form to add question and answer to deck 
 *  - set text of question and answer
 *  - add question to store and api
 */
class AddCard extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		handleAddDeckTitle: PropTypes.func
	};

	state = {
		question: "",
		answer: ""
	};

	handleQuestionText = (question) => {
		this.setState({
			question
		});
	};

	handleAnswerText = (answer) => {
		this.setState({
			answer
		});
	};

	// add question to deck
	addCard = () => {
		const { title } = this.props;

		this.props.handleAddCardToDeck(title, this.state);
		this.setState({ question: "", answer: "" });
		this.props.navigation.goBack();
	};

	render() {
		const { title } = this.props;

		return (
			<Fragment>
				<KeyboardAvoidingView style={styles.container}>
					<Text>Add a Question to the deck</Text>
					<TextInput
						style={styles.input}
						placeholder="Question"
						value={this.state.question}
						onChangeText={this.handleQuestionText}
					/>
					<TextInput
						style={styles.input}
						placeholder="Answer"
						value={this.state.answer}
						onChangeText={this.handleAnswerText}
					/>
					<TouchButton onPress={this.addCard}>Add Card</TouchButton>
				</KeyboardAvoidingView>
				{/* )} */}
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		padding: 16
	},

	input: {
		borderWidth: 1,
		borderColor: "gray",
		backgroundColor: "#fff",
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 5,
		fontSize: 20,
		height: 40,
		margin: 20
	}
});

// decks is not being used? - which is better to get title from navigation twice or put it in props?
function mapStateToProps(decks, { navigation }) {
	// const { title } = navigation.state.params;
	return {};
}
export default connect(mapStateToProps, { handleAddCardToDeck })(AddCard);
