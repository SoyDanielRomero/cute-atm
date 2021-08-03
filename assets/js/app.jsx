const Emoji = (props) => (
  <span
    id={props.id}
    className='emoji'
    role='img'
    aria-label={props.label ? props.label : ''}
    aria-hidden={props.label ? 'false' : 'true'}>
    {props.symbol}
  </span>
);

const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  event.preventDefault();
  return (
    <label className='label huge'>
      <input
        id='number-input'
        type='number'
        width='200'
        onChange={onChange}></input>
      <input
        type='submit'
        width='200'
        value='Submit'
        id='submit-input'
        disabled={!isValid}></input>
    </label>
  );
};

const hearts = [];

const Atm = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState(['', 'Deposit', 'Cash Back']);
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `❤️'s Balance ${totalState} `;

  const handleChange = (event) => {
    if (event.target.value <= 0) {
      setValidTransaction(false);
      alert(
        'When your Balance is 0 You have to Withdraw or Deposit more than 0'
      );
      event.target.value = 0;
      setValidTransaction(true);
    } else if (
      (document.getElementById('mode-select').value === 'Cash Back' &&
        event.target.value > totalState) ||
      (event.target.value > totalState &&
        document.getElementById('mode-select').value === 'Cash Back')
    ) {
      setValidTransaction(false);
      alert(
        'Your maximum Withdrawal is: ' +
          totalState +
          ' ' +
          heart +
          "'s You can't Withdraw more than what you have deposited"
      );
      event.target.value = totalState;
      setValidTransaction(true);
    } else {
      setDeposit(Number(event.target.value));
      setValidTransaction(true);
      event.preventDefault();
    }
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    let option = event.target.value;

    switch (option) {
      case 'Deposit':
        setAtmMode(setIsDeposit(true));
        break;
      case 'Cash Back':
        setAtmMode(setIsDeposit(false));
    }
  };
  const heart = '❤️';
  console.log(totalState);
  for (let i = 0; i < totalState; i++) {
    hearts.push(heart);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 id='total'>{status}</h2>
      <label>Select an action below to continue</label>
      <br />
      <select
        onChange={(e) => handleModeSelect(e)}
        name='mode'
        id='mode-select'>
        <option id='no-selection' value=''></option>
        <option id='deposit-selection' value='Deposit'>
          Deposit
        </option>
        <option id='cashback-selection' value='Cash Back'>
          Cash Back
        </option>
      </select>
      <br />
      {atmMode == null && (
        <ATMDeposit
          onChange={handleChange}
          isDeposit={isDeposit}
          isValid={validTransaction}></ATMDeposit>
      )}
    </form>
  );
};
const AtmLayout = () => {
  return (
    <>
      <header>
        <h1>Hearth's ATM</h1>
        <p>
          Welcome! <Emoji symbol='👋' label='hello' id='hi' /> This is a coding
          exercise
        </p>
      </header>
      <main>
        <section>
          <Emoji symbol='🏧' label='atm'></Emoji>
          <br />
          <Atm />
        </section>
      </main>
      <footer>
        Made with ❤️ by{' '}
        <a href='https://soydanielromero.github.io'>
          <img src='./assets/img/favicon.png' alt='Logo Daniel Romero'></img>
        </a>{' '}
        <a href='https://soydanielromero.github.io'>
          Daniel <strong>Romero</strong>
        </a>
      </footer>
    </>
  );
};

// =================================================
ReactDOM.render(<AtmLayout />, document.getElementById('root'));
