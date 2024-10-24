const fs= require('fs');
const path=require('path');

// Use path.join to get the absolute path of accounts.json
const accountFilePath = path.join(__dirname, 'json', 'accounts.json');
const userFilePath = path.join(__dirname, 'json', 'users.json');
// accounts
// const accountData = fs.readFileSync('./json/accounts.json')
const accountData = fs.readFileSync(accountFilePath, 'utf8');
const accounts = JSON.parse(accountData);

// users
const userData = fs.readFileSync(accountFilePath, 'utf8');
// const userData = fs.readFileSync('./json/users.json')
const users = JSON.parse(userData);

const writeJSON=()=>{
    const accountsJSON = JSON.stringify(accounts, null, 2);
    const filePath = path.join(__dirname, 'json', 'accounts.json');  // Get absolute path
    try {
        // Write the JSON data to the file with UTF-8 encoding
        fs.writeFileSync(filePath, accountsJSON, 'utf8');
        // res.render('payment', { message: "Payment Successful", account: accounts.credit })
    } catch (err) {
        console.error('Error writing to file:', err);
        // res.status(500).send('Error saving the accounts data.');
    }
}

module.exports={accounts, users, writeJSON};
