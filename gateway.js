const express = require("express")
const app = express()
const cors = require("cors")
const port = 3001
const axios = require("axios")

app.use(cors())
app.use(express.json())

app.post('/recharge', async(req,res)=>{
   // const rechargeData = req.body
    //try {
      //  const response = await axios.post('http://localhost:3001/recharge',rechargeData)
      //  res.send(response.data)
    //} catch (error) {
      //  console.error(error)
        //res.status(500).send('payment failed !')
   // }
   try {
    const rechargeData = req.body;
    res.send("Recharge Successfull !")
   } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: ' + error.message)
   }
})

app.listen(port, () =>{
    console.log('server listening on port ${port}');
})