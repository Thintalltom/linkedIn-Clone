import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LinkedUserData } from './Context/ContextApp.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LinkedUserData>
    <App />
  </LinkedUserData>
)
