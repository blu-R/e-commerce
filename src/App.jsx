import { HashRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { Home, Login, ProductDetails, ShopDetails, Purchases } from "./pages";
import { LoadingScreen, NavBar } from "./components";

import "./App.css";
import Container from "react-bootstrap/Container";

function App() {
    const isLoading = useSelector((state) => state.isLoading);

    return (
        <HashRouter>
            <NavBar />
            <Container>
                {isLoading && <LoadingScreen />}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/shop/:id" element={<ShopDetails />} />
                    <Route path="/purchases" element={<Purchases />} />
                </Routes>
            </Container>
        </HashRouter>
    );
}

export default App;
