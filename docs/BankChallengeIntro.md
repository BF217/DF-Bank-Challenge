# Bank Challenge

---

## Overview

I have been asked to develop software for the purpose of accessing and managing a bank account for users to to interact with their personal finances as well as for bank managers to be able to create accounts with an optional overdraft facility.

The software has been developed with the following features:

A user should be able to interact with the application via a REPL interface to:

- Access an account (assuming each user will automatically have their details loaded into the program on startup)
- Deposit funds
- Withdraw funds - if they have sufficient balance to do so
- Print an account statement (date, amount, balance).
- The output of the statement should be formatted so credits and positive balances appear in green text, debits and negative balances appear in red text
- An overdraft facility can be added to the account, so that if a withdrawal is attempted which would result in a negative balance, the withdrawal is allowed up to the value of the overdraft only
- This overdraft should be configurable on a per-account basis (i.e. the amount of the overdraft is not fixed across all clients) and only implemented if the account has an overdraft facility enabled

---

## Benefits of the software to the the client

- **Ease of access**: Clients can access their account details immediately after accessing the software.
- **Personal financial Management**: Clients can manage their finances effectively by being able to make deposits and withdrawals in real time.
- **Transparency**: Being able to print out statements whenever they need offers clients a clear understanding of their finances.
- **Enhanced user experience**: Formatting statements using colour-coding for credit and debit improves readability and helps clients understand their transactions more clearly.
- **Overdraft facility**: The option to put an overdraft on some accounts that isn't fixed to all accounts offers financial flexibility to allow clients to manage cash flow effectively.

---

## Benefits of the software to the end user

- **Intuitive UI**: The interface is simple, making it easy for users to interact with their accounts.
- **Immediate Transaction Processing**: Users can withdraw or deposit funds in real time due to the application being highly responsive.
- **Convenience**: Immediate access to bank statements and balances help users to track their spending more efficiently.
- **Colour-coded transactions**: This feature can make help users see trends in their spending more quickly, giving them a greater understanding of their financial situation.

---

## Benefits of the software to the business

- **Customer satisfaction**: a user focused, highly functional application increases customer satisfaction and loyalty.
- **Operational efficiency**: Automating processes such as transactions and account statement generation reduces the workload for bank employees, allowing them to focus on other tasks.
- **Reduced financial risk**: The software's automatic management of the overdraft facility handles the risks traditionally associated with overdrafts so that additional revenue from fees and interest rates can be made. -**Compatability**: The software doesn't rely on new technology so it is highly compatible with old systems and can easily be integrated into other software.
- **Scalability**: The software is designed so that functionality can easily be built on top of it so that any additional features can be added to meet changing business needs.

---

## Potential risks associated with the software

- **Training**: Bank managers need to be trained to use the software in order to know how to implement an overdraft facility on a new account.
- **Human error**: Incorrect data entry can lead to mistakes, such as giving an account an overdraft higher than what was agreed, however, the software won't allow any processes that aren't allowed, such as spending money users do not have, to be carried out, therefore mitigating this risk.
- **Security awareness**: Due to the sensitive nature of the information inside a persons bank account, users need to remember to exit the application after finishing with it, to protect their financial information from leaking.
- **Disaster recovery**: Staff should be trained on procedures for software-related failures, such as a network outage, so that business operations can continue.

---
