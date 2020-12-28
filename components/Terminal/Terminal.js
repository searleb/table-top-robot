import { useState } from 'react';
import styles from './Terminal.module.css';

const COMMANDS = ['place', 'move', 'left', 'right', 'report'];

const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const ROTATIONS = [0, 90, 180, 270];

export default function Terminal({ setRobot }) {
  const [inputValue, setInputValue] = useState('');
  const [terminalFeed, setTerminalFeed] = useState([]);

  const addLineToTerminal = (line) => setTerminalFeed([...terminalFeed, `${line ? `${line}: ` : ''} ${inputValue}`]);

  const handlePlaceErrors = (x, y, facing) => {
    if (x > 4 || y > 4 || facing === -1) {
      addLineToTerminal('invalid');
      throw new Error('invalid');
    }
  };

  const placeBot = () => {
    // match all characters within () of the input and
    // split on "," to get an array of the passed in args.
    const params = inputValue.match(/\(([^]+)\)/)[1].split(',');
    if (params.length < 3) {
      addLineToTerminal('missing args');
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
    const funcCall = inputValue.split('(')[0].toLowerCase();
    if (COMMANDS.includes(funcCall)) {
      switch (funcCall) {
        case 'place':
          placeBot();
          break;

        default:
          break;
      }
    } else {
      setTerminalFeed([...terminalFeed, `command not found: ${inputValue}`]);
    }
  };

  return (
    <section className={styles.terminal}>
      <ul>
        {terminalFeed.map((item) => <li key={item}>{item}</li>)}
      </ul>

      <form onSubmit={handleCommand}>
        <input
          type="text"
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
        />
      </form>
    </section>
  );
}
