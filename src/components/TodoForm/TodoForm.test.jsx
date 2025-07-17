import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from './TodoForm'

const mockOnAddTodo = vi.fn()

beforeEach(() => {
  mockOnAddTodo.mockClear()
})

describe('TodoForm', () => {
  describe('Rendu initial', () => {
    test('affiche le formulaire avec tous les éléments', () => {
      render(<TodoForm onAddTodo={mockOnAddTodo} />)

      expect(screen.getByPlaceholderText('Ajouter une nouvelle tâche...')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Ajouter' })).toBeInTheDocument()
      expect(screen.getByText('0/100')).toBeInTheDocument()
    })

    test('le champ de saisie est vide au départ', () => {
      render(<TodoForm onAddTodo={mockOnAddTodo} />)

      const input = screen.getByPlaceholderText('Ajouter une nouvelle tâche...')
      expect(input).toHaveValue('')
    })

    test("pas d'erreur affichée au départ", () => {
      render(<TodoForm onAddTodo={mockOnAddTodo} />)

      expect(screen.queryByText(/erreur|invalide/i)).not.toBeInTheDocument()
    })
  })

  describe('Saisie de texte', () => {
    test('met à jour la valeur lors de la saisie', async () => {
      const user = userEvent.setup()
      render(<TodoForm onAddTodo={mockOnAddTodo} />)

      const input = screen.getByPlaceholderText('Ajouter une nouvelle tâche...')
      await user.type(input, 'Nouvelle tâche')

      expect(input).toHaveValue('Nouvelle tâche')
    })

    test('met à jour le compteur de caractères', async () => {
      const user = userEvent.setup()
      render(<TodoForm onAddTodo={mockOnAddTodo} />)

      const input = screen.getByPlaceholderText('Ajouter une nouvelle tâche...')
      await user.type(input, 'Test')

      expect(screen.getByText('4/100')).toBeInTheDocument()
    })

    test("efface l'erreur lors de la saisie", async () => {
      const user = userEvent.setup()
      render(<TodoForm onAddTodo={mockOnAddTodo} />)

      const submitButton = screen.getByRole('button', { name: 'Ajouter' })
      await user.click(submitButton)
      expect(screen.getByText('Veuillez saisir une tâche')).toBeInTheDocument()

      const input = screen.getByPlaceholderText('Ajouter une nouvelle tâche...')
      await user.type(input, 'T')

      expect(screen.queryByText('Veuillez saisir une tâche')).not.toBeInTheDocument()
    })

    describe('Validation', () => {
      test('affiche erreur pour champ vide', async () => {
        const user = userEvent.setup()
        render(<TodoForm onAddTodo={mockOnAddTodo} />)

        const submitButton = screen.getByRole('button', { name: 'Ajouter' })
        await user.click(submitButton)

        expect(screen.getByText('Veuillez saisir une tâche')).toBeInTheDocument()
        expect(mockOnAddTodo).not.toHaveBeenCalled()
      })
/*
      test('affiche erreur pour texte trop long', async () => {
        const user = userEvent.setup()
        render(<TodoForm onAddTodo={mockOnAddTodo} />)

        const input = screen.getByPlaceholderText('Ajouter une nouvelle tâche...')
        const longText = 'x'.repeat(101)

        await user.type(input, longText)
        await user.click(screen.getByRole('button', { name: 'Ajouter' }))

        expect(
            await screen.findByText((content, element) =>
              element?.textContent?.includes('Maximum 100 caractères')
            )
          ).toBeInTheDocument()
          

        expect(mockOnAddTodo).not.toHaveBeenCalled()
      })
*/
      test('accepte un texte valide', async () => {
        const user = userEvent.setup()
        render(<TodoForm onAddTodo={mockOnAddTodo} />)

        const input = screen.getByPlaceholderText('Ajouter une nouvelle tâche...')
        await user.type(input, 'Tâche valide')
        await user.click(screen.getByRole('button', { name: 'Ajouter' }))

        expect(screen.queryByText(/erreur|maximum/i)).not.toBeInTheDocument()
        expect(mockOnAddTodo).toHaveBeenCalledWith('Tâche valide')
      })

      test('ignore les espaces en début et fin', async () => {
        const user = userEvent.setup()
        render(<TodoForm onAddTodo={mockOnAddTodo} />)

        const input = screen.getByPlaceholderText('Ajouter une nouvelle tâche...')
        await user.type(input, '   Tâche avec espaces   ')
        await user.click(screen.getByRole('button', { name: 'Ajouter' }))

        expect(mockOnAddTodo).toHaveBeenCalledWith('Tâche avec espaces')
      })
    })
  })
})
