import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StudentDetail } from '../pages/StudentDetail';
import { alunosAPI } from '../services/api';

// Mock da API
vi.mock('../services/api', () => ({
  alunosAPI: {
    getById: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock do useParams e useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn(),
  };
});

describe('StudentDetail - Detalhes do Aluno', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar os detalhes do aluno após carregamento', async () => {
    const mockStudent = {
      id: 1,
      nome: 'João Silva',
      turma: 'A',
      curso: 'Engenharia',
      matricula: '2023001'
    };

    alunosAPI.getById.mockResolvedValue({ data: mockStudent });

    await act(async () => {
      render(
        <BrowserRouter>
          <StudentDetail />
        </BrowserRouter>
      );
    });

    // Aguarda o carregamento
    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
    });

    // Verifica todos os detalhes
    expect(screen.getByText('Engenharia')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('2023001')).toBeInTheDocument();
    expect(screen.getByText('← Voltar')).toBeInTheDocument();
  });

  it('deve mostrar botões de ação após carregamento', async () => {
    const mockStudent = {
      id: 1,
      nome: 'João Silva',
      turma: 'A',
      curso: 'Engenharia',
      matricula: '2023001'
    };

    alunosAPI.getById.mockResolvedValue({ data: mockStudent });

    await act(async () => {
      render(
        <BrowserRouter>
          <StudentDetail />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Editar')).toBeInTheDocument();
      expect(screen.getByText('Excluir')).toBeInTheDocument();
    });
  });
});