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
  const [botPos, setBotPos] = useState({ x: 0, y: 0, facing: 0 });
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
        console.log('Unknown direction: ', DIRECTIONS[botPos.facing]);
        break;
    }
  };

  const handleRotate = (turn) => {
    let newHeading;

    // turn left, decrements through the directions array
    if (turn === 'left') {
      if (botPos.facing === 0) {
        newHeading = 3;
      } else {
        newHeading = botPos.facing - 1;
      }
    }

    // turn right, increments though the directions array
    if (turn === 'right') {
      if (botPos.facing === 3) {
        newHeading = 0;
      } else {
        newHeading = botPos.facing + 1;
      }
    }

    setBotPos({
      ...botPos,
      facing: newHeading,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Table Top Robot
        </h1>

        <section />
        <pre>{`${botPos.x}, ${botPos.y}, ${DIRECTIONS[botPos.facing]}`}</pre>
        <pre>{`${moveError}`}</pre>

        <button onClick={handleMove}>move</button>
        <button onClick={() => handleRotate('left')}>left</button>
        <button onClick={() => handleRotate('right')}>right</button>
      </main>

    </div>
  );
}
