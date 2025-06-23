import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import Homepage from "./pages/Homepage";
import Favourites from "./pages/Favourites";
import NavBar from "./components/NavBar";
import MovieDetails from "./pages/MovieDetails";
import { MovieProvider } from "./context/MovieContext";

function App() {
  return (
    <>
      <MovieProvider>
        <NavBar />
        <main className="main-page">
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/favourites" element={<Favourites />}></Route>
            <Route path="/movie/:id" element={<MovieDetails />}></Route>
          </Routes>
        </main>
      </MovieProvider>
    </>
  );
}

export default App;
