
import { Button } from 'bootstrap';
import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import './pay.css'


const Pay =()=>{
    const[stripeToken,setStripeToken] = useState(null)
    const onToken=(token)=>{
        setStripeToken(token);
    }
    useEffect(()=>{
        const makeRequest = async ()=>{
            try{
               console.log(stripeToken)
            }
            catch(err){
                console.log(err)
            }
        }
         makeRequest()
    },[stripeToken])
    return(
        <div className='body'>
            <div className='leftbox'>
                <h1>Basic Plan</h1>
        <StripeCheckout name='NetflixClone'
        amount={800}
        token={onToken}
        currency="USD"
        stripeKey = "pk_test_51L7k6IFiFH4fD97dgsiKzVLxL2yNRA8LIE11phV7wX38kaGafAkw9TM7x5uFjPZswlKertg6iEbAvhJsy4tFcpP400rlNV1Afb"
        >


        <button>
            <NavLink to="/home" >
            Basic plan
            </NavLink>
            </button>
        </StripeCheckout>
            </div>

        <div className='rightbox'>
        <h1>Standard Plan</h1>
        <StripeCheckout name='NetflixClone'
        amount={1000}
        token={onToken}
        currency="USD"
        stripeKey = "pk_test_51L7k6IFiFH4fD97dgsiKzVLxL2yNRA8LIE11phV7wX38kaGafAkw9TM7x5uFjPZswlKertg6iEbAvhJsy4tFcpP400rlNV1Afb"
        >
            
        <button>
        <NavLink to="/home">
            Standard plan
        </NavLink>
            </button>
        </StripeCheckout>
            </div>

        <div className='middlebox'>
        <h1>Premium Plan</h1>
        <StripeCheckout name='NetflixClone'
        amount={2000}
        token={onToken}
        currency="USD"
        stripeKey = "pk_test_51L7k6IFiFH4fD97dgsiKzVLxL2yNRA8LIE11phV7wX38kaGafAkw9TM7x5uFjPZswlKertg6iEbAvhJsy4tFcpP400rlNV1Afb"
        >
            
        <button>
        <NavLink to="/home">
            Premium plan
            </NavLink>
            </button>
        </StripeCheckout>
            </div>
            </div>
    );
}
export default Pay;
