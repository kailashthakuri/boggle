import React, {RefObject} from "react";
import {match} from "react-router-dom";
import {IWordGameDesc, WORD_GAME_DESC, WordModel, WordPointModel} from "./WordGameContants";
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
import * as _ from 'lodash';
import BarChart, {BarChartModel} from "../../../components/charts/BarChart";

interface IWordGameProps {
    match: match<{ metricId: string }>;
    validWordPointModels: Array<WordPointModel>;
    wordPointModel: WordPointModel;
    status: Status;
    setValidWordPoint: typeof WordGameActionFactory.setValidWordPoint;
    setWordPoint: typeof WordGameActionFactory.setWordPoint;
    tryValidateWord: typeof tryValidateWordEffect
    resetState: typeof WordGameActionFactory.resetState;
}

interface IWordGameState {
    wordModels: Array<Array<WordModel>>;
    word: string;
    timeout: boolean;
    timer: string;
    barChartData?: Array<BarChartModel>;
    gameMetric?: IWordGameDesc;
    errorMsg?: string;
    successMsg?: string;
}

export class WordGame extends React.Component<IWordGameProps, IWordGameState> {
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
        endDate.setMinutes(endDate.getMinutes() + 2);
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
                this.setState({barChartData: (this.getBarChartModels() || [])})
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
        return `${minute > 9 ? minute : "0" + minute} : ${seconds > 9 ? seconds : "0" + seconds}`;
    }

    componentDidUpdate() {
        const wordPointModel = this.props.wordPointModel;
        if (wordPointModel) {
            if (wordPointModel.valid) {
                this.props.setValidWordPoint(wordPointModel);
                this.setState({word: "", successMsg: WordGameUtils.getSuccessMsg(wordPointModel.point)});
            } else {
                this.setState({word: "", errorMsg: 'Invalid Word.'});
            }
            this.props.setWordPoint(null);
        }
    }


    getBarChartModels() {
        const test: WordPointModel[] = [
            {word: 'Nepal', point: 1, valid: true},
            {word: 'Nepal', point: 1, valid: true},
            {word: 'Nepal', point: 1, valid: true},
            {word: 'Indiae', point: 1, valid: true},
            {word: 'Indiae', point: 1, valid: true},
            {word: 'aa', point: 1, valid: true}
        ]

        const barChartModels: BarChartModel[] = [];
        const charLengths = test.map(model => model.word.length);
        (_.uniq(charLengths).sort() || []).forEach(count => {
            const occurence = this.getLengthOccurrence(charLengths, count);
            barChartModels.push({name: `${count} letter`, value: occurence});
        })
        console.log(barChartModels);
        return barChartModels;
    }

    getLengthOccurrence(array: number[], value: number) {
        return array.filter((v) => (v === value)).length;
    }

    // static getDerivedStateFromProps(props: IWordGameProps, state: IWordGameState) {
    //     const wordPointModel = props.wordPointModel;
    //     if (wordPointModel) {
    //         if (wordPointModel.valid) {
    //             props.setValidWordPoint(wordPointModel);
    //             state.successMsg=WordGameUtils.getSuccessMsg(wordPointModel.point);
    //         } else {
    //             state.errorMsg='Invalid Word.';
    //         }
    //         state.word = "";
    //         props.setWordPoint(null);
    //     }
    //     return state;
    // }

    handleSubmit(event: any) {
        if (this.state.word.length < 3) {
            this.setState({errorMsg: "Word length must be greater than 2."});
        } else if (this.props.validWordPointModels.findIndex(wordPoint => _.toUpper(wordPoint.word) === _.toUpper(this.state.word)) > -1) {
            this.setState({errorMsg: "Word already exist."});
        } else if (!WordGameUtils.verifyWordSequence(this.state.wordModels, this.state.word)) {
            this.setState({errorMsg: "Invalid Word."});
        } else {
            this.props.tryValidateWord(this.state.word);
        }
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
                    <div>
                        {!this.state.timeout ? (
                            <div className="row justify-content-center p-4">
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
                                <div className="col-lg-4 col-md-4">
                                    <div className="col-lg-12 col-md-12">
                                        <div><strong>Timer : {this.state.timer}</strong></div>
                                        <ScoreTable wordPointModels={this.props.validWordPointModels}></ScoreTable>
                                    </div>
                                    <div className="col-lg-12 col-md-12"><Card title="Rules"></Card></div>
                                </div>
                            </div>
                        ) : (
                            <div className="row justify-content-center p-4">
                                <div className="col-md-4">
                                    <Card title="Final Result" btnLabel="Play Again"
                                          handler={this.playAgainHandler}>
                                        <FinalScoreTable wordPointModels={this.props.validWordPointModels}/>
                                    </Card>
                                </div>
                                <div className="col-md-8 stat-chart">
                                    <Card title="Score Statistics">
                                        <BarChart data={this.state.barChartData || []}
                                                  ticks={this.state.barChartData?.length}
                                                  xAxisLabel="No. of letters per word"
                                                  yAxisLabel="No. of counts"
                                                  svgHeight={200} innerPadding={6}/>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state: AppState) => {
    return {
        validWordPointModels: selectWordGameState(state).validWordPointModels,
        wordPointModel: selectWordGameState(state).wordPointModel,
        status: selectWordGameState(state).status
    };
};

export const mapDispatchToProps = (dispatch: any) => {
    return {
        setWordPoint: (payload: WordPointModel) => dispatch(WordGameActionFactory.setWordPoint(payload)),
        setValidWordPoint: (payload: WordPointModel) => dispatch(WordGameActionFactory.setValidWordPoint(payload)),
        tryValidateWord: (payload: string) => dispatch(tryValidateWordEffect(payload)),
        resetState: () => dispatch(WordGameActionFactory.resetState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordGame);
