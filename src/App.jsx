import { useEffect, useState } from "react"


function App() {
  const [advice, setAdvice] = useState({
    slip: {
      id: null,
      advice: '',
    }
  });
const [isLoading, setIsLoading] = useState(false);
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
  
  return (
    <>
      {isError && <div>Someting went wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <><div>{advice.slip.id}</div><div>&quot;{advice.slip.advice}&quot;</div></>
      )}
      <button onClick={handleClick}><img src="/src/assets/icon-dice.svg" alt="get Advice" /></button>
    </>
  )
}

export default App