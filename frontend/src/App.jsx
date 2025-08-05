import './App.css'

import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(json => setData(JSON.stringify(json, null, 2)));
  }, []);

  return (
    <div>
      <h1>Frontend React funcionando 🚀</h1>
      <pre>{data}</pre>
    </div>
  );
}

export default App;
