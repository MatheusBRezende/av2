import { useEffect, useState } from "react";
import { Container, ListGroup, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { alunosAPI } from "../services/api";

export function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await alunosAPI.getAll();
      setStudents(response.data);
      setError("");
    } catch (err) {
      setError("Erro ao carregar alunos");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await alunosAPI.delete(id);
        loadStudents();
      } catch (err) {
        setError("Erro ao excluir aluno");
        console.error("Erro:", err);
      }
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  if (loading)
    return (
      <Container className="d-flex justify-content-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <span style={{ marginLeft: "10px" }}>Carregando alunos...</span>
      </Container>
    );
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 data-testid="page-title">Lista de Alunos</h1>
        <Button
          as={Link}
          to="/student/new"
          variant="primary"
          data-testid="new-student-btn"
        >
          Novo Aluno
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <ListGroup>
        {students.map((student) => (
          <ListGroup.Item
            key={student.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <Link
                to={`/student/${student.id}`}
                className="text-decoration-none"
              >
                <h5 className="mb-1">{student.nome}</h5>
              </Link>
              <p className="mb-1 text-muted">
                {student.curso} - {student.turma}
              </p>
              <small>Matrícula: {student.matricula}</small>
            </div>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDelete(student.id)}
            >
              Excluir
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {students.length === 0 && !loading && (
        <Alert variant="info" className="mt-3">
          Nenhum aluno cadastrado.
        </Alert>
      )}
    </Container>
  );
}
