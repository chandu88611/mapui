import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Provider store={store}>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
