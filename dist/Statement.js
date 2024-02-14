import chalk from "chalk";
import fs from "fs";
class Statement {
    static print(Statement) {
        console.log("date       || credit  || debit   || balance");
        let output = "date       || credit  || debit   || balance\n";
        Statement.reverse().forEach((transaction) => {
            const credit = transaction.Type === "Deposit" ? transaction.Amount.toFixed(2) : "";
            const debit = transaction.Type === "Withdrawal" ? transaction.Amount.toFixed(2) : "";
            const formattedCredit = credit
                ? chalk.green(credit.padStart(7))
                : credit.padStart(7);
            const formattedDebit = debit
                ? chalk.red(debit.padStart(7))
                : debit.padStart(7);
            const formattedBalance = transaction.Balance >= 0
                ? chalk.green(transaction.Balance.toFixed(2))
                : chalk.red(transaction.Balance.toFixed(2));
            console.log(`${transaction.Date} || ${formattedCredit} || ${formattedDebit} || ${formattedBalance}`);
            output += `${transaction.Date} || ${credit.padStart(7)} || ${debit.padStart(7)} || ${transaction.Balance.toFixed(2)}\n`; // eslint forces my code to look like this, im sorry that its hard to read
        });
        fs.writeFile("docs/statement.txt", output, (err) => {
            if (err)
                throw err;
            console.log("A copy of your statement has been printed.");
        });
    }
}
export default Statement;
