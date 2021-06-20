<script >
  import axios from 'axios'
  import {allcars} from './dataCars.js'
  import {fade} from 'svelte/transition'

  let pmkey = "";

    let showcars =true;
  let showcredit = false
  let cars = allcars;

  let number = "";
  let month = "";
  let year = "";
  let cvc = "";

function showmodalcredit(){
  showcars = false
  showcredit = true
}


function paynow(){
  axios.post("http://localhost:1000/createPayment",{
    number:number,// '4242424242424242',
    month: month,
    year: year,
    cvc: cvc,
  }).then((box)=>{
    console.log(box)
    console.log("your id payment is " +  box.data.id)
    pmkey = box.data.id
    showcredit = false
    showcars = true
  })
}
function btnfixpay(cars){
  axios.post("http://localhost:1000/paynow",{
    price:cars.price,
    id:pmkey
  }).then((box)=>{
    console.log(box)
    alert("your success payment")
  })
}
</script>

<div transition:fade>
  
{#if showcars}
  <h1>{cars.name}</h1>
  <br>
  <img src={cars.img} style="width:300px;height:120px;">
  <br>
  <h3>{cars.price}</h3>
  <button on:click={showmodalcredit}>Checkout</button>
  {#if pmkey !== "" | undefined}
  <button on:click={btnfixpay(cars)}>Pay {cars.price} now</button>
  {/if}
{/if}
</div>

<div>
  {#if showcredit}
     number: <input type="text" bind:value={number}><br>
     month: <input type="text" bind:value={month}><br>
     year: <input type="text" bind:value={year}><br>
     cvc: <input type="text" bind:value={cvc}><br>
     <button on:click={paynow}>Pay Now </button>
  {/if}
</div>