import { createContext, useContext, useState, useEffect } from 'react';
import { dummyExpenses } from '../data/dummyData';

const ExpenseContext = createContext();

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchExpenses();
    }
  }, []);


  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return { success: false, error: "No token found" };
      console.log(expense);

      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(expense)
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || "Failed to add expense" };
      }

      setExpenses(prev => [data, ...prev]);

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to add expense' };
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedExpense)
      });
      const data = await response.json();
      setExpenses(expenses.map(exp => exp.id === id ? data : exp));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update expense' };
    }

  };

  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setExpenses(expenses.filter(exp => exp.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete expense' };
    }

  };

  const searchExpenses = async (keyword) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/expenses/search?keyword=${keyword}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }

  };

  const filterExpenses = (category, month) => {
    let filtered = [...expenses];

    if (category && category !== 'all') {
      filtered = filtered.filter(exp => exp.category === category);
    }

    if (month) {
      filtered = filtered.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === parseInt(month);
      });
    }

    return filtered;
  };

  const sortExpenses = (expensesList, sortBy) => {
    const sorted = [...expensesList];

    switch (sortBy) {
      case 'amount-high':
        return sorted.sort((a, b) => b.amount - a.amount);
      case 'amount-low':
        return sorted.sort((a, b) => a.amount - b.amount);
      case 'date-new':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'date-old':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return sorted;
    }
  };

  const getStatistics = () => {
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalIncome = expenses
      .filter(exp => exp.type === 'income')
      .reduce((sum, exp) => sum + exp.amount, 0);

    const categoryTotals = expenses.reduce((acc, exp) => {
      if (!acc[exp.category]) {
        acc[exp.category] = 0;
      }
      acc[exp.category] += exp.amount;
      return acc;
    }, {});

    return {
      totalExpense,
      totalIncome,
      balance: totalIncome - totalExpense,
      categoryTotals,
      transactionCount: expenses.length
    };
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      loading,
      fetchExpenses,
      addExpense,
      updateExpense,
      deleteExpense,
      searchExpenses,
      filterExpenses,
      sortExpenses,
      getStatistics
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};
