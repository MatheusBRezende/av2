import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { StudentDetail } from './pages/StudentDetail';
import { AddStudent } from './pages/AddStudent';
import { EditStudent } from './pages/EditStudent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/student/new" element={<AddStudent />} />
        <Route path="/student/edit/:id" element={<EditStudent />} />
      </Routes>
    </Router>
  );
}

export default App;