import React from "react"
import './App.css';
import {useReducer} from "react"
import ButtonDigit from "./ButtonDigit"
import ButtonOperation from "./ButtonOperation"


export const ACTIONS={
  ADD_DIGIT:'add_digit',
  CLEAR:'choose',
  CHOOSE_OP:'choose_op',
  EQUALS:'equals'

}


function reducer(state,{type,payload}) {
switch(type){
  case ACTIONS.ADD_DIGIT: 

  if (state.overwrite) {
    return {
      ...state,
      currentNumber: payload.digit,
      overwrite: false,
    }
  }
  if (payload.digit === "0" && state.currentNumber === "0") {
    return state
  }
  if (payload.digit === "." && state.currentNumber.includes(".")) {
    return state
  }
  return {
    ...state,
    currentNumber:`${state.currentNumber || ""}${payload.digit}`
  }

  case ACTIONS.CLEAR: return {
    ...state,
    currentNumber : '0',
  }

  case ACTIONS.CHOOSE_OP:
    if(state.currentNumber==null && state.previousNumber==null) {return state;}

    if (state.currentNumber == null) {
      return {
        ...state,
        operation: payload.operation,
      }
    }

    if (state.previousNumber == null) {
      return {
        ...state,
        operation: payload.operation,
        previousNumber: state.currentNumber,
        currentNumber: null,
      }
    }

    return {
      ...state,
      previousNumber: equals(state),
      operation: payload.operation,
      currentNumber: null,
    }

    case ACTIONS.EQUALS:
      if (
        state.operation == null ||
        state.currentNumber == null ||
        state.previousNumber == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousNumber: null,
        operation: null,
        currentNumber: equals(state),
      }
    
}
}

function equals({currentNumber,previousNumber,operation }) {
  const prev = parseFloat(previousNumber)
  const current = parseFloat(currentNumber)
  if (isNaN(prev) || isNaN(current)) return '0';
  let computation = ""
  switch (operation) {
    
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "X":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break
  }

  return computation.toString()
}


const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}


export default function MyCalculator() {

    const[{currentNumber,previousNumber,operation},dispatch]=useReducer(reducer,{})

   
      return( 
        <div className="container">
          <div className="calculator">
      <div id="display"> 
      <div id="previous-number">{formatOperand(previousNumber)} {operation}</div>
      <div id="current-number">{formatOperand(currentNumber)}</div>
      </div>
      <div id="buttons">
        <div className="rows">
          <button id="clear" onClick={()=> dispatch({type: ACTIONS.CLEAR})}> AC</button> 
          <ButtonOperation id="divide" operation='/' dispatch={dispatch} />
          <ButtonOperation id="multiply" operation="X" dispatch={dispatch} />
        </div>

        <div className="rows">
          <ButtonDigit id="seven" digit="7" dispatch={dispatch} />
          <ButtonDigit id="eight" digit="8" dispatch={dispatch} />
          <ButtonDigit id="nine" digit="9" dispatch={dispatch} />
          <ButtonOperation id="subtract" operation="-" dispatch={dispatch} />
        
      </div>
      <div className="rows">
          <ButtonDigit id="four" digit="4" dispatch={dispatch} />
          <ButtonDigit id="five" digit="5" dispatch={dispatch} />
          <ButtonDigit id="six" digit="6" dispatch={dispatch} />
          <ButtonOperation id="add" operation="+" dispatch={dispatch} />
      </div>
      <div className="rows">
          <ButtonDigit id="one" digit="1" dispatch={dispatch} />
          <ButtonDigit id="two" digit="2" dispatch={dispatch} />
          <ButtonDigit id="three" digit="3" dispatch={dispatch} />
          <button id="equals" onClick={()=> dispatch({type: ACTIONS.EQUALS})}>=</button>
      </div>
        <div className="rows">
          <ButtonDigit id="zero" digit="0" dispatch={dispatch} />
          <ButtonDigit id="decimal" digit="." dispatch={dispatch} />
  
      </div>
       </div>
       </div>
       </div>
      )
    }


