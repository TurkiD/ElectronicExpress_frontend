import App from "./App"
import "./components/products/Products.css"
import "./index.css"

import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./toolkit/Store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>
)
