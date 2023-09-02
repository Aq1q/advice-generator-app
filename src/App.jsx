import { useEffect, useState } from "react"


function App() {
  const [advice, setAdvice] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
    const response = await fetch('https://api.adviceslip.com/advice');
    const json = await response.json();
    setAdvice(json);
    };
    fetchData();
  }, []);
  
  return (
    <>
     <div>{advice.slip.id}</div>    
     <div>{advice.slip.advice}</div>
    </>
  )
}

export default App
