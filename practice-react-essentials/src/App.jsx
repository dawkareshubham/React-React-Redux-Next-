import { useState } from "react";
import Header from "./components/Header"
import UserInputs from "./components/UserInputs"
import ResultsTable from "./components/ResultsTable";

function App() {

  const [investmentData, setInvestmentData] = useState({
    initialInvestment: 1000,
    annualInvestment: 10000,
    expectedReturn: 3,
    duration: 5
  });

  const inputIsValid = investmentData.duration >= 1;

  function handleInvestmentDataChange(inputId, inputValue) {
    setInvestmentData(prevInvestmentData => ({
      ...prevInvestmentData,
      [inputId]: Number(inputValue)
    }));    
  }

  return (
    <div>
      <Header />
      <UserInputs onInvestmentDataChange={handleInvestmentDataChange} investmentData={investmentData}/>
      {!inputIsValid && <p className="center">Duration should be at least 1 year.</p>}
      {inputIsValid && <ResultsTable investmentData={investmentData}/>}
    </div>
  )
}

export default App
