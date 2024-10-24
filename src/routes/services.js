const express= require('express');
const router= express.Router();

const { accounts, writeJSON}= require('../data')


router.get('/transfer', (req, res) => {
    res.render('transfer') //'transfer' refers to transfer.ejs
})

router.post('/transfer', (req, res) => {
    const { from, to, amount } = req.body;

    // Convert amount to a number
    const transferAmount = parseFloat(amount);

    // Access the current balance of the account we are transferring from
    if (accounts[from]) {
        const currentBalance = accounts[from].balance;

        // Calculate the new balance for the 'from' account
        const newBalanceFrom = currentBalance - transferAmount;

        // Ensure the new balance is not negative
        if (newBalanceFrom >= 0) {
            // Set the new balance for the 'from' account
            accounts[from].balance = newBalanceFrom;

            // Update the balance of the 'to' account (if valid)
            if (accounts[to]) {
                accounts[to].balance += transferAmount;
            }
            writeJSON();
            // const accountsJson = JSON.stringify(accounts, null, 2);
            // fs.writefileSync(accountsJson)

            // const filePath = path.join(__dirname, 'json', 'accounts.json');  // Get absolute path

            // try {
            //     // Write the JSON data to the file with UTF-8 encoding
            //     fs.writeFileSync(filePath, accountsJSON, 'utf8');
            //     res.send(`Transfer completed! New balance in ${from}: ${newBalanceFrom}`);
            // } catch (err) {
            //     console.error('Error writing to file:', err);
            //     res.status(500).send('Error saving the accounts data.');
            // }
                res.send(`Transfer completed! New balance in ${from}: ${newBalanceFrom}`);

        } else {
            res.send('Insufficient funds for this transfer.');
        }
    } else {
        res.send('Invalid account selection.');
    }
})
router.post('/payment', (req, res) => {
    res.render('payemnt', { account: accounts.credit });
})
router.post('/payment', (req, res) => {
    accounts.credit.balance = accounts.credit.balance - req.body.amount;
    parseInt(accounts.credit.available) += parseInt(req.body.amount);
    writeJSON();
    // const accountsJSON = JSON.stringify(accounts, null, 2);
    // try {
    //     // Write the JSON data to the file with UTF-8 encoding
    //     fs.writeFileSync(filePath, accountsJSON, 'utf8');
    //     res.render('payment', { message: "Payment Successful", account: accounts.credit })
    // } catch (err) {
    //     console.error('Error writing to file:', err);
    //     res.status(500).send('Error saving the accounts data.');
    // }

})

module.exports= router;
