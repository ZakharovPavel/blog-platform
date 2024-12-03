import { createRoot } from 'react-dom/client';
import 'normalize.css/normalize.css';
// import './index.css';
import './index.scss';
import App from './app/App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
