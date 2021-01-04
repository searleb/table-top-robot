import { useState } from 'react';
import Robot from './Robot';
import TableTop from './TableTop';
import Terminal from './Terminal';

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

export default function TableTopRobot() {
  /**
   * @var robot
   * @type object
   * @description null initial state.
   * object shape:
   * { x: num, y: num, facing: num, rotation: num }
   */
  const [robot, setRobot] = useState(null);

  const updateBot = (update) => {
    setRobot({
      ...robot,
      ...update,
    });
    return true;
  };

  const moveNorth = () => {
    if (robot.y === 4) {
      return false;
    }
    return updateBot({ y: robot.y + 1 });
  };

  const moveSouth = () => {
    if (robot.y === 0) {
      return false;
    }
    return updateBot({ y: robot.y - 1 });
  };

  const moveEast = () => {
    if (robot.x === 4) {
      return false;
    }
    return updateBot({ x: robot.x + 1 });
  };

  const moveWest = () => {
    if (robot.x === 0) {
      return false;
    }
    return updateBot({ x: robot.x - 1 });
  };

  const handleMove = () => {
    switch (robot.facing) {
      case 0:
        return moveNorth();
      case 1:
        return moveEast();
      case 2:
        return moveSouth();
      case 3:
        return moveWest();
      default:
        console.error('Unknown direction index: ', robot.facing);
        break;
    }
    return true;
  };

  const handleRotate = (turn) => {
    let newHeading;
    let newRotation;

    // turn left, decrements through the directions array
    // - 90 from rotation degrees
    if (turn === 'left') {
      newRotation = robot.rotation - 90;

      if (robot.facing === 0) {
        newHeading = 3;
      } else {
        newHeading = robot.facing - 1;
      }
    }

    // turn right, increments though the directions array
    // + 90 to rotation degrees
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

  return (
    <>
      <TableTop>
        <Robot robot={robot} />
      </TableTop>

      <Terminal
        robot={robot}
        setRobot={setRobot}
        handleMove={handleMove}
        handleRotate={handleRotate}
      />
    </>
  );
}
