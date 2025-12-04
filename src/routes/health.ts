import {Router} from 'express'
const router = Router()
import {authenticate} from '../middlewares/auth'

router.get('/',(req,res)=>{
    try{
        res.status(200).json({status:'ok'})
    }catch(error:any){
        res.status(500).json({message:error.message})
    }
})

router.get("/secure",authenticate,(req,res)=>{
    try{
        res.json({message:"Protected route accessed",user:req.user})

    }catch(error){
        res.status(500).json({message:error.message})
    }
})

export default router;