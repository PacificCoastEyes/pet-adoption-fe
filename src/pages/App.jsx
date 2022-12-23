import "../styles/App.css";
import "../styles/bsWithOverrides.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import Home from "./Home";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
