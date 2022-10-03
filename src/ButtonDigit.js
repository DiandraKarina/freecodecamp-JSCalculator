import { ACTIONS } from "./App"

export default function ButtonDigit({ dispatch, digit, id }) {
  return (
    <button id={id}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  )
}