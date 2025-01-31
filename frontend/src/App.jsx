import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ItemList from './ItemList';
import EditItem from './EditItem';
import Register from './Register';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/items' element={<ItemList />} />
        <Route path='/edit/:id' element={<EditItem />} />
      </Routes>
    </Router>
  );
}

export default App;
