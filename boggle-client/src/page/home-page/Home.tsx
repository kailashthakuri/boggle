import React from "react";
import Card from "../../components/Card";
import {useHistory} from "react-router-dom";
import {GameMetric} from "../game-page/word-game/WordGameContants";

function Home() {
    const history = useHistory();
    const chooseGame = (gameMetric: GameMetric) => {
        history.push(`game/${gameMetric}`);
    };
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-3">
                    <Card
                        title="4 &#10060; 4"
                        btnLabel="Play Game"
                        value={GameMetric.FOUR_BY_FOUR}
                        desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                        handler={chooseGame}
                    ></Card>
                </div>
                <div className="col-md-3">
                    <Card
                        title="5 &#10060; 5"
                        btnLabel="Play Game"
                        value={GameMetric.FIVE_BY_FIVE}
                        desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                        handler={chooseGame}
                    ></Card>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;
