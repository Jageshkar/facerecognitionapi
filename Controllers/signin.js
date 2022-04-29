const handleSignIn = (req, res, bcrypt, knex) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(400).json('incorrect sign in')
    }
    knex.select('email', 'hash').from('login').where('email', '=', email)
    .then(data => {
       const isValid = bcrypt.compareSync(password, data[0].hash);
       if(isValid) {
           return knex.select('*').from('users').where('email', '=', email)
           .then(user => {
               res.json(user[0])
           }).catch(err => res.status(400).json('unable to get user'))
       } else {
           res.status(400).json('invalid user login')
       }
    }).catch(err => res.status(400).json('invalid user login'))
}

module.exports = {
    handleSignIn: handleSignIn
}