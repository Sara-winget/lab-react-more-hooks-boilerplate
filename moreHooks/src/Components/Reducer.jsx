import React, { useReducer, useState, useRef, useEffect } from 'react';
import './Reducer.css'
const initialState = {
  inputVal: '',
  list: [],
  hidden: [],
};

const toDo = (state, action) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        list: [...state.list, action.payload],
        hidden: [...state.hidden, false],
        inputVal: '',
      };
    case 'input':
      return { ...state, inputVal: action.payload };
    case 'toggle':
      const newHidden = [...state.hidden];
      newHidden[action.payload] = !newHidden[action.payload];
      return { ...state, hidden: newHidden };
    default:
      return state;
  }
};

function ReducerDemo() {
  const enter = useRef(null);
  const [state, dispatch] = useReducer(toDo, initialState);
  const [scrollUp, setUp] = useState(0);

  useEffect(() => {
    enter.current.focus();
  }, [scrollUp]);

  return (
    <>
    <div className='ToDo'>
      <div className='enter'>
        <input
          type="text"
          style={{height:50,width:400}}
          ref={enter}
          value={state.inputVal}
          onChange={(e) => dispatch({ type: 'input', payload: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              dispatch({ type: 'set', payload: e.target.value });
            }
          }}
        />
      </div>
      <div className='items'>
      <ul>
        {state.list.map((item, index) => (
          <div key={index}>
            <li>
              {state.hidden[index] ? <h3>The content is hidden</h3> : <h2>{item}</h2>}
              <br />
              <button  onClick={() => dispatch({ type: 'toggle', payload: index })}>
                Toggle
              </button>
            </li>
          </div>
        ))}
      </ul></div>
      <div ><button className='upBtn' onClick={() => { setUp(scrollUp + 1) }}>scroll up</button>
      </div></div> </>
  );
}

export default ReducerDemo;
