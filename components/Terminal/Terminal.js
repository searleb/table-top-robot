// Disabled these to quickly add focus to the input from a click anywhere in the
// terminal. I wouldn't let this go into production on a public facing site.
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import styles from './Terminal.module.css';

const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const ROTATIONS = [0, 90, 180, 270];

export default function Terminal({
  setRobot, handleMove, handleRotate, robotIsPlaced,
}) {
  const [inputValue, setInputValue] = useState('');
  const [terminalFeed, setTerminalFeed] = useState([]);
  const terminalWindow = useRef();
  const terminalInput = useRef();

  // keep overflowing terminal window scrolled to bottom
  useEffect(() => {
    terminalWindow.current.scrollTop = terminalWindow.current.scrollHeight;
  }, [terminalFeed]);

  const addLineToTerminal = (line) => setTerminalFeed([...terminalFeed, `${line ? `${line}: ` : ''} ${inputValue}`]);

  // simple error handling, if either coordinate is out of bounds
  // or if facing direction is somehow invalid
  const handlePlaceErrors = (x, y, facing) => {
    if (x > 4 || y > 4 || facing === -1) {
      addLineToTerminal('invalid');
      throw new Error('invalid');
    }
  };

  const placeBot = () => {
    // match all characters within () of the input and
    // split on "," to get an array of the passed in args.
    const match = inputValue.match(/\(([^]+)\)/);
    let params = [];
    if (Array.isArray(match)) {
      params = match[1].split(',');
    }
    console.log('params', params);
    if (params.length < 3) {
      addLineToTerminal('error');
      return;
    }
    const x = Number(params[0]);
    const y = Number(params[1]);
    const facing = DIRECTIONS.indexOf(params[2].trim().toUpperCase());
    const rotation = ROTATIONS[facing];

    try {
      handlePlaceErrors(x, y, facing);
    } catch (error) {
      console.error(error);
      return;
    }

    addLineToTerminal();
    setRobot({
      x, y, facing, rotation,
    });
  };

  const handleCommand = (e) => {
    e.preventDefault();

    // empty input field
    setInputValue('');

    if (inputValue.startsWith('place')) {
      placeBot();
    } else if (!robotIsPlaced) {
      addLineToTerminal('call place() to add a robot');
    } else if (robotIsPlaced) {
      switch (inputValue) {
        case 'move()':
          handleMove();
          break;
        case 'left()':
          handleRotate('left');
          break;
        case 'right()':
          handleRotate('right');
          break;
        case 'report()':
          break;
        default:
          addLineToTerminal('command not found');
          return;
      }
      // this will only run if the default case isn't hit
      // therefore only adding valid cases to the terminal feed
      addLineToTerminal();
    }
  };

  return (
    <section
      className={styles.terminal}
      onClick={() => terminalInput.current.focus()}
    >
      <ul className={styles.feed} ref={terminalWindow}>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {terminalFeed.map((item, i) => <li key={item + i}>{item}</li>)}
      </ul>

      <form onSubmit={handleCommand} className={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
          className={styles.input}
          maxLength={18}
          placeholder="Enter command:"
          ref={terminalInput}
        />
        {/* <span className={styles.caret} /> */}
      </form>
    </section>
  );
}

Terminal.propTypes = {
  setRobot: PropTypes.func.isRequired,
  handleMove: PropTypes.func.isRequired,
  handleRotate: PropTypes.func.isRequired,
  robotIsPlaced: PropTypes.bool.isRequired,
};
