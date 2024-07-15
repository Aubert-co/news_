describe(()=>{
    it("When send all value correct should save the elements and the images",async()=>{
       
        const mockFS = jest.spyOn(fs,'unlink')
        jest.spyOn(fs, 'unlink').mockImplementation(() => {
            return Promise.reject(new Error('Failed to unlink'));
          });
        const response = await request(app)
        .delete('/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({'elements_ids': JSON.stringify( elements_id )})
        
    
        const elementsInDB = await Elements.findAll()

        expect(elementsInDB).toHaveLength(0)
        expect(mockFS).toHaveBeenCalledTimes(2)
    })
        it("When send all value correct should save the elements and the images",async()=>{
       
            const mockFS = jest.spyOn(fs,'unlink')
           
            const response = await request(app)
            .delete('/news/elements/destroy')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({'elements_ids': JSON.stringify( elements_id )})
            
        
            const elementsInDB = await Elements.findAll()
    
            expect(elementsInDB).toHaveLength(0)
            expect(mockFS).toHaveBeenCalledTimes(2)
        })
        it("When send all value correct should save the elements and the images",async()=>{
       
            const mockFS = jest.spyOn(fs,'unlink')
           
            const response = await request(app)
            .delete('/news/elements/destroy')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({'elements_ids': JSON.stringify( elements_id )})
            
        
            const elementsInDB = await Elements.findAll()
    
            expect(elementsInDB).toHaveLength(0)
            expect(mockFS).toHaveBeenCalledTimes(1)
        })
})