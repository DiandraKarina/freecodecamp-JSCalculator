

    import { ACTIONS } from "./App"


export default function ButtonOperation({ dispatch, operation, id }) {
  return (
    <button id = {id}
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OP, payload: { operation } })}
    >
      {operation}
    </button>
  )
}