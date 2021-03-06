import React from "react";
import { View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { setLocalNotification } from "./utils/notifications";
import Constants from "expo-constants";
import { purple } from "./utils/colors";
import { Stack } from "./components/navigation";

function FlashStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	);
}

export default class App extends React.Component {
	componentDidMount() {
		// set notification if user hasn't studied that day
		setLocalNotification();
	}

	render() {
		return (
			<Provider store={createStore(reducer, middleware)}>
				<View style={{ flex: 1 }}>
					<FlashStatusBar backgroundColor={purple} barStyle="light-content" />
					<Stack />
				</View>
			</Provider>
		);
	}
}
