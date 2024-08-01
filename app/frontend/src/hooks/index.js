export const fetchData = async ({body,setItems,service}) => {
   
    const {datas,status} = await service({ body })
    setItems({datas,status})
    return null
};