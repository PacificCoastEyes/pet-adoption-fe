import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import UserContextProvider from "../contexts/UserContext";
import Home from "./Home";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <UserContextProvider>
                    <Menu />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Home isAuthenticating isSigningUp={false}/>} />
                        <Route path="/signup" element={<Home isAuthenticating isSigningUp />} />
                    </Routes>
                </UserContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
