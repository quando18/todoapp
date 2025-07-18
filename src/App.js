import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Todo from './pages/todo';

function Home() {
  return <h1>Trang chủ</h1>;
}

function About() {
  return <h1>Giới thiệu</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '20px' }}>
        <Link to="/" style={{ marginRight: '20px' }}>Trang chủ</Link>
        <Link to="/about" style={{ marginRight: '20px' }}>Giới thiệu</Link>
        <Link to="/todo">Todo</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
