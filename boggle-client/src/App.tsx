import React from "react";
import "./App.css";
import {Router} from "react-router-dom";
import Container from "./layout/Container";
import NavBar from "./layout/NavBar";
import History from "./utils/History";
import {Provider} from "react-redux";
import createAppStore from "./store/AppStore";

function App() {
    const store = createAppStore();
    return (
        <div className="App">
            <Provider store={store}>
                <Router history={History}>
                    <NavBar></NavBar>
                    <Container></Container>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
