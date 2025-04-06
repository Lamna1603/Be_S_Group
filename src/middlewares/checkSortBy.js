export const check_sortBy = (req,res,next)=>{
    const sortBy= req.query.sortBy
    if(sortBy) {
         if(sortBy && sortBy !== "id_asc" && sortBy !== "id_des") return res.status(400).send({message: "cant catch your sort method"})
         } 
        next ()
}