
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const plans = {
    Airtel: ["₹199 - 28 Days - 1.5GB/Day", "₹399 - 56 Days - 2GB/Day"],
    Vodafone: ["₹219 - 28 Days - 1GB/Day", "₹599 - 84 Days - 1.5GB/Day"],
    Jio: ["₹239 - 28 Days - 1.5GB/Day", "₹666 - 84 Days - 2GB/Day"],
};

const dthPlans = {
    Airtel: ["₹285 - 1 Month - 150 Channels", "₹500 - 2 Months - 200 Channels"],
    TataSky: ["₹300 - 1 Month - 160 Channels", "₹600 - 2 Months - 220 Channels"],
};

const PaymentGateWay = () => {
    const [rechargeType, setRechargeType] = useState('mobile');
    const [mobileNumber, setMobileNumber] = useState('');
    const [operator, setOperator] = useState('');
    const [circle, setCircle] = useState('');
    const [rechargePlan, setRechargePlan] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    const handleRecharge = async (event) => {
        event.preventDefault();

        const rechargeData = {
            rechargeType,
            mobileNumber,
            operator,
            circle,
            rechargePlan,
            paymentMethod,
            cardNumber,
            expirationDate,
            cvv,
        };

        try {
            const response = await axios.post('http://localhost:3001/recharge', rechargeData);
            setPaymentStatus(response.data.status);
        } catch (error) {
            console.log("Post Error Occurred", error);
            setPaymentStatus('Failed');
        }
    };

    return (
        <div className='gateway'>
            <h1>Payment Gateway For Recharges</h1>
            <form onSubmit={handleRecharge}>
                <label>Recharge Type:</label>
                <select value={rechargeType} onChange={(e) => setRechargeType(e.target.value)}>
                    <option value="mobile">Mobile</option>
                    <option value="dth">DTH</option>
                </select>
                <br /><br />

                {rechargeType === 'mobile' && (
                    <>
                        <label>Mobile Number:</label>
                        <input type='text' value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                        <br /><br />
                    </>
                )}

                <label>Operator:</label>
                <select value={operator} onChange={(e) => setOperator(e.target.value)}>
                    <option value="">Select Operator</option>
                    {rechargeType === 'mobile' && Object.keys(plans).map(op => <option key={op} value={op}>{op}</option>)}
                    {rechargeType === 'dth' && Object.keys(dthPlans).map(op => <option key={op} value={op}>{op}</option>)}
                </select>
                <br /><br />

                {rechargeType === 'mobile' && (
                    <>
                        <label>Circle:</label>
                        <select value={circle} onChange={(e) => setCircle(e.target.value)}>
                            <option value="">Select Circle</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Tamilnadu">Tamilnadu</option>
                        </select>
                        <br /><br />
                    </>
                )}

                <label>Recharge Plan:</label>
                <select value={rechargePlan} onChange={(e) => setRechargePlan(e.target.value)}>
                    <option value="">Select Plan</option>
                    {operator && (rechargeType === 'mobile' ? plans[operator] : dthPlans[operator])?.map(plan => (
                        <option key={plan} value={plan}>{plan}</option>
                    ))}
                </select>
                <br /><br />

                <label>Payment Method:</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="">Select Payment</option>
                    <option value="Credit/Debit Card">Credit/Debit Card</option>
                    <option value="NetBanking">NetBanking</option>
                    <option value="Wallet">Wallet</option>
                </select>
                <br /><br />

                {paymentMethod === 'Credit/Debit Card' && (
                    <div>
                        <label>Card Number:</label>
                        <input type='text' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                        <br /><br />

                        <label>Expiration Date:</label>
                        <input type='text' value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                        <br /><br />

                        <label>CVV:</label>
                        <input type='text' value={cvv} onChange={(e) => setCvv(e.target.value)} />
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


