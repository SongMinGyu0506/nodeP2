const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            message: {
                type: Sequelize.STRING(1000),
                allowNull: false
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Board',
            tableName: 'boards',
            paranoid: false,        // true로 설정 시 데이터 삭제 시 완벽하게 삭제하지 않고 삭제기록
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.belongsTo(db.User, {foreignKey:'user_id',targetKey:'id'});
        db.Comment.belongsTo(db.Comment, {foreignKey:'comment_id',targetKey:'id'});
    }
}