const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const stripe = require('stripe')('sk_test_51GrFm2L1zFI5eAe7niLJxk9upLXCDUZ6W3K3hCD4uG7SyDipCIXVsQc4YwVVaGCd5AmkyITcqu7xq9EjuYaigVWc00WktO4Eq7')
const cors = require('cors')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(cors());

app.post("/createPayment",async (req,res)=>{
	const {number,month,year,cvc} = req.body
	const paymentMethod = await stripe.paymentMethods.create({
  type: 'card',
  card: {
    number:number,// '4242424242424242',
    exp_month: month,
    exp_year: year,
    cvc: cvc,
  },
}).then((box)=>res.send(box))

})


app.post("/paynow",async(req,res)=>{
	const {price,id} = req.body
	const paymentIntent = await stripe.paymentIntents.create({
  amount: price,
  currency: 'usd',
  payment_method:id,
  description:"this new cars from customer",
  confirm :true
 
}).then((result)=>{
	res.send(result)
})
})
app.get("/",(req,res)=>{
	res.send("hellow")
})

app.listen(1000,()=>console.log("server run port 1000"))