import { Routes, Route } from "react-router";
import { NavLink } from "react-router-dom";

import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Expense } from "./components/Expense/Expense";
import { Income } from "./components/Income/Income";
import { IncomeExpenseForm } from "./components/IncomeExpenseForm/IncomeExpenseForm";
import { Savings } from "./components/Savings/Savings";

function App() {
    return (
        <div>
            <nav style={{ display: "flex", gap: "20px" }}>
                <NavLink to="/">Add Entry</NavLink>
                <NavLink to="/income">Income</NavLink>
                <NavLink to="/expense">Expense</NavLink>
                <NavLink to="/savings">Savings</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <a
                    href="https://github.com/srinivas180/finance-management"
                    target="_blank"
                    rel="noreferrer"
                >
                    Github
                </a>
                <a
                    href="https://replit.com/@srinivas365/Assignment-19-Financial-Management-Backend"
                    target="_blank"
                    rel="noreferrer"
                >
                    Backend Code
                </a>
            </nav>

            <Routes>
                <Route path="/" element={<IncomeExpenseForm />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expense" element={<Expense />} />
                <Route path="/savings" element={<Savings />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
