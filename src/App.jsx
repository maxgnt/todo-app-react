import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import useTodos from './hooks/useTodos';
import { filterTodos } from './utils/helpers';
import { FILTER_TYPES } from './utils/constants';
import styles from './App.module.css';

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll
  } = useTodos();

  const [currentFilter, setCurrentFilter] = useState(FILTER_TYPES.ALL);

  const filteredTodos = filterTodos(todos, currentFilter);
  const completedCount = todos.filter(todo => todo.completed).length;

  const handleEdit = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const newText = prompt('Modifier la tâche :', todo.text);
      if (newText !== null && newText.trim() !== todo.text) {
        editTodo(id, newText);
      }
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Todo App</h1>
          <p className={styles.subtitle}>
            Organisez vos tâches efficacement
          </p>
        </header>

        <main className={styles.main}>
          <TodoForm onAddTodo={addTodo} />

          {todos.length > 0 && (
            <>
              <FilterBar
                currentFilter={currentFilter}
                onFilterChange={setCurrentFilter}
                onClearCompleted={clearCompleted}
                completedCount={completedCount}
              />

              <div className={styles.actions}>
                <button
                  onClick={toggleAll}
                  className={styles.toggleAllButton}
                >
                  {todos.every(todo => todo.completed) ? 'Tout décocher' : 'Tout cocher'}
                </button>
              </div>
            </>
          )}

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={handleEdit}
          />
        </main>

        <footer className={styles.footer}>
          <p>Créé avec React + Vite</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
