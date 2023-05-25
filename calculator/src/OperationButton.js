import { ACTION } from "./App"

export default function DigitButton({dispatch, operation}){
    return(
        <button onClick={() => dispatch({type:ACTION.CHOOSE_OPERATION, payload:{ operation }})}>
            {operation}
        </button>
    )
}