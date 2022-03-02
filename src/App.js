import './App.css';
import { useRef, useState } from 'react';
import { calculate } from './helper';

function App() {
  const [label, setLabel] = useState('0');
  const [operator, setOperator] = useState(null);
  const firstOperand = useRef(null);
  const awaitingNewOperand = useRef(true);

  // prettier-ignore
  const numKeys = [
    '7', '8', '9', 
    '4', '5', '6', 
    '1', '2', '3', 
    '0', '.'
  ];

  /**
   * Do something when a number key is pressed.
   *
   * @param {String} num: one of '0' - '9', '00', '.'
   * @return {void}
   */
  const onPressNum = (numText) => {
    // TODO: FILL YOUR CODE HERE
    if (numText === '.' && label.includes('.')){
      return;
    }
    if (label === '0'){
      if (numText === '0'){
        return;
      }
      if (numText === '.'){
        setLabel('0.');
        return;
      }
      setLabel(numText);
      return;
    }
    setLabel(label + numText);
  };

  /**
   * Do something when a operator key is pressed.
   *
   * @param {String} op: one of '+', '-', '*', '/'
   *
   * @return {void}
   */
  const onPressOperator = (op) => {
    // TODO: FILL YOUR CODE HERE
   if (operator && awaitingNewOperand.current){
     setOperator(op);
     return;
   }
    if (!operator){
      firstOperand.current = label;
    } else {
      const result = calculate(
        operator,
        Number.parseFloat(firstOperand.current),
        Number.parseFloat(label)  
      );
      setLabel(result)
      firstOperand.current = result.toString();
    }
    setOperator(op);
    awaitingNewOperand.current = true;
  };

  /**
   * Do something when the equal key is pressed.
   *
   * @return {void}
   */
  const onPressEqual = () => {
    if (!operator) {
      return;
    }
    setLabel(
      calculate(
        operator,
        Number.parseFloat(firstOperand.current),
        Number.parseFloat(label)
      )
    );
    setOperator(null);
    firstOperand.current = null;
    awaitingNewOperand.current = true;
  };

  /**
   * Do something when the clear key is pressed.
   *
   * @return {void}
   */
  const onClear = () => {
    // TODO: FILL YOUR CODE HERE
    setLabel('0')
    setOperator(null);
    firstOperand.current = null;
    awaitingNewOperand.current = true;
  };

  return (
    <div className="App">
      <div className="label">{label}</div>
      <div className="keypad">
        <button onClick={onClear} className="col-span-2 bg-red-600">
          C
        </button>

        <div className="num-keys-section">
          {numKeys.map((num) => {
            const classes = ['bg-slate-600'];
            if (num === '0') {
              classes.push('col-span-2');
            }

            return (
              <button
                onClick={() => onPressNum(num)}
                className={classes.join(' ')}
                key={num}
              >
                {num}
              </button>
            );
          })}
        </div>

        {['*', '/', '-', '+'].map((op) => {
          const classes = ['bg-slate-600'];
          if ('+' === op) {
            classes.push('row-span-2');
          } else {
            classes.push('aspect-square');
          }

          return (
            <button
              onClick={() => onPressOperator(op)}
              className={classes.join(' ')}
              key={op}
            >
              {op}
            </button>
          );
        })}

        <button onClick={onPressEqual} className="bg-cyan-600">
          =
        </button>
      </div>
    </div>
  );
}

export default App;
