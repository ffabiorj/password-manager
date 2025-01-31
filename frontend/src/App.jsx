import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ItemList from './ItemList';
import EditItem from './EditItem';
import Register from './Register';
import Home from './Home';
import PasswordResetRequest from './PasswordResetRequest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/items' element={<ItemList />} />
        <Route path='/edit/:id' element={<EditItem />} />
        <Route path='/password-reset' element={<PasswordResetRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
