import { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { alunosAPI } from '../services/api';

export function AddStudent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nome: '',
    turma: '',
    curso: '',
    matricula: ''
  });

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
      await alunosAPI.create(formData);
      navigate('/');
    } catch (err) {
      setError('Erro ao criar aluno. Tente novamente.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Button 
        variant="outline-secondary" 
        className="mb-3"
        onClick={() => navigate('/')}
      >
        ← Voltar
      </Button>

      <Card>
        <Card.Header>
          <h3>Adicionar Novo Aluno</h3>
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
                    placeholder="Digite o nome do aluno"
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
                    placeholder="Número da matrícula"
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
                    placeholder="Ex: Engenharia, Medicina..."
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
                    placeholder="Ex: A, B, 101..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar Aluno'}
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/')}
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