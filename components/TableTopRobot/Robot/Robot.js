import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import usePrevious from '../../../hooks/usePrevious';
import css from './Robot.module.css';

export default function Robot({ robot }) {
  const [animate, setAnimate] = useState(false);
  const prevRobot = usePrevious(robot);

  // don't animate robot when first placed on the table
  useEffect(() => {
    if (prevRobot && prevRobot !== robot) {
      setAnimate(true);
    }
  }, [prevRobot, robot]);

  const getRobotStyle = () => {
    // y is inverted to move 0,0 from top left to bottom left
    // take the grid size index and subtract the bot y position to achieve this.
    const x = robot.x * 100;
    const y = (4 - robot.y) * 100;
    return {
      transform: `translate(${x}%,${y}%) rotate(${robot.rotation}deg)`,
    };
  };

  return (
    robot && (
      <div
        className={css.moveable}
        style={{ ...getRobotStyle() }}
        onTransitionEnd={() => setAnimate(false)}
        data-testid="robot"
      >
        <span
          role="img"
          className={`${css.robot} ${animate ? css.walk : null}`}
        />
      </div>
    )
  );
}

Robot.propTypes = {
  robot: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
  }),
};

Robot.defaultProps = {
  robot: null,
};
