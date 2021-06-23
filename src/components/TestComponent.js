import React, { useContext } from 'react'
import { AppContext } from '../context/app/appContext'

export const TestComponent = () => {

    const { state, sendTest } = useContext(AppContext)

    function createQuestion({ questionText, answerOptions }, indexQuest) {
        const answersHtml = answerOptions
            .map((answer, indexAnsw) => {
                return (
                    <li key={indexAnsw}>
                        <input
                            className="form-check-input question__checkbox"
                            type="checkbox"
                            name="checkbox"
                            data-id={`${indexQuest + 1}:${indexAnsw + 1}`} />
                        {answer}
                    </li>
                )
            })

        return (
            <div key={indexQuest} className="question">
                <h4 className="question__title"> {questionText}</h4>
                <div className="question__answers">
                    <span className="question__number">{indexQuest + 1}</span>
                    <ul>
                        {answersHtml}
                    </ul>
                </div>
                <hr />
            </div>
        )
    }

    return (
        <form className="questions" onSubmit={sendTest}>
            {state.showTest && state.questionList.map(createQuestion)}
            {state.showTest
                && (
                    <div className="buttons">
                        <button
                            className="send__test-btn btn btn-primary"
                        >Отправить
                        </button>
                    </div>
                )
            }

        </form>
    )
}