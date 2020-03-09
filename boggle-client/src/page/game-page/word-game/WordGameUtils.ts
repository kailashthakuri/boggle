import * as _ from "lodash";
import {WordModel} from "./WordGameContants";

export class WordGameUtils {
    public static CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static prepareWords(rowCount = 0, colCount = 0) {
        const wordList: Array<Array<WordModel>> = [];
        var charactersLength = WordGameUtils.CHARACTERS.length;
        _.range(rowCount).forEach(row => {
            const words: Array<WordModel> = [];
            _.range(colCount).forEach(col => {
                let char = WordGameUtils.CHARACTERS.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
                words.push({column: col, row, char});
            });
            wordList.push(words);
        });
        return wordList;
    }

    public static getSuccessMsg(point: number): string {
        switch (true) {
            case (point < 4):
                return `You got ${point} point !`;
            case (point < 6):
                return `congrats ! You got ${point} point.`;
            case (point < 8):
                return `You are excellent! You got ${point} point.`;
            default:
                return `Oh! You are genius. You got ${point} point.`;
        }
    }


    public static verifyWordSequence(wordModels: Array<Array<WordModel>>, characters: string) {
        let validWordModelsSequence: Array<Array<WordModel>> = [];
        const charArray = characters.split("");
        let isValid = false;
        for (let i = 0, length = charArray.length; i < length; i++) {
            const currentWorkModels = _.filter(_.flatten(wordModels),
                (word: WordModel) => word.char === _.toUpper(charArray[i]));
            if (_.isEmpty(currentWorkModels)) {
                break;
            }
            if (i == 0) {
                validWordModelsSequence = _.chunk(currentWorkModels, 1);
                continue;
            }
            validWordModelsSequence = WordGameUtils.getNewValidWordModelsSequence(validWordModelsSequence, currentWorkModels);
        }
        if (!_.isEmpty(validWordModelsSequence)) {
            isValid = true;
        }
        return isValid;
    }

    public static getNewValidWordModelsSequence(oldValidWordModelsSequence: Array<Array<WordModel>>, wordModels: WordModel[]): Array<Array<WordModel>> {
        const charSequenceWordModels: Array<Array<WordModel>> = [];
        oldValidWordModelsSequence.forEach(charSequencWordModel => {
            (wordModels || []).forEach(wordModel => {
                if (WordGameUtils.hasNeighbourRelation(_.last(charSequencWordModel), wordModel)) {
                    charSequenceWordModels.push(_.union(charSequencWordModel, [wordModel]));
                }
            });
        });
        return charSequenceWordModels;
    }

    public static hasNeighbourRelation(word1: WordModel | undefined, word2: WordModel) {
        if (!word1) {
            return false;
        }
        const colDiff = Math.abs(word1.column - word2.column);
        const rowDiff = Math.abs(word1.row - word2.row);
        if ((rowDiff === 1 && colDiff === 1) || (colDiff === 0 && rowDiff === 1) || (colDiff === 1 && rowDiff === 0)) {
            return true;
        }
        return false;
    }


}
