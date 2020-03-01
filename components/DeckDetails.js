import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Deck from "./Deck";
import TouchButton from "./TouchButton";
import { darkGray, gray, red } from "./../utils/colors";
import { handleRemoveDeck } from "./../actions";

class DeckDetails extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
		deck: PropTypes.object,
		handleRemoveDeck: PropTypes.func
	};
	// show title of deck on the header of navigation
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params;

		return {
			title
		};
	};

	// after deleting deck, don't rerender component
	shouldComponentUpdate(nextProps) {
		return nextProps.deck !== undefined;
	}

	// delete deck
	handleRemoveDeck = (title) => {
		this.props.handleRemoveDeck(title);
		this.props.navigation.navigate("DeckList");
	};

	render() {
		const { deck, title, navigation, loadingBar } = this.props;
		return (
			<Fragment>
				{loadingBar.default === 1 ? (
					<ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
				) : (
					<View style={styles.container}>
						<Deck title={deck.title} questionCount={deck.questions.length} />
						<TouchButton
							btnStyle={{ backgroundColor: darkGray, borderColor: gray }}
							onPress={() => navigation.navigate("AddCard", { title })}>
							<Text txtStyle={{ color: gray }}>Add Card</Text>
						</TouchButton>
						<TouchButton onPress={() => navigation.navigate("Quiz", { title })}>
							<Text>Start Quiz</Text>
						</TouchButton>
						<TouchButton
							btnStyle={{ backgroundColor: red }}
							onPress={() => this.handleRemoveDeck(title, deck)}>
							<Text>Delete Deck</Text>
						</TouchButton>
					</View>
				)}
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

function mapStateToProps({ decks, loadingBar }, { navigation }) {
	const { title } = navigation.state.params;
	return {
		title,
		deck: decks[title],
		loadingBar
	};
}

export default connect(mapStateToProps, { handleRemoveDeck })(DeckDetails);
