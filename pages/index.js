import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

/**
 * Grid index allowed x or y: 0-4
 * Bottom Left is 0,0
 * If x is 0, West is not allowed
 * If x is 4, East is not allowed
 * If y is 0, South is not allowed
 * If y is 4, North is not allowed
 * If North increment y
 * If South decrement y
 * If East increment x
 * If West decrement x
 */

export default function Home() {
  const [botPos, setBotPos] = useState({
    x: 0, y: 0, facing: 0, rotation: 0,
  });
  const [moveError, setMoveError] = useState(false);

  const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

  const moveNorth = () => {
    if (botPos.y === 4) {
      setMoveError(true);
    } else {
      setBotPos({
        ...botPos,
        y: botPos.y + 1,
      });
    }
  };

  const moveSouth = () => {
    if (botPos.y === 0) {
      setMoveError(true);
    } else {
      setBotPos({
        ...botPos,
        y: botPos.y - 1,
      });
    }
  };

  const moveEast = () => {
    if (botPos.x === 4) {
      setMoveError(true);
    } else {
      setBotPos({
        ...botPos,
        x: botPos.x + 1,
      });
    }
  };

  const moveWest = () => {
    if (botPos.x === 0) {
      setMoveError(true);
    } else {
      setBotPos({
        ...botPos,
        x: botPos.x - 1,
      });
    }
  };

  const handleMove = () => {
    switch (botPos.facing) {
      case 0:
        moveNorth();
        break;
      case 1:
        moveEast();
        break;
      case 2:
        moveSouth();
        break;
      case 3:
        moveWest();
        break;
      default:
        console.error('Unknown direction index: ', botPos.facing);
        break;
    }
  };

  const handleRotate = (turn) => {
    let newHeading;
    let newRotation;

    // turn left, decrements through the directions array
    if (turn === 'left') {
      newRotation = botPos.rotation - 90;

      if (botPos.facing === 0) {
        newHeading = 3;
      } else {
        newHeading = botPos.facing - 1;
      }
    }

    // turn right, increments though the directions array
    if (turn === 'right') {
      newRotation = botPos.rotation + 90;

      if (botPos.facing === 3) {
        newHeading = 0;
      } else {
        newHeading = botPos.facing + 1;
      }
    }

    setBotPos({
      ...botPos,
      facing: newHeading,
      rotation: newRotation,
    });
  };

  const getRobotStyle = () => {
    console.log('botPos', botPos);
    const x = botPos.x * 100;
    // y is inverted to move 0,0 from top left to bottom left
    // take the grid size index and subtract the bot y position to achieve this.
    const y = (4 - botPos.y) * 100;
    console.log('x', x);
    return {
      transform: `translate(${x}%,${y}%) rotate(${botPos.rotation}deg)`,
    };
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Table Top Robot
        </h1>

        <section className={styles.section}>
          <div className={styles.grid}>
            {Array.from(Array(25)).map((_, i) => <div key={i} />)}
            <span
              className={styles.robo}
              style={{ ...getRobotStyle() }}
            >
              🤖
            </span>
          </div>
        </section>
        <pre>{`${botPos.x}, ${botPos.y}, ${DIRECTIONS[botPos.facing]}`}</pre>
        <pre>{`${moveError}`}</pre>

        <button onClick={handleMove}>move</button>
        <button onClick={() => handleRotate('left')}>left</button>
        <button onClick={() => handleRotate('right')}>right</button>
      </main>

    </div>
  );
}
