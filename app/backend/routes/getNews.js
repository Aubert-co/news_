const route = require('express')()

const {News,Elements} = require('../models/index')


route.get('/news/page=:page', async (req, res) => {
    try {
      const page = parseInt(req.params.page) || 1;
      const limit = 10; 
      const offset = (page - 1) * limit;
  

      const { count, datas } = await News.findAndCountAll({
        order: [['createdAt', 'ASC']],
        limit: limit,
        offset: offset
      });
  
      const totalPages = Math.ceil(count / limit);
  
 
      res.status(200).send({
        currentPage: page,
        totalPages: totalPages,
        totalRecords: count,
        datas
      });
    } catch (error) {
    
      res.status(500).send({ message: 'Something went wrong.' });
    }
  })
.get('/news/id=:id',async(req,res)=>{
    const id = req.params.id
    try{
        if(!id)return res.status(400).send({message:'id cannot be null'})
        const datas = await News.findAll({
            include:[{
                model:Elements,
                as:'Elements',
                where:{news_id:id}
            }],
            where:{id}
        })
        if(!datas || datas.length ===0)return res.status(400).send({message:"Not found."})
        res.status(200).send({datas})
    }catch(err){
        res.status(500).send({ message: 'Something went wrong.' });
    }
})

module.exports = route