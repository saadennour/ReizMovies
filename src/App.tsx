import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router";
import { useEffect } from "react";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./layouts/Layout";
import { Overview } from "./pages/Overview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/overview/:overviewId" element={<Overview />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
