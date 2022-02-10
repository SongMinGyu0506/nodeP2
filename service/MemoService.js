const Board = require('../models/board');
const User = require('../models/user');
const Relation = require('../models');

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
        res.json({"status":"Completed"});
    } catch (err) {
        console.log(err);
        next(err);
    }
};
exports.CheckUser = async (req,res,next) => {
    const UserData = await Relation.sequelize.models.UserBoard.findOne({
        attributes: ['UserId'],
        where:{BoardId:req.params.id}
    });
    const user = await User.findOne({
        where:{id:UserData.UserId}
    });
    if (user.user_id === req.user.user_id) {
        next();
    } else {
        res.status(403).json({"status":"inaccessible account"});
    }
};

exports.IsMemo = async (req,res,next) => {
    const board = await Board.findOne({
        where:{id:req.params.id}
    });
    if (board === null) {
        res.status(403).json({'status':"post doesn't exist"});
    } else {
        next();
    }

}

exports.MemoModify = async (req,res,next) => {
    const updateData = await Board.update({
        title: req.body.title,
        message: req.body.message,
    },{
        where:{id:req.params.id},
    }).then(()=>{
        res.json({"status":"Modifications completed"});
    }).catch((err)=>{
        console.log(err);
        next(err);
    });
};

exports.MemoDelete = async (req,res,next) => {
    try {
        const deleteData = await Board.destroy({
            where:{id:req.params.id}
        });
        res.json({"status":"Delete completed"});
    } catch (err) {
        console.log(err);
        next(err);
    }
}