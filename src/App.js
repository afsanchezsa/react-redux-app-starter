import React, {useState, useReducer } from 'react';
import Routes from './routes';
import Context  from './utils/context';
import * as Reducer from './store/hooks_state/hooks_reducer'
import * as ACTIONS from './store/actions/actions'
const App=()=> {

const [stateGlobal,setStateGlobal]=useState(0)
    const [stateContextGlobal,dispatchContextGlobal]=useReducer(Reducer.HooksReducer,Reducer.initialState)
    const handleContextDispacthTrue=()=>{
        dispatchContextGlobal(ACTIONS.success())
    }
    const handleContextDispacthFalse=()=>{
        dispatchContextGlobal(ACTIONS.failure())
    }
    const incrementsGlobalState=()=>{
    setStateGlobal(stateGlobal+1)
    }
    const decrementGlobalState=()=>{
    setStateGlobal(stateGlobal-1)
    }
    return(
      <div>
      React
          <Context.Provider
          value={{
            valueGlobalState:stateGlobal,
            addGlobalValue:()=>incrementsGlobalState(),
            decGlobalValue:()=>decrementGlobalState(),
              reducerGlobalState:stateContextGlobal.stateprop2,
              dispatchContextTrue:()=>handleContextDispacthTrue(),
              dispatchContextFalse:()=>handleContextDispacthFalse()
          }}
          >
      <Routes />
      </Context.Provider>
      </div>

    )
}


export default App;
