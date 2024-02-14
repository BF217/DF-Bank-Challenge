import Account from "../../dist/Account.js";

xdescribe("tests related to account balance:", () => {
  let testAccount;
  let consoleSpy;

  beforeEach(() => {
    testAccount = new Account();
    consoleSpy = spyOn(console, "log");
  });

  // User story 1

  it("getBalance should return the correct balance of the account", () => {
    expect(testAccount.getBalance).toBe(0);
  });

  it("balance should not be able to be directly accessed without the getter method", () => {
    expect(testAccount.balance).toBe(undefined);
  });

  it("getBalance should return a negative number if the account is overdrawn", () => {
    spyOnProperty(testAccount, "getBalance", "get").and.returnValue(-100); // As a setter has not been defined yet, used a spy object to set the balance to a negative number for testing purposes.
    expect(testAccount.getBalance).toBe(-100);
  });

  // User story 2

  it("addToBalance should increase the balance by the specified amount", () => {
    testAccount.addToBalance = 100;
    expect(testAccount.getBalance).toBe(100);
  });

  it("addToBalance should not overwrite the current balance to be the inputted amount", () => {
    testAccount.addToBalance = 100;
    testAccount.addToBalance = 50;
    expect(testAccount.getBalance).toBe(150);
  });

  it("if called multiple times, addToBalance should correctly increase the balance by the right amount each time.", () => {
    testAccount.addToBalance = 100;
    testAccount.addToBalance = 50;
    testAccount.addToBalance = 25;
    testAccount.addToBalance = 0;
    expect(testAccount.getBalance).toBe(175);
  });

  it("addToBalance should throw an error if a negative number is entered", () => {
    expect(() => {
      testAccount.addToBalance = -100;
    }).toThrowError("input cannot be negative");
  });

  it("addToBalance should throw an error if the input isn't a number", () => {
    expect(() => {
      testAccount.addToBalance = "hello";
    }).toThrowError("input must be a number");
  });

  // User story 3

  it("removeFromBalance should reduce the balance by the specified amount", () => {
    testAccount.addToBalance = 100;
    testAccount.removeFromBalance = 50;
    expect(testAccount.getBalance).toBe(50);
  });

  it("removeFromBalance should not overwrite the current balance to be the inputted amount", () => {
    testAccount.addToBalance = 100;
    testAccount.removeFromBalance = 50;
    testAccount.removeFromBalance = 25;
    expect(testAccount.getBalance).toBe(25);
  });

  it("removeFromBalance should throw an error if a negative number is entered", () => {
    expect(() => {
      testAccount.removeFromBalance = -100;
    }).toThrowError("input cannot be negative");
  });

  it("removeFromBalance should throw an error if the input isn't a number", () => {
    expect(() => {
      testAccount.removeFromBalance = "hello";
    }).toThrowError("input must be a number");
  });

  // User story 4

  it("hasSufficientFunds() should return true if the amount in removeFromBalance is lower than or equal to the amount in balance", () => {
    testAccount.addToBalance = 100;
    expect(testAccount.hasSufficientFunds(100)).toBe(true);
    expect(testAccount.hasSufficientFunds(50)).toBe(true);
  });

  it("if hasSufficientFunds() returns false, removeFromBalance should return a message telling the user they cannot withdraw", () => {
    testAccount.addToBalance = 10;
    testAccount.removeFromBalance = 20;
    expect(consoleSpy).toHaveBeenCalledWith("insufficient funds.");
  });

  it("removeFromBalance should only alter the balance if hasSufficientFunds() returns true", () => {
    testAccount.addToBalance = 100;
    testAccount.removeFromBalance = 50;
    expect(testAccount.getBalance).toBe(50);
    testAccount.removeFromBalance = 100;
    expect(consoleSpy).toHaveBeenCalledWith("insufficient funds.");
    expect(testAccount.getBalance).toBe(50);
  });
});

xdescribe("tests related to account transactions data:", () => {
  let testAccount;

  beforeEach(() => {
    testAccount = new Account();
  });

  it("getTransactionHistory should return a copy of the array only, not the original.", () => {
    const originalArray = testAccount.getTransactionHistory; // technically not the original, however, it serves to show if one is modified without affecting the other that they return copies and not references to the original.
    const copiedArray = testAccount.getTransactionHistory;

    copiedArray.push({
      date: "01/01/2020",
      type: "deposit",
      amount: 10,
      balance: 10,
    });

    expect(copiedArray).not.toEqual(originalArray);
  });

  it("addToBalance should add to transactionHistory[] if succesfully called with recordTransaction.", () => {
    testAccount.addToBalance = 100;
    testAccount.addToBalance = 50;
    expect(testAccount.getTransactionHistory.length).toBe(2);
  });

  it("removeFromBalance should add to transactionHistory[] if successfully called with recordTransaction.", () => {
    testAccount.addToBalance = 100;
    testAccount.removeFromBalance = 50;
    expect(testAccount.getTransactionHistory.length).toBe(2);
  });

  it("only getTransactionHistory should be able to access transactionHistory.", () => {
    expect(testAccount.transactionHistory).toBe(undefined);
  });
});

// previous tests skipped as they were before I added legacy data to the account class. All functional if balance is reset to 0.

describe("tests related to arranged overdraft:", () => {
  let testAccount;
  let testAccount2;
  let consoleSpy;

  beforeEach(() => {
    testAccount = new Account(500);
    testAccount2 = new Account();
    consoleSpy = spyOn(console, "log");
  });

  it("Balance should not be able to go below arranged overdraft.", () => {
    testAccount.removeFromBalance = 2600;
    expect(testAccount.getBalance).toBe(-100);
  });

  it("removeFromBalance should check if overdraft is available before going below 0.", () => {
    testAccount.removeFromBalance = 2600;
    expect(testAccount.getBalance).toBe(-100);
    testAccount2.removeFromBalance = 2600;
    expect(testAccount2.getBalance).toBe(2500);
    expect(consoleSpy).toHaveBeenCalledWith("insufficient funds.");
  });

  it("If balance is 0 and overdraft is available, removeFromBalance should allow withdrawal up to overdraft limit", () => {
    testAccount.removeFromBalance = 2500;
    expect(testAccount.getBalance).toBe(0);
    testAccount.removeFromBalance = 100;
    expect(testAccount.getBalance).toBe(-100);
  });

  it("If balance is 0 and overdraft is not available or has been exhausted, removeFromBalance should not allow withdrawal.", () => {
    testAccount.removeFromBalance = 3000;
    expect(testAccount.getBalance).toBe(-500);
    testAccount.removeFromBalance = 100;
    expect(testAccount.getBalance).toBe(-500);
    expect(consoleSpy).toHaveBeenCalledWith("insufficient funds.");
    testAccount2.removeFromBalance = 2600;
    expect(testAccount2.getBalance).toBe(2500);
    expect(consoleSpy).toHaveBeenCalledWith("insufficient funds.");
  });
});
