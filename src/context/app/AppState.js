import React, { useReducer } from 'react'
import { initialState, systemMessages } from '../../constants'
import { parseId } from '../../utils'
import { ADD_QUESTION, START_TEST, СHANGE_DISABLE } from '../types'
import { AppContext } from './appContext'
import { appReducer } from './appReducer'

export const AppState = ({ children }) => {

    const [state, dispatch] = useReducer(appReducer, initialState)

    function questionToState(question) {
        dispatch({
            type: ADD_QUESTION,
            question,
        })
    }

    function startTest() {
        dispatch({
            type: START_TEST
        })
        dispatch({
            type: СHANGE_DISABLE
        })
    }

    function sendTest(event) {
        event.preventDefault()
        const $checkBoxis = event.target.checkbox
        let correctAnswCounter = 0
        let mistakes = ''
        let emptyAnswer = false

        const userAnswers = new Array(state.questionList.length)
            .fill('')
            .map(() => {
                return { answer: [] }
            })

        $checkBoxis.forEach($checkBox => {
            if ($checkBox.checked) {
                const { questionId, answerId } = parseId($checkBox)
                userAnswers[questionId - 1].answer.push(answerId)
            }
        })

        state.questionList.forEach((question, i) => {
            const answerIsCorrect = question.correctAnswer.sort().join('') === userAnswers[i].answer.join('')
            if (answerIsCorrect) {
                correctAnswCounter++
                return
            }
            userAnswers[i].answer.length
                ? mistakes += `\n${i + 1}. ${question.questionText}`
                : emptyAnswer = true
        })

        if (emptyAnswer) {
            alert(systemMessages.CC4)
            return
        }
    
        !mistakes
            ? alert(systemMessages.CC5(state.questionList.length))
            : alert(systemMessages.CC7(mistakes, correctAnswCounter, state.questionList.length))
    }

    return (
        <AppContext.Provider value={{
            questionToState,
            startTest,
            sendTest,
            state
        }}>
            {children}
        </AppContext.Provider>
    )
}