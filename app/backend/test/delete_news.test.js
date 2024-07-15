describe(()=>{
    it("When send only news to delete should delete only main news",async()=>{
        const mockFS = jest.spyOn(fs,'unlink')

        const response = await request(app)
        .delete('/news/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({news_id})

        expect(response.status).toEqual(201)
        const findNews = await News.findAll({where:{id:news_id}})


        expect(findNews).toEqual([])

        expect(mockFS).toHaveBeenCalledTimes(1)

        
    })
    it("When send main news and elements should delete all",async()=>{
        const mockFS = jest.spyOn(fs,'unlink')

        const response = await request(app)
        .delete('/news/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({news_id})

        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        const findNews = await News.findAll()
        const findElements = await Elements.findAll()

        expect(findNews).toEqual([])
        expect(findElements).toEqual([])
        expect(mockFS).toHaveBeenCalledTimes(3)

        
    })
    it("When send main news and elements should delete all",async()=>{
        const mockFS = jest.spyOn(fs,'unlink')
        const elementsBeforeDelete =  await Elements.findAll()
        expect(elementsBeforeDelete).toHaveLength(2)
        const response = await request(app)
        .delete('/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({elements_id:elementsIds})

        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        const findNews = await News.findAll()
        const findElements = await Elements.findAll()

        expect(findNews).toHaveLength(1)
        expect(findElements).toEqual([])
        expect(mockFS).toHaveBeenCalledTimes(1)

        
    })
    it("Should delete only the news and elements from the news_id sent",async()=>{
        const mockUnlinkFS= jest.spyOn(fs,'unlink')

        const newsBeforeDelete = await News.findAll({where:{id:news_id}})
        const elemensBeforeDelete = await Elements.findAll({where:{news_id}})
        const newsImgBeforeDel = newsBeforeDelete[0].imgPath

        expect(newsBeforeDelete).toHaveLength(1)
        expect(elemensBeforeDelete).toHaveLength(2)
        expect(await existImg(newsImgBeforeDel)).toBeTruthy()
        
        elemensBeforeDelete.map(async(val)=>{
            const exists = await existImg(val.imgPath)
            expect(exists).toBeTruthy()
        })

        const response = await request(app)
        .delete('/news/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({news_id})
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        expect(mockUnlinkFS).toHaveBeenCalledTimes(3)
        
        const findNews = await News.findAll()
        const findElements = await Elements.findAll()
      
        expect(findNews).toHaveLength(1)
        expect(findElements).toHaveLength(2)

        expect(await existImg( findNews[0].imgPath )).toBeTruthy()

        const calls = mockUnlinkFS.mock.calls.map((val)=>val.join(''))
        elemensBeforeDelete.map(async(val,ind)=>{
            expect(await existImg(val.imgPath)).toBeFalsy()
            expect(calls[ind]).toEqual(val.imgPath)
        })
       
        expect(calls.includes(newsImgBeforeDel)).toBeTruthy()
    })
  
   it("Should delete all elements and destroys images",async()=>{
        const mockUnlinkFS= jest.spyOn(fs,'unlink')

        const response = await request(app)
        .delete('/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({elements_id:elementsIds})
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        expect(mockUnlinkFS).toHaveBeenCalledTimes(3)
    })
  
})