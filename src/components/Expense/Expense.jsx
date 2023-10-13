import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchExpense } from "../../actions";

export function Expense() {
    const expense = useSelector((state) => state.expense);
    const isLoading = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({ sort: false, category: "" });

    const totalExpense = expense.reduce(
        (acc, transaction) => transaction.amount + acc,
        0
    );

    useEffect(() => {
        dispatch(fetchExpense());
    }, [dispatch]);

    let filteredExpenseTransactions = expense;

    if (filter.sort) {
        filteredExpenseTransactions.sort((b, a) => a.amount - b.amount);
    } else {
        filteredExpenseTransactions.sort((a, b) => a.amount - b.amount);
    }

    if (filter.category !== "") {
        filteredExpenseTransactions = filteredExpenseTransactions.filter(
            (transaction) => transaction.category === filter.category
        );
    }

    return (
        <div>
            <h1>Expense</h1>
            <div>
                <label>
                    <input
                        type="checkbox"
                        value={filter.sort}
                        onChange={(e) =>
                            setFilter((filter) => {
                                return {
                                    ...filter,
                                    sort: e.target.checked,
                                };
                            })
                        }
                    />
                    Sort by price
                </label>
                <select
                    value={filter.category}
                    onChange={(e) =>
                        setFilter((filter) => ({
                            ...filter,
                            category: e.target.value,
                        }))
                    }
                >
                    <option value="">Select Category</option>
                    {[
                        ...new Set(
                            expense.map((transaction) => transaction.category)
                        ),
                    ].map((category, i) => (
                        <option key={i} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <ul>
                {isLoading
                    ? "Loading"
                    : filteredExpenseTransactions.map((transaction, i) => (
                          <li key={i}>
                              <h4>{transaction.category}</h4>
                              {transaction.description}: {transaction.amount}
                          </li>
                      ))}
            </ul>
            <h2>Summary</h2>
            <div>Total Expense: {totalExpense}</div>
        </div>
    );
}
