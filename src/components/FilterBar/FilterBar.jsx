import styles from './FilterBar.module.css';
import { FILTER_TYPES, FILTER_LABELS } from '../../utils/constants';

function FilterBar({ currentFilter, onFilterChange, onClearCompleted, completedCount }) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filters}>
        {Object.values(FILTER_TYPES).map(filter => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`${styles.filterButton} ${
              currentFilter === filter ? styles.active : ''
            }`}
          >
            {FILTER_LABELS[filter]}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className={styles.clearButton}
        >
          Supprimer les terminées ({completedCount})
        </button>
      )}
    </div>
  );
}

export default FilterBar;
