import { ADD_QUESTION, START_TEST, СHANGE_DISABLE } from '../types';

export const appReducer = (state, action) => {

    switch (action.type) {
        case ADD_QUESTION:
            return { ...state, questionList: [...state.questionList, action.question] }
        case START_TEST:
            return { ...state, showTest: !action.showTest}
        case СHANGE_DISABLE:
            return {...state, disableButtons: true}
        default:
            return {...state}
    }
}