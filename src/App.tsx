import { useState, useEffect } from 'react';
import './App.css';

type TDistillery = {
  name: string;
};

function App() {
  const [distilleries, setDistilleries] = useState<TDistillery[]>([]);

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/');
    const data = await res.json();

    setDistilleries(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (distilleries && distilleries.length === 0) {
    return <span>Nic nemam</span>;
  }

  return (
    <ul>
      {distilleries.map(({ name }, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
}

export default App;
