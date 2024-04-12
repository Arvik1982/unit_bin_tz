import createPagesArr from "../data/createPagesArr"
import authorization_api from "./authorization_api"
import { host } from "./host";

export default function getData_api(setPageData, pageNumber, pageSize,setTotalPages, setPagesArr,sortOrder){

    authorization_api().then(()=>{

        return fetch(`${host}/items?page=${pageNumber}&pageSize=${pageSize}&sortBy=name&sortOrder=${sortOrder}`,
    
        {
            
            method: "GET",  
            headers: {
                Authorization: localStorage.getItem('user_token'),
              },
        
          }
        
        ).then((response)=>{
            return response.json()}
        ).then((data)=>{
            const result=data.result
            const totalItems =data.total
            const totalPages = Math.ceil(totalItems/pageSize)
            setTotalPages(totalPages)
            setPageData(result)
            totalPages?setPagesArr(createPagesArr(totalPages)):'' 
            return result
        }
        )
        .catch((err)=>{console.log(err.message)})

    }).catch((err)=>{console.log(err.message)})



}