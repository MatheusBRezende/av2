import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock dos componentes que fazem chamadas de API
vi.mock('../pages/Home', () => ({
  Home: () => <div>Página Inicial - Lista de Alunos</div>
}));

vi.mock('../pages/StudentDetail', () => ({
  StudentDetail: () => <div>Detalhes do Aluno</div>
}));

describe('App', () => {
  it('deve renderizar a aplicação com roteamento', async () => {
    await act(async () => {
      render(<App />);
    });

    // Verifica se o sistema de rotas está funcionando
    expect(screen.getByText('Página Inicial - Lista de Alunos')).toBeInTheDocument();
  });

  it('deve inicializar na rota correta', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText('Página Inicial - Lista de Alunos')).toBeInTheDocument();
  });
});