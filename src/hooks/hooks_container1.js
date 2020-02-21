import React,{useState,useEffect,useReducer,useContext} from 'react'
import * as Reducer from    '../store/hooks_state/hooks_reducer'
import * as ACTIONS from '../store/actions/actions'
import Context from '../utils/context'

//use reducer es una alternativa a use state porque no gestiona ningun store global pues fue declarado aqui, sino un estado local
//pero si es un usereducer hecho en app.js si es global pues ese componente nunca se vuelve a monta
// CONCLUSION: SI NECESITA UN STORE PARA SER CAMBIADO POR COMPONENTES FUNCIONALES HAGALO CON UN CONTEXT EN APP JS Y ALLA DECLARE
// UN DISPATCHER CON USE REDUCER(ES UNA ALTERNATIVA AL USO DE STORE)
const HooksContainer1=()=>{
    const context=useContext(Context)
  const [stateValue,setValue]=useState(0)
    const [useEffectValue,setUseEffectValue]=useState(null)
    const [state,dispatch]=useReducer(Reducer.HooksReducer,Reducer.initialState)
    const incrementValue=()=>{
      setValue(stateValue+1)
    }
    const decrementValue=()=>{
      setValue(stateValue-1)
    }
    const changeUseEffectValue=()=>{
        setUseEffectValue('some string')
    }

    useEffect(()=>{//esta funcion se ejecuta cuando se monta el componente
        setTimeout(()=>setUseEffectValue("useEffect worked"),300)
    },[stateValue])//si no lleva el segundo argumento se ejecuta cuando se vuelve a renderizar el componente y si lleva el nombre de
    //una variable entre los corchetes se ejecuta cada vez que esa variable cambia

    const handleDispacthTrue=()=>{
      dispatch(ACTIONS.success())//esto solo funciona localmente pero al recargar vuelve a los valores iniciales pues el useReducer es para un estado local, no global
    }
    const handleDispacthFalse=()=>{
        dispatch(ACTIONS.failure())
    }
    return (
        <div>
            React Hooks
        <br/>
        <button onClick={()=>incrementValue()}>Inc Local State</button>
            <button onClick={()=>decrementValue()}>Dec Local State</button>
            <button onClick={()=>changeUseEffectValue()}>change useEffect</button>
            <button onClick={()=>handleDispacthTrue()}>Dispatch True</button>
            <button onClick={()=>handleDispacthFalse()}>Dispatch False</button>
            <button onClick={()=>context.addGlobalValue()}>inc Contex Value</button>
            <button onClick={()=>context.decGlobalValue()}>dec Context Value</button>
            <button onClick={()=>context.dispatchContextTrue()}>Dispatch Context True</button>/*esto si persiste pues el contexto si es global*/
            <button onClick={()=>context.dispatchContextFalse()}>Dispatch context false </button>
            <br/>
            <div>
                <br/>
                {useEffectValue?
                <p>{useEffectValue}</p>:
                    <p>Not value</p>
                }
                <br/>
                {state.stateprop1?<p>state prop 1 is true</p>:<p>state prop 1 is false</p>}
                <br/>
                {context.reducerGlobalState?<p>state prop 2 is true</p>:<p>state prop 2 is false</p>}
                <br/>
                <p>Local state :{stateValue}</p>
                <br/>
                <p>Global state:{context.valueGlobalState}</p>
            </div>
        </div>

    )
}
export default  HooksContainer1;