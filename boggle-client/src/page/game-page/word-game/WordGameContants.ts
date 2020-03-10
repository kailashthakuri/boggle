export enum GameMetric {
    FOUR_BY_FOUR = "4by4",
    FIVE_BY_FIVE = "5by5",
    SIX_BY_SIX = "6by6"
}

export interface WordModel {
    row: number;
    column: number;
    char: string;
}

export interface WordPointModel {
    word: string;
    point: number;
    valid?: boolean;
}

export interface IWordGameDesc {
    path: string,
    row: number,
    col: number,
    classValue: string
}

export const WORD_GAME_DESC = [
    {path: GameMetric.FOUR_BY_FOUR, row: 4, col: 4, classValue: 'col-lg-6 col-md-7'},
    {path: GameMetric.FIVE_BY_FIVE, row: 5, col: 5, classValue: 'col-lg-7 col-md-8'},
    {path: GameMetric.SIX_BY_SIX, row: 6, col: 6, classValue: 'col-lg-8 col-md-9'}
];
