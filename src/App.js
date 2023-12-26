import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => navigate('/characters')}>Karakter listesine git</button>
    </div>
  )
}

export default App;
