import { FormData } from "@/components/Contacts"

export function sendMail(data: FormData) {
   const api = '/api/email'
   
   try{
    fetch(api, {
        method: 'POST',
        body: JSON.stringify(data)
       })
       .then((res) => res.json())
       .then((response) => {
        console.log(response.message)
       })
   }
   catch(err){
        console.log(err)
    }
}
