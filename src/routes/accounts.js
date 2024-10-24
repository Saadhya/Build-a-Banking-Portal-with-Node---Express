const express= require('express');
const router= express.Router();

const {accounts}= require('../data')

router.get('/savings', (req, res) => {
    const objj = {
        title: 'Account Saving',
        account: accounts.savings
    }
    res.render('account', objj)
})
router.get('/checking', (req, res) => {
    const objj = {
        title: 'Account Saving',
        account: accounts.checking
    }
    res.render('account', objj)
})
router.get('/credit', (req, res) => {
    const objj = {
        title: 'Account Credit',
        account: accounts.credit
    }
    res.render('account', objj)
})
module.exports= router;
