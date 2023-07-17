
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import PersistLogin from "./Components/PersistLogin/PersistLogin";
import UserConsole from "./Components/UserConsole/UserConsole";
import Home from "./Components/Home/Home";
import Error from "./Components/Error/Error";

function App() {
  
  return (
    <Routes>
      <Route  element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PersistLogin />}>
          <Route path="/" element={<UserConsole />} />
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
