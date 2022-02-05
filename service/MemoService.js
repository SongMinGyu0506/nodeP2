const Board = require('../models/board');
const User = require('../models/user');

exports.MemoRead = async (req,res,next) => {
    const user = await User.findOne({where:{user_id:req.user.user_id},include:[{model:Board}]});
    const Boards = user.Boards;
    res.json(Boards);
};

exports.MemoWrite = async (req,res,next) => {
    try {
        const user = await User.findOne({where: {user_id : req.user.user_id}});
        const board = await Board.create({
            title:req.body.title,
            message:req.body.message
        });
        user.addBoard(board);
        res.send('success');
    } catch (err) {
        console.log(err);
    }
};

exports.MemoModify = async (req,res,next) => {
    const updateData = await Board.update({
        title: req.body.title,
        message: req.body.message,
    },{
        where:{id:req.params.id},
    }).then(()=>{
        res.send('success modify');
    }).catch((err)=>{
        console.log(err);
    });
};

exports.MemoDelete = async (req,res,next) => {
    try {
        const deleteData = await Board.destroy({
            where:{id:req.params.id}
        });
        res.send('Success Delete');
    } catch (err) {
        console.log(err);
    }
}