import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { alunosAPI } from "../services/api";

export function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudent = async () => {
    try {
      setLoading(true);
      const response = await alunosAPI.getById(id);
      setStudent(response.data);
      setError("");
    } catch (err) {
      setError("Erro ao carregar dados do aluno");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await alunosAPI.delete(id);
        navigate("/");
      } catch (err) {
        setError("Erro ao excluir aluno");
        console.error("Erro:", err);
      }
    }
  };

  useEffect(() => {
    if (id) {
      loadStudent();
    }
  }, [id]);

  if (loading)
    return (
      <Container className="d-flex justify-content-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <span style={{ marginLeft: "10px" }}>Carregando...</span>
      </Container>
    );

  if (error)
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
        <Button as={Link} to="/" variant="primary">
          Voltar
        </Button>
      </Container>
    );

  return (
    <Container>
      <Button as={Link} to="/" variant="outline-secondary" className="mb-3">
        ← Voltar
      </Button>

      {student && (
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0" data-testid="student-name">
              {student.nome}
            </h3>
            <Badge bg="primary" data-testid="student-id">
              ID: {student.id}
            </Badge>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p>
                  <strong>Matrícula:</strong> {student.matricula}
                </p>
                <p>
                  <strong>Curso:</strong> {student.curso}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Turma:</strong> {student.turma}
                </p>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="d-flex gap-2">
            <Button
              as={Link}
              to={`/student/edit/${student.id}`}
              variant="warning"
            >
              Editar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Excluir
            </Button>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
}
