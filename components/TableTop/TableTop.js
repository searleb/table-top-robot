import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import css from './TableTop.module.css';

export default function TableTop({ robot }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => setAnimate(true), [robot]);

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
    <section className={css.section}>
      <div className={css.grid}>
        {robot && (
          <div
            className={css.moveable}
            style={{ ...getRobotStyle() }}
            onTransitionEnd={() => setAnimate(false)}
          >
            <span
              role="img"
              className={`${css.robot} ${animate ? css.walk : null}`}
            />
          </div>
        )}
      </div>
    </section>
  );
}

TableTop.propTypes = {
  robot: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
  }),
};

TableTop.defaultProps = {
  robot: null,
};
