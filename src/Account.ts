class Account {
  #balance: number;
  #transactionHistory: object[];
  #overdraft: number;

  constructor(overdraft: number = 0) {
    this.#overdraft = overdraft;
    this.#balance = 2500;
    this.#transactionHistory = [
      { Date: "10/01/2012", Type: "Deposit", Amount: 1000, Balance: 1000 },
      { Date: "13/01/2012", Type: "Deposit", Amount: 2000, Balance: 3000 },
      { Date: "14/01/2012", Type: "Withdrawal", Amount: 500, Balance: 2500 },
    ];
  }

  get getBalance() {
    return this.#balance;
  }

  get getTransactionHistory() {
    const bankStatement = [...this.#transactionHistory];
    return bankStatement;
  }

  set addToBalance(amount: number) {
    this.validateAmount(amount);
    this.#balance += amount;
    this.#recordTransaction("Deposit", amount);
  }

  set removeFromBalance(amount: number) {
    this.validateAmount(amount);
    if (this.hasSufficientFunds(amount)) {
      this.#balance -= amount;
      console.log(`You succesfully withdrew £${amount}`);
      this.#recordTransaction("Withdrawal", amount);
    }
  }

  validateAmount(amount: number) {
    if (amount < 0) {
      throw new Error("input cannot be negative");
    }
    if (typeof amount !== "number") {
      throw new Error("input must be a number");
    } else {
      return true;
    }
  }

  hasSufficientFunds(amount: number) {
    if (this.#balance - amount < -this.#overdraft) {
      console.log("insufficient funds.");
    } else {
      return true;
    }
  }

  #recordTransaction(type: string, amount: number) {
    const transaction = {
      Date: new Date().toLocaleDateString("en-GB"),
      Type: type,
      Amount: amount,
      Balance: this.#balance,
    };
    this.#transactionHistory.push(transaction);
  }
}

export default Account;
