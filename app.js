const fastify = require('fastify')()

fastify.register(require('./routes/users'),{prefix:'/users'})

fastify.listen(5000, function(err,addhress){
    if(err){
        console.log(err)
        process.exit(1)
    }
    else{
        console.log('server is listen in on port 5000')
    }
})