export  const checkId = (req,res,next)=>{
    const id = parseInt(req.params.id)
    if (isNaN(id)) return res.status(400).send({message: "your id is invalid"})
    next()
}