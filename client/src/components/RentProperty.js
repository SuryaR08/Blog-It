// RentProperty.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RentProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [amount, setAmount] = useState('');

    const handleRent = async (event) => {
        event.preventDefault();

        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/properties/rent/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ paymentMethod, amount }),
            });

            if (response.ok) {
                console.log('Property rented successfully');
                navigate('/');
            } else {
                console.error('Error renting property');
            }
        } catch (error) {
            console.error('Error renting property:', error);
        }
    };

    return (
        <div className="rent-property">
            <h2>Rent Property</h2>
            <form onSubmit={handleRent}>
                <div className="form-group">
                    <label>Payment Method</label>
                    <select 
                        value={paymentMethod} 
                        onChange={(e) => setPaymentMethod(e.target.value)} 
                        required
                    >
                        <option value="">Select Payment Method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="PayPal">PayPal</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Rent Property</button>
            </form>
        </div>
    );
};

export default RentProperty;
