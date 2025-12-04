export default function UserInputs({ onInvestmentDataChange, investmentData }) {

  function getInputGroup(labelText, inputId, inputValue) {
    return (
      <p>
        <label htmlFor={inputId}>{labelText}</label>
        <input
          type="number"
          id={inputId}
          value={inputValue}
          onChange={(event) => onInvestmentDataChange(inputId, event.target.value)}
        />
      </p>
    )
  }

  return (
    <section id="user-input">
      <div className="input-group">
        {getInputGroup('INITIAL INVESTMENT', 'initialInvestment', investmentData.initialInvestment)}
        {getInputGroup('ANNUAL INVESTMENT', 'annualInvestment', investmentData.annualInvestment)}
      </div>
      <div className="input-group">
        {getInputGroup('EXPECTED RETURN', 'expectedReturn', investmentData.expectedReturn)}
        {getInputGroup('DURATION', 'duration', investmentData.duration)}
      </div>
    </section>
  )
}
