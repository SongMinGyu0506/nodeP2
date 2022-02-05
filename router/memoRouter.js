const express = require('express');
const { isLoggedIn } = require('../service/AuthService');
const { MemoRead, MemoWrite, MemoModify, MemoDelete } = require('../service/MemoService');

const router = express.Router();

router.get('/read',isLoggedIn, MemoRead);
router.post('/write',isLoggedIn,MemoWrite);
router.put('/modify/:id',isLoggedIn,MemoModify);
router.delete('/delete/:id',isLoggedIn,MemoDelete);


module.exports = router;