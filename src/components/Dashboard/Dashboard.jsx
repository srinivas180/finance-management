import { useState } from "react";
import { useSelector } from "react-redux";

export function Dashboard() {
    const [reportType, setReportType] = useState("");
    const [report, setReport] = useState({
        totalIncome: 0,
        totalExpense: 0,
        savings: 0,
        expenseBreakdown: {},
    });

    const income = useSelector((state) => state.income);
    const expense = useSelector((state) => state.expense);

    function generateReport() {
        if (reportType === "incomeVsExpense") {
            const totalIncome = income.reduce(
                (acc, inc) => inc.amount + acc,
                0
            );
            const totalExpense = expense.reduce(
                (acc, transaction) => transaction.amount + acc,
                0
            );
            const savings = totalIncome - totalExpense;

            setReport((report) => ({
                ...report,
                totalIncome,
                totalExpense,
                savings,
            }));
        } else if (reportType === "expenseBreakdown") {
            const expenseBreakdown = {};
            expense.forEach((transaction) => {
                const { category, amount } = transaction;
                if (expenseBreakdown[category]) {
                    expenseBreakdown[category] += amount;
                } else {
                    expenseBreakdown[category] = amount;
                }
            });
            setReport((report) => ({
                ...report,
                expenseBreakdown,
            }));
        }
    }

    return (
        <div>
            <div>
                <h2>Financial Reports</h2>
                <label>Report type:</label>
                <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                >
                    <option value="">Select report type</option>
                    <option value="incomeVsExpense">Income Vs Expense</option>
                    <option value="expenseBreakdown">Expense Breakdown</option>
                </select>

                <button onClick={generateReport}>Generate Report</button>
            </div>
            <div>
                {report.totalIncome > 0 && reportType === "incomeVsExpense" && (
                    <>
                        <h3>Income vs Expense Report</h3>
                        <p>Total Income: {report.totalIncome}</p>
                        <p>Total Expenses: {report.totalExpense}</p>
                        <p>Savings: {report.savings}</p>
                    </>
                )}
                {Object.keys(report.expenseBreakdown).length > 0 &&
                    reportType === "expenseBreakdown" && (
                        <>
                            <h3>Expense Breakdown Report</h3>
                            <ul>
                                {Object.keys(report.expenseBreakdown).map(
                                    (category, index) => (
                                        <li key={index}>
                                            {category}:
                                            {report.expenseBreakdown[category]}
                                        </li>
                                    )
                                )}
                            </ul>
                        </>
                    )}
            </div>
        </div>
    );
}
