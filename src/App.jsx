import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Post from './pages/Post';
import Answer from './pages/Answer';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home2 />}></Route>
      <Route path="/list" element={<List />}></Route>
      <Route path="/post/:id" element={<Post />}></Route>
      <Route path="/post/:id/answer" element={<Answer />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
