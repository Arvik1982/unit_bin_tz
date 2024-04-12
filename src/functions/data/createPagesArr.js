export default function createPagesArr(totalPages){
const newData=[]
   
    for (let i =1; i<=totalPages; i+=1){
      newData.push(i)
      
    }
    return newData
  }