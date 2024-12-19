import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HelloWorld from "./pages/HelloWorld";
import Template from "./pages/Template";
import Page1 from "./pages/temp/Page1";
import Page2 from "./pages/temp/Page2";
import Page3 from "./pages/temp/Page3";
import Cart from "./pages/cart";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<HelloWorld />} />
            <Route path="/hello" element={<HelloWorld />} />
            <Route path="/hello/*" element={<HelloWorld />} />
            <Route path="/hello/:id" element={<HelloWorld />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/temp/" element={<Template />} >
                <Route index element={<Page1 />} />
                <Route path="1" element={<Page1 />} />
                <Route path="2" element={<Page2 />} />
                <Route path="3" element={<Page3 />} />
            </Route>
        </Routes>
    </BrowserRouter>
);