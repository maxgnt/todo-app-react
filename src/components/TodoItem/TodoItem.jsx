import styles from './TodoItem.module.css';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      <div className={styles.content}>
        <button
          onClick={() => onToggle(todo.id)}
          className={styles.toggleButton}
          title={todo.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
          aria-label={todo.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
        >
          {todo.completed ? '✅' : '⭕'}
        </button>

        <div className={styles.textContent}>
          <span className={styles.text}>{todo.text}</span>
          <span className={styles.date}>{formatDate(todo.createdAt)}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => onEdit(todo.id)}
          className={styles.editButton}
          title="Modifier"
          aria-label="Modifier"
          disabled={todo.completed}
        >
          ✏
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className={styles.deleteButton}
          title="Supprimer"
          aria-label="Supprimer"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
