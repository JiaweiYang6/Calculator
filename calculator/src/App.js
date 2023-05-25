import { useReducer } from 'react';
import './App.css';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTION = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: 'delete-digit',
  CLEAR: 'clear',
  EVALUATE: 'evaluate'
}



function reducer(state, { type, payload }){
  switch(type){
    case ACTION.ADD_DIGIT:
      if(payload.digit === '0' && state.currentOperand === '0'){
        return state;
      }
      if(payload.digit === '.' && state.currentOperand.includes(".")){
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      };
    case ACTION.CLEAR:
      return {};
    case ACTION.CHOOSE_OPERATION:
      if(state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      if(state.currentOperand == null){
        return {
          ...state,
          operation: payload.operation
        }
      }
      return{
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand:null
      }
    case ACTION.EVALUATE:
      if(state.previousOperand == null || 
        state.currentOperand == null ||
        state.operation == null) {
          return state
        }
      return {
        ...state,
        operation: null,
        previousOperand: null,
        currentOperand: evaluate(state)
      }
    case ACTION.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: null
      }
  }
}

function evaluate({currentOperand, previousOperand, operation}){
  const current = parseFloat(currentOperand)
  const previous = parseFloat(previousOperand)
  let result=""
  if(isNaN(current) || isNaN(previous) ){
    return ""
  }
  switch(operation){
    case '+':
      result = current+previous
      break;
    case '-':
      result = previous-current
      break;
    case '*':
      result = previous*current
      break;
    case '/':
      result = previous/current
      break;
  }
  return result;
}

function App() {
  const [{ currentOperand=0, previousOperand, operation }, dispatch] = useReducer(reducer,{})
  return (
    <div className="calculator">
      <div className='output'>
        <div className='prev-operand'>{previousOperand} {operation}</div>
        <div className='curr-operand'>{currentOperand}</div>
      </div> 
      <button className='span-two' onClick={()=>dispatch({type:ACTION.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type:ACTION.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation={"/"} dispatch={dispatch}/>
      <DigitButton digit={'7'} dispatch={dispatch}/>
      <DigitButton digit={'8'} dispatch={dispatch}/>
      <DigitButton digit={'9'} dispatch={dispatch}/>
      <OperationButton operation={'*'} dispatch={dispatch}/>
      <DigitButton digit={'4'} dispatch={dispatch}/>
      <DigitButton digit={'5'} dispatch={dispatch}/>
      <DigitButton digit={'6'} dispatch={dispatch}/>
      <OperationButton operation={'+'} dispatch={dispatch}/>
      <DigitButton digit={'1'} dispatch={dispatch}/>
      <DigitButton digit={'2'} dispatch={dispatch}/>
      <DigitButton digit={'3'} dispatch={dispatch}/>
      <OperationButton operation={'-'} dispatch={dispatch}/>
      <DigitButton digit={'.'} dispatch={dispatch}/>
      <DigitButton digit={'0'} dispatch={dispatch}/>
      <button className='span-two' onClick={()=>dispatch({type:ACTION.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
