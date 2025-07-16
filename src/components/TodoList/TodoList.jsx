import TodoItem from '../TodoItem';
import styles from './TodoList.module.css';

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📝</div>
        <h3>Aucune tâche</h3>
        <p>Ajoutez votre première tâche ci-dessus pour commencer !</p>
      </div>
    );
  }

  // Statistiques
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className={styles.todoList}>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{totalCount}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{pendingCount}</span>
          <span className={styles.statLabel}>En cours</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{completedCount}</span>
          <span className={styles.statLabel}>Terminées</span>
        </div>
      </div>

      <div className={styles.list}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
