import React from "react";
import {Route, Switch} from "react-router-dom";
import About from "../page/about-page/About";
import Home from "../page/home-page/Home";
import WordGame from "../page/game-page/word-game/WordGame";

function Container() {
    return (
        <div className="container-fluid pt-4">
            <Switch>
                <Route path="/about" component={About}></Route>
                <Route path="/" exact component={Home}></Route>
                <Route path={`/game/:metricId`} component={WordGame}></Route>
            </Switch>
        </div>
    );
}

export default Container;
