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
import SearchCommunities from './pages/SearchCommunities';
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Box minH = {"100vh"}>
      <NavBar onChatClick={() => setShowMessageBox(!showMessageBox)} 
        isLoggedIn={isLoggedIn}/>
      
      <Routes>
        <Route path ="/" element={<HomePage/>}/>
        <Route path='/create' element={<CreateUserPage/>} />
        <Route path='/create_community' element = {<CreateCommunity isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path ="/join_community" element={<SearchCommunities/>}/>
        <Route path='/login' element ={<Login setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path='/profile' element ={<Profile />}/>

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
