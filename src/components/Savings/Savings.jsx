import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSavings } from "../../actions";

export function Savings() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.loading);
    const savings = useSelector((state) => state.savings);
    const [filter, setFilter] = useState({ sort: false, category: "" });

    const totalSavings = savings.reduce(
        (acc, saving) => saving.amount + acc,
        0
    );

    useEffect(() => {
        dispatch(fetchSavings());
    }, [dispatch]);

    let filteredSavingsTransactions = savings;

    if (filter.sort) {
        filteredSavingsTransactions.sort((b, a) => a.amount - b.amount);
    } else {
        filteredSavingsTransactions.sort((a, b) => a.amount - b.amount);
    }

    if (filter.category !== "") {
        filteredSavingsTransactions = filteredSavingsTransactions.filter(
            (transaction) => transaction.category === filter.category
        );
    }

    return (
        <div>
            <h1>Savings</h1>
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
                            savings.map((transaction) => transaction.category)
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
                    : filteredSavingsTransactions.map((transaction, i) => (
                          <li key={i}>
                              <h4>{transaction.category}</h4>
                              {transaction.description}: {transaction.amount}
                          </li>
                      ))}
            </ul>
            <h2>Summary</h2>
            <div>Total Savings: {totalSavings}</div>
        </div>
    );
}
