import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import NotFound2 from './pages/NotFound';
import Answer from './pages/Answer';
import Answer from './pages/Answer';

function App() {
  return (
    <Routes>
      <Route path="/list" element={<List />}></Route>
      <Route path="/" element={<Home2 />}></Route>
      <Route path="/list" element={<List />}></Route>
      <Route path="/post/:id" element={<Post />}></Route>
      <Route path="/post/:id/answer" element={<Answer />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
