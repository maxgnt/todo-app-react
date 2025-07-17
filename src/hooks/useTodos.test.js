import { describe, test, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useTodos from './useTodos'

// Mock complet de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

describe('useTodos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  describe('Initialisation', () => {
    test('initialise avec tableau vide si pas de données localStorage', () => {
      const { result } = renderHook(() => useTodos())
      expect(result.current.todos).toEqual([])
      expect(localStorageMock.getItem).toHaveBeenCalledWith('todoApp_todos')
    })

    test('charge les données depuis localStorage', () => {
      const savedTodos = [
        {
          id: 1,
          text: 'Tâche sauvée',
          completed: false,
          createdAt: '2024-01-15T10:00:00.000Z',
        },
      ]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedTodos))

      const { result } = renderHook(() => useTodos())
      expect(result.current.todos).toEqual(savedTodos)
    })

    test('gère JSON invalide dans localStorage', () => {
      localStorageMock.getItem.mockReturnValue('invalid json')
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const { result } = renderHook(() => useTodos())

      expect(result.current.todos).toEqual([])
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })
})
