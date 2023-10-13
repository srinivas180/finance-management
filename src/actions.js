export const fetchIncome = () => {
    return async function (dispatch) {
        try {
            dispatch({ type: "loading" });
            const response = await fetch(
                "https://assignment-19-financial-management-backend.srinivas365.repl.co/income"
            );
            const result = await response.json();
            dispatch({ type: "income/fetch", payload: result.incomeData });
        } catch (error) {
            console.error("Error fetching income data:", error);
        }
    };
};

export const fetchExpense = () => {
    return async function (dispatch) {
        try {
            dispatch({ type: "loading" });
            const response = await fetch(
                "https://assignment-19-financial-management-backend.srinivas365.repl.co/expense"
            );
            const result = await response.json();
            dispatch({ type: "expense/fetch", payload: result.expenseData });
        } catch (error) {
            console.error("Error fetching expense data:", error);
        }
    };
};

export const fetchSavings = () => {
    return async function (dispatch) {
        try {
            dispatch({ type: "loading" });
            const response = await fetch(
                "https://assignment-19-financial-management-backend.srinivas365.repl.co/savings"
            );
            const result = await response.json();
            dispatch({
                type: "savings/fetch",
                payload: result.savingsData,
            });
        } catch (error) {
            console.error("Error fetching savings data:", error);
        }
    };
};

export const addEntry = (transaction) => {
    return async function (dispatch) {
        const { description, amount, category, entryType } = transaction;
        try {
            const response = await fetch(
                `https://assignment-19-financial-management-backend.srinivas365.repl.co/add-${entryType}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({ description, amount, category }),
                }
            );

            const result = await response.json();
            if (result.status === "OK") {
                if (entryType === "income") {
                    dispatch({ type: "income/add", payload: result.income });
                } else if (entryType === "expense") {
                    dispatch({ type: "expense/add", payload: result.expense });
                } else {
                    dispatch({ type: "savings/add", payload: result.savings });
                }
            }
        } catch (error) {
            console.error("Error adding entry:", error);
        }
    };
};
