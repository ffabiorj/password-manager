import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ItemList from "./ItemList";
import EditItem from "./EditItem";
import Register from "./Register";
import Home from "./Home";
import CreateItem from "./CreateItem";
import PasswordResetRequest from "./PasswordResetRequest";
import PasswordResetConfirm from "./PasswordResetConfirm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/passwords" element={<ItemList />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
        <Route path="/reset-password" element={<PasswordResetRequest />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<PasswordResetConfirm />}
        />
      </Routes>
    </Router>
  );
}

export default App;
