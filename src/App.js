import Header from "./components/Header";
import CalculatorInputForm from "./components/CalculatorInputForm";
import InvestmentResults from "./components/InvestmentResults";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInputs) => {
    setUserInput(userInputs);
  };
  const yearlyData = []; // per-year results

  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <CalculatorInputForm onCalculate={calculateHandler} />

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}

      {!userInput && (
        <p style={{ textAlign: "center" }}>No investment calculated yet</p>
      )}
      {userInput && (
        <InvestmentResults
          data={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;
