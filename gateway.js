const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/recharge', (req, res) => {
    const { rechargeType,
       mobileNumber,
        operator,
        circle,
        rechargePlan,
        paymentMethod,
        cardNumber,
        expirationDate,
        cvv } = req.body;

    if (rechargeType === 'mobile' && (!mobileNumber || !operator || !circle || !rechargePlan || !paymentMethod)) {
        return res.status(400).json({ status: 'Failed', message: 'Missing required mobile recharge details' });
    }
    
    if (rechargeType === 'dth' && (!operator || !rechargePlan || !paymentMethod)) {
        return res.status(400).json({ status: 'Failed', message: 'Missing required DTH recharge details' });
    }
    
    if (paymentMethod === 'Credit/Debit Card' && (!cardNumber || !expirationDate || !cvv)) {
        return res.status(400).json({ status: 'Failed', message: 'Incomplete card details' });
    }

    console.log('Recharge request received:', req.body);
    res.json({ status: 'Success', message: 'Recharge successful!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});