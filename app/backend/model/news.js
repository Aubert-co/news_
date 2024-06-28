module.exports = (sequelize,DataTypes)=>{
  
   const news_db =  sequelize.define('news',{
        content:DataTypes.STRING,
        category:DataTypes.STRING,
        resume:DataTypes.STRING,
        title:DataTypes.STRING,
        imgName:DataTypes.STRING, 
      imgPath:DataTypes.STRING,
      resume:DataTypes.STRING
    })
    return news_db
}