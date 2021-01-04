// Disabled these to quickly add focus to the input from a click anywhere in the
// terminal. I wouldn't let this go into production on a public facing site.
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import css from './Terminal.module.css';

const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const ROTATIONS = [0, 90, 180, 270];

export default function Terminal({
  setRobot, handleMove, handleRotate, robot,
}) {
  const [inputValue, setInputValue] = useState('');
  const [terminalFeed, setTerminalFeed] = useState([]);
  const terminalWindow = useRef();
  const terminalInput = useRef();

  // keep overflowing terminal window scrolled to bottom
  useEffect(() => {
    terminalWindow.current.scrollTop = terminalWindow.current.scrollHeight;
  }, [terminalFeed]);

  // helper func to update terminal feed
  const addLineToTerminal = (line, withInput = true) => setTerminalFeed((feed) => [
    ...feed,
    `${line ? `${line}` : ''} ${withInput ? `${inputValue}` : ''}`,
  ]);

  // simple error handling, if either coordinate is out of bounds
  // or if facing direction is somehow invalid
  const handlePlaceErrors = (x, y, facing) => {
    if (x > 4 || y > 4 || facing === -1) {
      addLineToTerminal('invalid: ');
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
    if (params.length < 3) {
      addLineToTerminal('error: ');
      return;
    }
    const x = Number(params[0]);
    const y = Number(params[1]);
    const facing = DIRECTIONS.indexOf(params[2]?.trim().toUpperCase());
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

  // Prints report to terminal
  const handleReport = () => {
    const { x, y, facing } = robot;
    addLineToTerminal(`report: ${x},${y},${DIRECTIONS[facing]}`, false);
  };

  const handleMoveWithError = () => {
    const success = handleMove();
    if (!success) {
      addLineToTerminal('I\'ll fall off if I go any further!', false);
    } else {
      addLineToTerminal();
    }
  };

  const handleCommand = (e) => {
    e.preventDefault();

    // empty input field
    setInputValue('');

    // trimming and lowercasing to support mixed lower/upper case input
    const input = inputValue.trim().toLowerCase();

    if (input.startsWith('place')) {
      placeBot();
    } else if (!robot) {
      addLineToTerminal('call place() to add a robot', false);
    } else if (robot) {
      switch (input) {
        case 'move()':
          handleMoveWithError();
          break;
        case 'left()':
          handleRotate('left');
          addLineToTerminal();
          break;
        case 'right()':
          handleRotate('right');
          addLineToTerminal();
          break;
        case 'report()':
          handleReport();
          break;
        default:
          addLineToTerminal('command not found: ');
      }
    }
  };

  return (
    <section
      className={css.terminal}
      onClick={() => terminalInput.current.focus()}
    >
      <ul className={css.feed} ref={terminalWindow} data-testid="feed">
        {/* eslint-disable-next-line react/no-array-index-key */}
        {terminalFeed.map((item, i) => <li key={item + i}>{item}</li>)}
      </ul>

      <form onSubmit={handleCommand} className={css.form} data-testid="form">
        <input
          type="text"
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
          className={css.input}
          maxLength={18}
          placeholder="Enter command:"
          ref={terminalInput}
          data-testid="input"
        />
      </form>
    </section>
  );
}

Terminal.propTypes = {
  setRobot: PropTypes.func.isRequired,
  handleMove: PropTypes.func.isRequired,
  handleRotate: PropTypes.func.isRequired,
  robot: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    facing: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
  }),
};

Terminal.defaultProps = {
  robot: null,
};
