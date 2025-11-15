import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { StudentDetail } from './pages/StudentDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/student/new" element={<h1>Formulário Novo Aluno (Implementar)</h1>} />
        <Route path="/student/edit/:id" element={<h1>Formulário Editar Aluno (Implementar)</h1>} />
      </Routes>
    </Router>
  );
}

export default App;