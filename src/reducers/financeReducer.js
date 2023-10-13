const initialState = {
    income: [],
    expense: [],
    savings: [],
    loading: false,
    error: null,
};

export function financeReducer(state = initialState, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                loading: true,
            };
        case "income/fetch":
            return {
                ...state,
                income: action.payload,
                loading: false,
                error: null,
            };
        case "expense/fetch":
            return {
                ...state,
                expense: action.payload,
                loading: false,
                error: null,
            };
        case "savings/fetch":
            return {
                ...state,
                savings: action.payload,
                loading: false,
                error: null,
            };

        case "income/add":
            return {
                ...state,
                income: [...state.income, action.payload],
                loading: false,
                error: null,
            };
        case "expense/add":
            return {
                ...state,
                expense: [...state.expense, action.payload],
                loading: false,
                error: null,
            };
        case "savings/add":
            return {
                ...state,
                savings: [...state.savings, action.payload],
                loading: false,
                error: null,
            };
        default:
            return state;
    }
}
