const Sequelize=require('sequelize');

const connection=new Sequelize('litesupport','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports=connection;