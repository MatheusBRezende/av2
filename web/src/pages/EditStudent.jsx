import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { alunosAPI } from '../services/api';

export function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nome: '',
    turma: '',
    curso: '',
    matricula: ''
  });

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const response = await alunosAPI.getById(id);
        setStudent(response.data);
        setFormData({
          nome: response.data.nome,
          turma: response.data.turma,
          curso: response.data.curso,
          matricula: response.data.matricula
        });
      } catch (err) {
        setError('Erro ao carregar dados do aluno.');
        console.error('Erro:', err);
      }
    };

    if (id) {
      loadStudent();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await alunosAPI.update(id, formData);
      navigate(`/student/${id}`);
    } catch (err) {
      setError('Erro ao atualizar aluno. Tente novamente.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!student) {
    return (
      <Container className="d-flex justify-content-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <Button 
        variant="outline-secondary" 
        className="mb-3"
        onClick={() => navigate(`/student/${id}`)}
      >
        ← Voltar
      </Button>

      <Card>
        <Card.Header>
          <h3>Editar Aluno - {student.nome}</h3>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome completo *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Matrícula *</Form.Label>
                  <Form.Control
                    type="text"
                    name="matricula"
                    value={formData.matricula}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Curso *</Form.Label>
                  <Form.Control
                    type="text"
                    name="curso"
                    value={formData.curso}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Turma *</Form.Label>
                  <Form.Control
                    type="text"
                    name="turma"
                    value={formData.turma}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button 
                variant="warning" 
                type="submit" 
                disabled={loading}
              >
                {loading ? 'Atualizando...' : 'Atualizar Aluno'}
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate(`/student/${id}`)}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}