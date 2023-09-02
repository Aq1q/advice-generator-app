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

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const json = await response.json();
        setAdvice(json);
      } catch {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  return (
    <>
      {isError && <div>Someting went wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <><div>{advice.slip.id}</div><div>&quot;{advice.slip.advice}&quot;</div></>
      )}
      
    </>
  )
}

export default App