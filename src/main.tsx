import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HelloWorld from "./pages/HelloWorld";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<HelloWorld />} />
            <Route path="/hello" element={<HelloWorld />} />
            <Route path="/hello/*" element={<HelloWorld />} />
            <Route path="/hello/:id" element={<HelloWorld />} />
        </Routes>
    </BrowserRouter>
);