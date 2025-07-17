import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from './TodoItem'

const mockTodo = {
  id: 1,
  text: 'Tâche de test',
  completed: false,
  createdAt: '2024-01-15T10:00:00.000Z'
}

const mockTodoCompleted = {
  ...mockTodo,
  completed: true
}

describe('TodoItem', () => {
  const mockOnToggle = vi.fn()
  const mockOnDelete = vi.fn()
  const mockOnEdit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendu', () => {
    test('affiche le texte de la tâche', () => {
      render(
        <TodoItem
          todo={mockTodo}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      )
      expect(screen.getByText('Tâche de test')).toBeInTheDocument()
    })

    test('affiche la date de création', () => {
      render(
        <TodoItem
          todo={mockTodo}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      )
      expect(screen.getByText(/15 janv|Hier|Il y a/)).toBeInTheDocument()
    })

    test("affiche les boutons d'action", () => {
      render(
        <TodoItem
          todo={mockTodo}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      )
      expect(screen.getByRole('button', { name: /Marquer.*comme/ })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Modifier' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Supprimer' })).toBeInTheDocument()
    })
  })

  describe('États de la tâche', () => {
    test('tâche non terminée affiche ⭕', () => {
      render(
        <TodoItem
          todo={mockTodo}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      )
      const toggleButton = screen.getByRole('button', {
        name: /Marquer.*comme terminé/
      })
      expect(toggleButton).toHaveTextContent('⭕')
    })

    test('tâche terminée affiche ✅', () => {
      render(
        <TodoItem
          todo={mockTodoCompleted}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      )
      const toggleButton = screen.getByRole('button', {
        name: /Marquer.*comme non terminée/
      })
      expect(toggleButton).toHaveTextContent('✅')
    })

    test("applique les styles appropriés selon l'état", () => {
      const { rerender } = render(
        <TodoItem
          todo={mockTodo}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      )
      let container = screen.getByText('Tâche de test').closest('[class*="todoItem"]')
      expect(container).not.toHaveClass(/completed/)

      rerender(
        <TodoItem
          todo={mockTodoCompleted}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      )
      container = screen.getByText('Tâche de test').closest('[class*="todoItem"]')
      expect(container).toHaveClass(/completed/)
    })

    test('bouton modifier est désactivé pour tâche terminée', () => {
      render(
        <TodoItem
          todo={mockTodoCompleted}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      )
      const editButton = screen.getByRole('button', { name: 'Modifier' })
      expect(editButton).toBeDisabled()
    })
  })
})
