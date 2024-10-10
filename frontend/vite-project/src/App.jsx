import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";

function App() {

  return (
    <Box minH={"100vh"} >
       {/* // Navbar goes above the routes because we want to make it appear on all pages  */}
      <Navbar/> 
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
      </Routes>
    </Box>
  );
}

export default App
