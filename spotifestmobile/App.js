import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStackNavigator } from "react-navigation";

import store from "./App/store.js";
import Main from "./App/Components/Main";
import Login from "./App/Components/Login";

class App extends Component {
    render() {
        const MainNavigator = createStackNavigator({
            Home: { screen: Main },
            Login: { screen: Login }
        });
        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});

export default App;
