import React, { useContext } from 'react'
import { systemMessages } from '../constants'
import { AppContext } from '../context/app/appContext'
import { isValid } from '../utils'

export const Buttons = () => {

  const { questionToState, startTest, state } = useContext(AppContext)

  function addQuestion() {
    const questionText = prompt('Введите текст вопроса', '')

    if (!questionText) {
      alert(systemMessages.CC1)
      return
    }
    const answerOptions = []

    for (let i = 0; i < 4; i++) {
      const answer = prompt(`Введите текст ${i + 1} варианта ответа`)
      if (!answer) {
        alert(systemMessages.CC2(i + 1))
        return
      }
      answerOptions.push(answer)
    }

    let correctAnswer = prompt('Введите номера правильных ответов через запятую. Нумерация начинается с 1')

    if (!correctAnswer) {
      alert(systemMessages.CC3)
      return
    }
    if (!isValid(correctAnswer)) {
      alert(systemMessages.CC6)
      return
    }

    // Converting the correct answers to an array of numbers, 
    // for further sorting and comparison with the user's answers.
    correctAnswer = correctAnswer.split(',').map(el => +el)

    questionToState({ questionText, answerOptions, correctAnswer })
  }

  return (
    <div className="buttons">
      <button
        className="add__question-btn btn btn-primary"
        onClick={addQuestion}
        disabled={state.disableButtons}
      >Добавить вопрос
      </button>
      <button
        className="start__test-btn btn btn-primary"
        onClick={startTest}
        disabled={state.disableButtons}
      >Начать тест
      </button>
    </div>
  )
}