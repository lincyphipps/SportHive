import { Box } from "@chakra-ui/react";
import {Route, Routes} from 'react-router-dom';

import CreateUserPage from "./pages/CreateUserPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";


function App() {

  return (
    <Box minH = {"100vh"}>
      <NavBar />
      <Routes>
        <Route path ="/" element={<HomePage/>}/>
        <Route path='/create' element={<CreateUserPage />} />
      </Routes>
    </Box>
    
  );
}

export default App
