import {Sequelize} from 'sequelize'

const Schema = new Sequelize('users','root','',{
    host:'localhost',
    dialect:'mysql',
    logging:false
})

const ModelNews = Schema.define('news',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    content:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    date:{
        type:Sequelize.DATE
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imgName:{
        type:Sequelize.STRING
    }, 
    imgPath:{
        type:Sequelize.STRING
    },
    resume:{
        type:Sequelize.STRING
    }
})
export default ModelNews
/*const db = async()=>{
await News.sync()
}
db()*/
