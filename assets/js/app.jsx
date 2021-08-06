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
const diamond = '💎';

const Operation = (valid) => {
  event.preventDefault();
  return (
    <>
      <input id='number-input' type='number' width='200' defaultValue='1' />
      <input
        type='submit'
        value='Submit'
        id='submit-input'
        disabled={!valid}
        className='btn'
      />
    </>
  );
};

const Atm = () => {
  const [transaction, setTransaction] = React.useState(0);
  const [account, setAccount] = React.useState(0);
  const [operationType, setOperationType] = React.useState(true);
  const [valid, setValid] = React.useState(false);

  let accountStatus = `💎's Balance ${account}`;

  const handleChange = (formChangeEvent) => {
    // user input a value 0 or below
    if (Number(document.getElementById('number-input').value) <= 0) {
      alert("You can't make operations with value 0");
      document.getElementById('number-input').value = 1;
      setValid(true);
      document.getElementById('mode-select').options[0];
    } else if (
      Number(document.getElementById('number-input').value) > account &&
      !operationType
    ) {
      setValid(false);
      alert(
        'Your maximum Withdrawal is: one ' +
          account +
          ' ' +
          diamond +
          "'s You can't Withdraw more than what you have deposited"
      );
      document.getElementById('number-input').value = account;
      setValid(true);
    } else {
      setTransaction(Number(document.getElementById('number-input').value));
      setValid(true);
      formChangeEvent.preventDefault();
    }
  };

  const handleSubmit = (event) => {
    if (
      !operationType &&
      Number(document.getElementById('number-input').value) > account
    ) {
      setValid(false);
      alert(
        'Your maximum Withdrawal is: two ' +
          account +
          ' ' +
          diamond +
          "'s You can't Withdraw more than what you have deposited"
      );
      document.getElementById('number-input').value = Number(account);
      setTransaction(Number(account));
      setValid(true);
    } else {
      let newAccountBalance = operationType
        ? account + transaction
        : account - transaction;
      setAccount(Number(newAccountBalance));
      if (newAccountBalance === 0) {
        window.location.reload();
      }
    }

    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    let option = event.target.value;

    switch (option) {
      case 'Deposit':
        setOperationType(true);
        break;
      case 'Cash Back':
        setOperationType(false);

        break;
    }
  };

  return (
    <>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        {/*account total*/}
        <h2>{accountStatus}</h2>
        <label>Select an action below to continue</label>
        <br />
        <select
          onChange={(e) => handleModeSelect(e)}
          name='mode'
          id='mode-select'>
          <option
            id='deposit-selection'
            value='Deposit'
            defaultValue='selected'>
            Deposit
          </option>
          <option id='cashback-selection' value='Cash Back'>
            Cash Back
          </option>
        </select>
        <br />
        <Operation operation={operationType} valid={valid}></Operation>
      </form>
    </>
  );
};

const AtmLayout = () => {
  return (
    <>
      <header>
        <h1>{'💎'}'s ATM</h1>
        <p>
          Welcome! <Emoji symbol='👋' label='hello' id='hi' /> This is a coding
          exercise
        </p>
      </header>
      <main>
        <section>
          <Emoji symbol='🏧' label='atm'></Emoji>
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
