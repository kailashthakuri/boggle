import React, {RefObject} from "react";
import {match} from "react-router-dom";
import {IWordGameDesc, ValidPointModel, WORD_GAME_DESC, WordModel, WordPointModel} from "./WordGameContants";
import {WordGameUtils} from "./WordGameUtils";
import Board from "./Board";
import History from "../../../utils/History";
import ScoreTable from "./ScoreTable";
import {WordGameActionFactory} from "./store/WordGameAction";
import {AppState} from "../../../store/AppReducer";
import {selectWordGameState} from "./store/WordGameSelector";
import {tryValidateWordEffect} from "./store/WordGameEffect";
import {connect} from "react-redux";
import {Status} from "../../../utils/AppData";
import Card from "../../../components/Card";
import FinalScoreTable from "./FinalScoreTable";
import StatusWrapper from "../../../components/StatusWrapper";

interface IWordGameProps {
    match: match<{ metricId: string }>;
    wordPointModels: Array<WordPointModel>;
    validPointModel: ValidPointModel;
    status: Status;
    setWordPointModels: typeof WordGameActionFactory.setValidWords;
    tryValidateWord: typeof WordGameActionFactory.tryValidateWord;
    resetState: typeof WordGameActionFactory.resetState;
}

interface IWordGameState {
    wordModels: Array<Array<WordModel>>;
    word: string;
    timeout: boolean;
    timer: string;
    gameMetric?: IWordGameDesc;
    errorMsg?: string;
    successMsg?: string;
}

class WordGame extends React.Component<IWordGameProps, IWordGameState> {
    inputRef: RefObject<HTMLInputElement>;
    interval: any;

    constructor(props: IWordGameProps) {
        const wordGameDesc = WORD_GAME_DESC.find(desc => desc.path === props.match.params.metricId);
        if (!wordGameDesc) {
            History.push("/");
        }
        super(props);
        this.state = {
            wordModels: WordGameUtils.prepareWords(wordGameDesc?.row, wordGameDesc?.col),
            word: "",
            gameMetric: wordGameDesc,
            timeout: false,
            timer: "00 : 00",
        };
        this.inputRef = React.createRef<HTMLInputElement>();
        this.setTimer();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.playAgainHandler = this.playAgainHandler.bind(this);
        this.handleWordChange = this.handleWordChange.bind(this);
    }

    setTimer() {
        const endDate = new Date();
        // endDate.setMinutes(endDate.getMinutes() + 2);
        endDate.setSeconds(endDate.getSeconds() + 160);
        this.interval = setInterval(() => {
            const remainingSeconds = (+endDate - +new Date()) / 1000;
            if (remainingSeconds >= 0) {
                this.setState({
                    timer: this.formatTime(
                        Math.floor(remainingSeconds / 60),
                        Math.ceil(remainingSeconds % 60)
                    )
                });
            } else {
                this.setState({timer: "00 :  00", timeout: true});
                clearInterval(this.interval);
            }
        }, 1000);
    }

    playAgainHandler() {
        this.props.resetState();
        this.setState({
            wordModels: WordGameUtils.prepareWords(this.state.gameMetric?.row, this.state.gameMetric?.col),
            word: "",
            timeout: false,
            timer: "00 : 00",
            errorMsg: ""
        });
        this.setTimer();
    }

    componentDidMount(): void {
        this.inputRef.current && this.inputRef.current.focus();
    }

    componentWillUnmount(): void {
        this.props.resetState();
        clearInterval(this.interval);
    }

    formatTime(minute: number, seconds: number) {
        return `${minute > 9 ? minute : "0" + minute} : ${
            seconds > 9 ? seconds : "0" + seconds
        }`;
    }

    componentWillReceiveProps(nextProps: IWordGameProps) {
        if (nextProps.validPointModel && (this.props.validPointModel !== nextProps.validPointModel)) {
            const current = nextProps.validPointModel;
            if (current.point > 0) {
                this.props.setWordPointModels({word: this.state.word, point: current.point});
                this.setState({word: "", successMsg: WordGameUtils.getSuccessMsg(current.point)});
            } else {
                this.setState({errorMsg: "Invalid Word."});
            }
            this.clearMessage();
        }
    }

    handleSubmit(event: any) {
        // if (this.state.word.length < 3) {
        //     this.setState({errorMsg: "Word length must be greater than 2."});
        // } else if (this.props.wordPointModels.findIndex(wordPoint => wordPoint.word == this.state.word.toUpperCase()) > -1) {
        //     this.setState({errorMsg: "Word already exist."});
        // } else if (!WordGameUtils.verifyWordSequence(this.state.wordModels, this.state.word)) {
        //     this.setState({errorMsg: "Invalid Word."});
        // } else {
        //     this.props.tryValidateWord(this.state.word);
        // }
        this.props.tryValidateWord(this.state.word);
        this.clearMessage();
        event.preventDefault();
    }

    clearMessage() {
        setTimeout(() => {
            this.setState({errorMsg: "", successMsg: ""});
        }, 1000);
    }

    handleWordChange(event: any) {
        this.setState({word: event.target.value});
    }

    render() {
        return (
            <div>
                <div id="boggle-container">
                    <div className="row justify-content-center p-4">
                        {!this.state.timeout ? (
                            <React.Fragment>
                                <div
                                    className={this.state.gameMetric ? this.state.gameMetric.classValue : 'col-lg-6 col-md-7'}>
                                    <Board wordModels={this.state.wordModels}></Board>
                                    <div id="word-submit">
                                        <form className="form-group row" onSubmit={this.handleSubmit}>
                                            <div className="mx-sm-3 mb-2">
                                                <input
                                                    ref={this.inputRef}
                                                    type="text"
                                                    value={this.state.word}
                                                    onChange={this.handleWordChange}
                                                    className={"form-control " + (this.state.errorMsg && "error-input") + (this.state.successMsg && "success-input")}
                                                    placeholder="Type Word"/>
                                                {this.state.errorMsg && (
                                                    <div className="error">{this.state.errorMsg}</div>)}
                                                {this.state.successMsg && (
                                                    <div className="success">{this.state.successMsg}</div>)}
                                            </div>
                                            <StatusWrapper status={this.props.status}>
                                                <button type="submit" className="btn btn-primary mb-5">
                                                    Submit
                                                </button>
                                            </StatusWrapper>
                                        </form>
                                    </div>
                                </div>
                            </React.Fragment>
                        ) : (
                            <div className="col-lg-6 col-md-7">
                                <Card title="Final Result" btnLabel="Play Again" handler={this.playAgainHandler}>
                                    <FinalScoreTable wordPointModels={this.props.wordPointModels}/>
                                </Card>
                            </div>
                        )}
                        <div className="col-lg-4 col-md-4">
                            <div className="col-lg-12 col-md-12">
                                <div><strong>Timer : {this.state.timer}</strong></div>
                                <ScoreTable wordPointModels={this.props.wordPointModels}></ScoreTable>
                            </div>
                            <div className="col-lg-12 col-md-12"><Card title="Rules"></Card></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state: AppState) => {
    return {
        wordPointModels: selectWordGameState(state).validWordPoints,
        validPointModel: selectWordGameState(state).validPointModel,
        status: selectWordGameState(state).status
    };
};

export const mapDispatchToProps = (dispatch: any) => {
    return {
        setWordPointModels: (payload: any) =>
            dispatch(WordGameActionFactory.setValidWords(payload)),
        tryValidateWord: (payload: string) =>
            dispatch(tryValidateWordEffect(payload)),
        resetState: () => dispatch(WordGameActionFactory.resetState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordGame);
