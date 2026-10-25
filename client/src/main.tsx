import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import NotFound from "./pages/not-found";
import "./index.css";

const root = document.getElementById('root')!;
const page = root.dataset.page === '404' ? <NotFound /> : <App />;
if (root.hasChildNodes()) hydrateRoot(root, page);
else createRoot(root).render(page);
