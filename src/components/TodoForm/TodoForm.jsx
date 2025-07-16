import { useState } from 'react';
import styles from './TodoForm.module.css';

function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setError('Veuillez saisir une tâche');
      return;
    }

    if (inputValue.length > 100) {
      setError('Maximum 100 caractères');
      return;
    }

    onAddTodo(inputValue.trim());
    setInputValue('');
    setError('');
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Ajouter une nouvelle tâche..."
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          maxLength="100"
        />
        <button type="submit" className={styles.button}>
          Ajouter
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.counter}>{inputValue.length}/100</div>
    </form>
  );
}

export default TodoForm;
