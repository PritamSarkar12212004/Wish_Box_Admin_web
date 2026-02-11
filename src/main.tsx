import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store/store'
import Wraper from "./components/layout/Wraper/Wraper";
import { Bounce, ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Wraper>
                <App />
            </Wraper>
        </BrowserRouter>
    </Provider>
);
