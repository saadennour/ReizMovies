import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./layouts/Layout";
import { Overview } from "./pages/Overview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/overview/:overviewId" element={<Overview />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
