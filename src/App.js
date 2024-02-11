import { useState } from "react";

// Problem : when tried to change the array of tips inside the setTip
// React thought that nothing has changed because the same array has been passed
// therefor rerendering does not take place.

// Solution: use the spread opertor to get the copy of the tip array and then pass it 
// to the setTip. Then React will confirm that state of the tip has been changed.

// reference : https://stackoverflow.com/questions/56266575/why-is-usestate-not-triggering-re-render

function App() {
  const [amount, setamount] = useState(0);
  const [tip, setTip] = useState([0, 0]);
  const totol_tip = tip.reduce((sum, cur) => sum + cur, 0);
  const bill = amount + totol_tip;

  const selectOptions = [
    { val: 0, review: "Dissatisfied" },
    { val: 5, review: "It was okay" },
    { val: 10, review: "It was good" },
    { val: 20, review: "Absolutely Amazing" },
  ];

  function handleamount(amount) {
    setamount(+amount);
  }

  function handleTip(tipPercent, tipIndex) {
    const tempTip = [...tip];
    tempTip[tipIndex] = Math.round((+tipPercent / 100) * amount);
    setTip(tempTip);
  }

  return (
    <div>
      <TipInput
        name={"amount"}
        type={"text"}
        selectOptions={null}
        handleChange={handleamount}
      >
        How much was the amount?
      </TipInput>
      <br></br>
      <TipInput
        name={"service"}
        type={"select"}
        tipIndex={0}
        selectOptions={selectOptions}
        handleChange={handleTip}
      >
        How did you like the service?
      </TipInput>
      <br></br>
      <TipInput
        name={"service"}
        type={"select"}
        tipIndex={1}
        selectOptions={selectOptions}
        handleChange={handleTip}
      >
        How did your friend like the service?
      </TipInput>
      <h2>
        <Bill>
          You pay ${bill} (${amount} + ${totol_tip})
        </Bill>
      </h2>
    </div>
  );
}

function TipInput({
  type,
  name,
  selectOptions,
  handleChange,
  tipIndex,
  children,
}) {
  return (
    <>
      {type === "select" ? (
        <>
          <label htmlFor={name}>{children}</label>
          <select
            className="select"
            name={name}
            onChange={(e) =>
              handleChange(
                e.target.options[e.target.options.selectedIndex].value,
                tipIndex
              )
            }
          >
            {selectOptions?.map((option, i) => (
              <option value={option.val} key={i}>
                {option.review} ({option.val}%)
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <label htmlFor={name}>{children}</label>
          <input
            type={type}
            name={name}
            onChange={(e) => handleChange(e.target.value)}
            autoComplete="off"
          />
        </>
      )}
    </>
  );
}

function Bill({ children }) {
  return <p className="amount">{children}</p>;
}

export default App;
