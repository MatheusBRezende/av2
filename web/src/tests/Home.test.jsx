import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Home } from '../pages/Home';
import { alunosAPI } from '../services/api';

// Mock da API
vi.mock('../services/api', () => ({
  alunosAPI: {
    getAll: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Home - Listagem de Alunos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar a lista de alunos após carregamento', async () => {
    // Mock dos dados
    const mockStudents = [
      {
        id: 1,
        nome: 'João Silva',
        turma: 'A',
        curso: 'Engenharia',
        matricula: '2023001'
      }
    ];

    alunosAPI.getAll.mockResolvedValue({ data: mockStudents });

    await act(async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
    });

    // Aguarda o carregamento e verifica os dados
    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
      expect(screen.getByText('Engenharia - A')).toBeInTheDocument();
    });

    expect(screen.getByText('Lista de Alunos')).toBeInTheDocument();
  });

  it('deve mostrar mensagem quando não há alunos', async () => {
    alunosAPI.getAll.mockResolvedValue({ data: [] });

    await act(async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Nenhum aluno cadastrado.')).toBeInTheDocument();
    });
  });

  it('deve mostrar botão de novo aluno após carregamento', async () => {
    alunosAPI.getAll.mockResolvedValue({ data: [] });

    await act(async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Novo Aluno')).toBeInTheDocument();
    });
  });
});