import Head from 'next/head';
import { useState } from 'react';
import TableTop from '../components/TableTop';
import Terminal from '../components/Terminal';

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
  const [robot, setRobot] = useState(null);
  const [moveError, setMoveError] = useState(false);

  const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

  const moveNorth = () => {
    if (robot.y === 4) {
      setMoveError(true);
    } else {
      setRobot({
        ...robot,
        y: robot.y + 1,
      });
    }
  };

  const moveSouth = () => {
    if (robot.y === 0) {
      setMoveError(true);
    } else {
      setRobot({
        ...robot,
        y: robot.y - 1,
      });
    }
  };

  const moveEast = () => {
    if (robot.x === 4) {
      setMoveError(true);
    } else {
      setRobot({
        ...robot,
        x: robot.x + 1,
      });
    }
  };

  const moveWest = () => {
    if (robot.x === 0) {
      setMoveError(true);
    } else {
      setRobot({
        ...robot,
        x: robot.x - 1,
      });
    }
  };

  const handleMove = () => {
    switch (robot.facing) {
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
        console.error('Unknown direction index: ', robot.facing);
        break;
    }
  };

  const handleRotate = (turn) => {
    let newHeading;
    let newRotation;

    // turn left, decrements through the directions array
    if (turn === 'left') {
      newRotation = robot.rotation - 90;

      if (robot.facing === 0) {
        newHeading = 3;
      } else {
        newHeading = robot.facing - 1;
      }
    }

    // turn right, increments though the directions array
    if (turn === 'right') {
      newRotation = robot.rotation + 90;

      if (robot.facing === 3) {
        newHeading = 0;
      } else {
        newHeading = robot.facing + 1;
      }
    }

    setRobot({
      ...robot,
      facing: newHeading,
      rotation: newRotation,
    });
  };

  console.log('robot', robot);
  return (
    <div>
      <Head>
        <title>Table Top Robot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Table Top Robot</h1>

        <TableTop robot={robot} />

        <Terminal
          setRobot={setRobot}
          handleMove={handleMove}
          handleRotate={handleRotate}
          robotIsPlaced={robot !== null}
        />
      </main>
    </div>
  );
}
