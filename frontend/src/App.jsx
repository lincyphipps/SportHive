import React, { useState } from 'react';
import { Box } from "@chakra-ui/react";
import {Route, Routes} from 'react-router-dom';

import CreateUserPage from "./pages/CreateUserPage";
import CreateMessageBoard from "./pages/CreateMessageBoard";
import showMessageBox from "./pages/CreateMessageBoard";
import setShowMessageBox from "./pages/CreateMessageBoard";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import CreateCommunity from "./pages/CreateCommunity";

function App() {
  const [showMessageBox, setShowMessageBox] = useState(false);

  return (
    <Box minH = {"100vh"}>
      <NavBar onChatClick={() => setShowMessageBox(!showMessageBox)} />

      <Routes>
        <Route path ="/" element={<HomePage/>}/>
        <Route path='/create' element={<CreateUserPage />} />
        <Route path='/create_community' element = {<CreateMessageBoard/>}/>
      </Routes>
      
      {/* Always rendered, but only visible when toggled */}
      <CreateMessageBoard
        showMessageBox={showMessageBox}
        setShowMessageBox={setShowMessageBox}
      />
    </Box>
  );
}

export default App
