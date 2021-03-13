const Sequelize=require('sequelize');

const connection=require("./database");

const Answer=connection.define('answers',{
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    question:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force: false}).then(()=>{});

module.exports=Answer;