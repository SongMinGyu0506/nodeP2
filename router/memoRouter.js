const express = require('express');
const { isLoggedIn } = require('../service/AuthService');
const { MemoRead, MemoWrite, MemoModify, MemoDelete, CheckUser, IsMemo } = require('../service/MemoService');

const router = express.Router();

router.get('/read',isLoggedIn, MemoRead);
router.post('/write',isLoggedIn,MemoWrite);
router.put('/modify/:id',isLoggedIn,IsMemo,CheckUser,MemoModify);
router.delete('/delete/:id',isLoggedIn,IsMemo,CheckUser,MemoDelete);


module.exports = router;