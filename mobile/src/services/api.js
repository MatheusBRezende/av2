import axios from 'axios';

const API_BASE_URL = 'https://proweb.leoproti.com.br';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const alunosAPI = {
  // GET /alunos - Lista todos os alunos
  getAll: async () => {
    try {
      const response = await api.get('/alunos');
      return response;
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      throw error;
    }
  },
  
  // GET /alunos/{id} - Busca aluno por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/alunos/${id}`);
      return response;
    } catch (error) {
      console.error(`Erro ao buscar aluno ${id}:`, error);
      throw error;
    }
  },
  
  // POST /alunos - Cria novo aluno
  create: async (aluno) => {
    try {
      const response = await api.post('/alunos', aluno);
      return response;
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      throw error;
    }
  },
  
  // PUT /alunos/{id} - Atualiza aluno
  update: async (id, aluno) => {
    try {
      const response = await api.put(`/alunos/${id}`, aluno);
      return response;
    } catch (error) {
      console.error(`Erro ao atualizar aluno ${id}:`, error);
      throw error;
    }
  },
  
  // DELETE /alunos/{id} - Remove aluno
  delete: async (id) => {
    try {
      const response = await api.delete(`/alunos/${id}`);
      return response;
    } catch (error) {
      console.error(`Erro ao deletar aluno ${id}:`, error);
      throw error;
    }
  },
};

export default api;