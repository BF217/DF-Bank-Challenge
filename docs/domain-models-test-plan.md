# Domain Models and Test Plan

---

## User Story 1

As a user, I would like to be able to view my current account balance, so that I can make informed decisions about any future payments.

## Domain Model

| Object  | Properties              | Messages     | Output |
| ------- | ----------------------- | ------------ | ------ |
| Account | private balance: Number | getBalance() | void   |

## Test Cases

1. getBalance should return the correct balance.
2. Balance should not be able to be directly accessed without getter method.
3. getBalance should return a negative number if the account is overdrawn.

---

## User Story 2

As a user, I would like to be able to deposit funds, so that I can increase my account balance easily.

## Domain Model

| Object  | Properties              | Messages              | Output |
| ------- | ----------------------- | --------------------- | ------ |
| Account | private balance: number | addToBalance : number | void   |

## Test Cases

1. addToBalance should increase the balance by the specified amount.
2. addToBalance should not overwrite the current balance to be the inputted amount.
3. if called multiple times, addToBalance should correctly increase the balance by the right amount each time.
4. addToBalance should throw an error if a negative number is entered.
5. addToBalance should throw an error if the input isn't a number.

---

## User Story 3

As a user, I would like to be able to withdraw funds from my account, so that I can manage my finances more conveniently.

## Domain Model

| Object  | Properties              | Messages                  | Output |
| ------- | ----------------------- | ------------------------- | ------ |
| Account | private balance: number | removeFromBalance: number | void   |

## Test Cases

1. removeFromBalance should reduce the balance by the specified amount.
2. removeFromBalance should not overwrite the current balance to be the inputted amount.
3. If called multiple times, removeFromBalance should correctly reduce the balance by the correct amount each time.
4. removeFromBalance should throw an error if a negative number is entered.
5. removeFromBalance should throw an error if the input isn't a number.

---

## User Story 4

As a user, I should not be able to withdraw funds if my balance is insufficient, so that I can avoid accidentally going into debt or receiving any financial penalties.

## Domain Model

| Object  | Properties              | Messages                      | Output  |
| ------- | ----------------------- | ----------------------------- | ------- |
| Account | private balance: number | removeFromBalance: number     | void    |
|         |                         | hasSufficientFunds() : number | Boolean |

## Test Cases

1. hasSufficientFunds() should return true if the amount in removeFromBalance is lower than or equal to the amount in balance.
2. if hasSufficientFunds() returns false, removeFromBalance should return a message telling the user they cannot withdraw.
3. removeFromBalance should only alter the balance if hasSufficientFunds() returns true.

---

## User Story 5

As a user, I would like to be able to print an account statement that includes the dates, amount and balance, so that I can have a detailed record of my account activities that I can use to manage my finances.

## Domain Model

| Object    | Properties                                                | Messages                                             | Output |
| --------- | --------------------------------------------------------- | ---------------------------------------------------- | ------ |
| Statement |                                                           | static printStatement(account.getTransactionHistory) | void   |
| Account   | private transactionHistory[transactions: object] : object | getTransactionHistory                                | void   |
|           |                                                           | private recordTransaction(type, amount) : object     | void   |

## Test Cases

1. printStatement() should accurately reflect format in the requirements. - visual test
2. getTransactionHistory should return a copy of the array only, not the original.
3. addToBalance should add to transactionHistory[] if succesfully called with recordTransaction.
4. removeFromBalance should add to transactionHistory[] if successfully called with recordTransaction.
5. only getTransactionHistory should be able to access transactionHistory.
6. printStatement() should return a formatted string with the correct values.

## User Story 6

As a user, I would like to see my account statement formatted as green for positive balance and red for a negative balance, so that I can have a greater understanding of the trends in my finances.

## AI assistance

I asked how to implement this to copilot who responded with the following refactored code using chalk npm package:

```
import chalk from 'chalk';

class Statement {
  static print(Statement: Transaction[]) {
    console.log("date       || credit  || debit   || balance");
    Statement.reverse().forEach((transaction) => {
      const credit =
        transaction.Type === "Deposit" ? transaction.Amount.toFixed(2) : "";
      const debit =
        transaction.Type === "Withdrawal" ? transaction.Amount.toFixed(2) : "";
      const formattedCredit = credit ? chalk.green(credit.padStart(7)) : credit.padStart(7);
      const formattedDebit = debit ? chalk.red(debit.padStart(7)) : debit.padStart(7);
      const formattedBalance = transaction.Balance >= 0 ? chalk.green(transaction.Balance.toFixed(2)) : chalk.red(transaction.Balance.toFixed(2));
      console.log(
        `${transaction.Date} || ${formattedCredit} || ${formattedDebit} || ${formattedBalance}`
      );
    });
  }
}

export default Statement;
```

This worked first time upon running my code.

## Test Cases

1. Visual check if output is green when positive or red if negative in console when calling Statement.print().

---

## User Story 7

As a bank manager, I would like to have the option of setting up an arranged overdraft when opening a new account, for the purpose of offering credit services to clients so that the bank can earn additional revenue from interest rates and fees.

## Domain Model

| Object  | Property                  | Messages                                               | Output |
| ------- | ------------------------- | ------------------------------------------------------ | ------ |
| Account | private overdraft: number | optional constructor method, amount set in constructor | void   |
|         |                           | removeFromBalance                                      | void   |

## Test Cases (ALL SUGGESTED BY COPILOT)

1. Balance should not be able to go below arranged overdraft.
2. removeFromBalance should check if overdraft is available before going below 0.
3. If balance is 0 and overdraft is available, removeFromBalance should allow withdrawal up to overdraft limit.
4. If balance is 0 and overdraft is not available or has been exhausted, removeFromBalance should not allow withdrawal.

---
