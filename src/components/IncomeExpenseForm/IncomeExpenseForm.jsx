import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addEntry } from "../../actions";

export function IncomeExpenseForm() {
    const dispatch = useDispatch();

    const [transaction, setTransaction] = useState({
        description: "",
        amount: 0,
        category: "",
        entryType: "income",
    });

    const handleAddEntry = (e) => {
        e.preventDefault();
        dispatch(addEntry(transaction));
        setTransaction({
            description: "",
            amount: 0,
            category: "",
            entryType: "income",
        });
    };

    function handleInputChange(e) {
        setTransaction((transaction) => ({
            ...transaction,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <div>
            <h1>Add Entry</h1>
            <form onSubmit={handleAddEntry}>
                <div>
                    <label>Description:</label>
                    <input
                        name="description"
                        type="text"
                        required
                        value={transaction.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        name="amount"
                        type="number"
                        required
                        value={transaction.amount}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        name="category"
                        type="text"
                        required
                        value={transaction.category}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Entry Type:</label>
                    <select
                        name="entryType"
                        value={transaction.entryType}
                        onChange={handleInputChange}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="savings">Savings</option>
                    </select>
                </div>
                <button type="submit">Add Entry</button>
            </form>
        </div>
    );
}
