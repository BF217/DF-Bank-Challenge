import Account from "./Account.js";
import Statement from "./Statement.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const account = new Account(500); // optional overdraft, if no parameters, default value is 0. Overdraft can be set by manager upon account creation.

console.log("Welcome to your online bank account.");

function displayMenu() {
  console.log("--------------------------------------------");
  console.log("Please select an option from the menu below:");
  console.log("-------------------------------------------");
  console.log("1. View balance");
  console.log("2. Deposit money");
  console.log("3. Withdraw money");
  console.log("4. Print account statement");
  console.log("5. Exit");
  console.log("-------------------------------------------");

  rl.question("Enter your selection: ", (selection) => {
    switch (selection) {
      case "1":
        console.log(`Your balance is £${account.getBalance}`);
        console.log("-------------------------------------------");
        pressAnyKeyToContinue();
        break;
      case "2":
        rl.question("Enter the amount to deposit: ", (amount) => {
          account.addToBalance = parseFloat(amount);
          console.log(
            `You deposited £${amount}. Your new balance is £${account.getBalance}`
          );
          console.log("-------------------------------------------");
          pressAnyKeyToContinue();
        });
        break;
      case "3":
        rl.question("Enter the amount to withdraw: ", (amount) => {
          account.removeFromBalance = parseFloat(amount);
          console.log(`Your new balance is £${account.getBalance}`);
          console.log("-------------------------------------------");
          pressAnyKeyToContinue();
        });
        break;
      case "4":
        console.log("-------------------------------------------");
        Statement.print(account.getTransactionHistory);
        console.log("-------------------------------------------");
        setTimeout(() => pressAnyKeyToContinue(), 1000);
        break;
      case "5":
        console.log(
          "Thank you for using our online banking service.\nGoodbye!"
        );
        console.log("-------------------------------------------");
        rl.close();
        break;
      default:
        console.log("Invalid selection. Please enter a number from 1 to 5.");
        pressAnyKeyToContinue();
        break;
    }
  });
}

function pressAnyKeyToContinue() {
  console.log("\nPress any key to continue...");
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.once("data", () => {
    process.stdin.setRawMode(false);
    displayMenu();
  });
}

displayMenu();
