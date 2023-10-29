const express =require('express')
const app= express()
const apiroutes = require('./routes/api')

app.get('/',(req,res)=>{res.send('API BLOG IS WORKING. /api/blog-stats -->For Analysis /api/search/?query={replace this with your search parameter} --> For Blog Search')})

app.use('/api',apiroutes)

const port =8000
app.listen(port , ()=>{
    console.log(`Server connected on port ${port}`)
})