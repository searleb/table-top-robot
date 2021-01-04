import PropTypes from 'prop-types';
import css from './TableTop.module.css';

export default function TableTop({ children }) {
  return (
    <section className={css.grid}>
      {children}
    </section>
  );
}

TableTop.propTypes = {
  children: PropTypes.node.isRequired,
};
