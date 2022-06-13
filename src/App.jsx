import { HashRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { Home, Login, ProductDetails, Purchases, SignIn, User } from "./pages";
import { Footer, LoadingScreen, NavBar, ProtectedRoutes } from "./components";

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
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />

                    <Route element={<ProtectedRoutes />}>
                        <Route path="/purchases" element={<Purchases />} />
                        <Route path="/user" element={<User />} />
                    </Route>
                </Routes>
            </Container>
            <Footer />
        </HashRouter>
    );
}

export default App;
