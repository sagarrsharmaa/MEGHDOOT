import {app} from './app.js'
import dotenv from 'dotenv'

dotenv.config()
try {
   app.listen(process.env.PORT,()=>{
      console.log("App is listening on :",process.env.PORT)
   })
} catch (error) {   
   console.log("cannot start server : " , error)
}

 