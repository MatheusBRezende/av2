import axios from "axios";

const API_BASE_URL = "https://proweb.leoproti.com.br";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const alunosAPI = {
  getAll: () => api.get("/alunos"),

  getById: (id) => api.get(`/alunos/${id}`),

  create: (aluno) => api.post("/alunos", aluno),

  update: (id, aluno) => api.put(`/alunos/${id}`, aluno),

  delete: (id) => api.delete(`/alunos/${id}`),
};

export default api;
