import { useEffect, useState } from "react"
import './App.scss'

function App() {
  const [advice, setAdvice] = useState({
    slip: {
      id: null,
      advice: '',
    }
  });
const [isLoading, setIsLoading] = useState(true);
const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await fetch('https://api.adviceslip.com/advice', 
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
      });
      
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const json = await response.json();
      setAdvice(json);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleClick = () => {
    fetchData();
  };
  
  return <>
    <div id="container">
      {isError && <div>Someting went wrong...</div>}
      {!isLoading ? (
        <>
          <div className="advice-id">ADVICE #{advice.slip.id}</div>
          <div className="advice-text">&quot;{advice.slip.advice}&quot;</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
      <div className="divider"></div>
      <button className="fetch-button" onClick={handleClick}><img src="/src/assets/icon-dice.svg" alt="get Advice" /></button>
    </div>
  </>;
}

export default App