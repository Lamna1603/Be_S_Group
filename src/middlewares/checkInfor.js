export const check_infor = (req, res, next) => {
    const { name, age } = req.body
    if (!name || typeof name !== 'string') {
      return res.status(400).send({ message: "Name is invalid" })
    }
    if (!Number.isInteger(age)) {
      return res.status(400).send({ message: "Age is invalid" })
    }
    next()
  }