import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const PaymentGateWay = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [operator, setOperator] = useState('');
    const [circle, setCircle] = useState('');
    const [rechargeAmount, setRechargeAmount] = useState('')
    const [PaymentMethod, setPaymentMethod] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expirationDate, setExpirationDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('')

    const handleRecharge = async (event) => {
        event.preventDefault();

        const rechargeData = {
            mobileNumber,
            operator,
            circle,
            rechargeAmount,
            PaymentMethod,
            cardNumber,
            expirationDate,
            cvv,
        };

        try {
            const response = await axios.post('http://localhost:3001/recharge', rechargeData);
            setPaymentStatus(response.data.status);
        } catch (error) {
            console.log("Post Error Occured", error)
            setPaymentStatus('Failed');
        }
    };

    return (
        <div className='gateway'>
            <h1>Payment Gateway For Recharges</h1>
            <br />
            <form onSubmit={handleRecharge}>
                <label>Mobile Number:</label>
                <input
                    type='text'
                    value={mobileNumber}
                    onChange={(event) => setMobileNumber(event.target.value)}>
                </input>
                <br></br><br />

                <label>Operator:</label>
                <select value={operator} onChange={(event) => setOperator(event.target.value)}>
                    <option value="">Select Operator</option>
                    <option value="Airtel">Airtel</option>
                    <option value="Vodafone">Vodafone</option>
                    <option value="Jio">Jio</option>
                    <option value="None">None</option>
                </select>
                <br></br><br></br>

                <label>Circle:
                    <select value={circle} onChange={(event) => setCircle(event.target.value)}>
                        <option value="">Select Circle</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamilnadu">Tamilnadu</option>
                        <option value="None">None</option>
                    </select>
                </label><br></br><br></br>

                <label>Recharge Amount: </label>
                <input type='number' value={rechargeAmount} onChange={(event) => setRechargeAmount(event.target.value)}></input>
                <br></br><br></br>

                <label>Payment Method: </label>
                <select value={PaymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                    <option value="">Select Payment</option>
                    <option value="Credit/Debit Card">Credit/Debit Card</option>
                    <option value="NetBanking">NetBanking</option>
                    <option value="Wallet">Wallet</option>
                </select>
                <br></br><br></br>

                {PaymentMethod === 'Credit/Debit Card' && (
                    <div>
                        <label>Card Number:
                            <input
                                type='text'
                                value={cardNumber}
                                onChange={(event) => setCardNumber(event.target.value)} />
                        </label>
                        <br></br><br />

                        <label>Expiration Date:
                            <input
                                type="text"
                                value={expirationDate}
                                onChange={(event) => setExpirationDate(event.target.value)} />
                        </label>
                        <br /><br />

                        <label>CVV:
                            <input
                                type='text'
                                value={cvv}
                                onChange={(event) => setCvv(event.target.value)} />
                        </label>
                    </div>
                )}

                <br /><br />

                <button type='submit'>Recharge</button>
                <p>Payment Status: {paymentStatus}</p>
            </form>

        </div>
    );
};

export default PaymentGateWay;
