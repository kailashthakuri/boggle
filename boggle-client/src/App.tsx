import React from "react";
import "./App.css";
import {Router} from "react-router-dom";
import Container from "./layout/Container";
import NavBar from "./layout/NavBar";
import History from "./utils/History";
import {Provider} from "react-redux";
import createAppStore from "./store/AppStore";


// https://www.codementor.io/@oyebanjijacob/creating-a-boggle-game-using-react-part-1-bd37sulcs
//https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/README.md

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
