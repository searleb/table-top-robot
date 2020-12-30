import PropTypes from 'prop-types';
import css from './TableTop.module.css';

export default function TableTop({ robot }) {
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
        {/* {Array.from(Array(25)).map((_, i) => <div key={i} />)} */}
        {robot && (
          <span
            className={css.robo}
            style={{ ...getRobotStyle() }}
          >
            🤖
          </span>
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
