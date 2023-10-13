import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchIncome } from "../../actions";

export function Income() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.loading);
    const income = useSelector((state) => state.income);
    const [filter, setFilter] = useState({ sort: false, category: "" });
    const totalIncome = income.reduce((acc, inc) => inc.amount + acc, 0);

    useEffect(() => {
        dispatch(fetchIncome());
    }, [dispatch]);

    let filteredIncomeTransactions = income;

    if (filter.sort) {
        filteredIncomeTransactions.sort((b, a) => a.amount - b.amount);
    } else {
        filteredIncomeTransactions.sort((a, b) => a.amount - b.amount);
    }

    if (filter.category !== "") {
        filteredIncomeTransactions = filteredIncomeTransactions.filter(
            (transaction) => transaction.category === filter.category
        );
    }

    return (
        <div>
            <h1>Income</h1>
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
                            income.map((transaction) => transaction.category)
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
                    : filteredIncomeTransactions.map((t, i) => (
                          <li key={i}>
                              <h4>{t.category}</h4>
                              {t.description}: {t.amount}
                          </li>
                      ))}
            </ul>
            <h2>Summary</h2>
            <div>Total Income: {totalIncome}</div>
        </div>
    );
}
