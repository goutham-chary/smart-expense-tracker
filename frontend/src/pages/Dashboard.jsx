import { useState, useEffect } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { Wallet, TrendingDown, TrendingUp, Plus, BarChart3, Clock } from 'lucide-react';
import Header from '../components/Dashboard/Header';
import StatsCard from '../components/Dashboard/StatsCard';
import SearchBar from '../components/Dashboard/SearchBar';
import FilterSort from '../components/Dashboard/FilterSort';
import ExpenseList from '../components/Expenses/ExpenseList';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import DeleteConfirmation from '../components/Expenses/DeleteConfirmation';
import Charts from '../components/Analytics/Charts';
import Timeline from '../components/Analytics/Timeline';

const Dashboard = () => {
  const {
    expenses,
    loading,
    addExpense,
    updateExpense,
    deleteExpense,
    searchExpenses,
    filterExpenses,
    sortExpenses,
    getStatistics
  } = useExpense();

  const [view, setView] = useState('transactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: 'all', month: '' });
  const [sortBy, setSortBy] = useState('date-new');
  const [displayedExpenses, setDisplayedExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let result = [...expenses];

    if (searchTerm) {
      result = expenses.filter(exp =>
        exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      result = filterExpenses(filters.category, filters.month);
    }

    result = sortExpenses(result, sortBy);
    setDisplayedExpenses(result);
  }, [expenses, searchTerm, filters, sortBy]);

  const stats = getStatistics();
  const totalExpenses = expenses
    .filter(exp => exp.type === 'expense')
    .reduce((sum, exp) => sum + exp.amount, 0);
  const totalIncome = expenses
    .filter(exp => exp.type === 'income')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const handleAddExpense = async (expenseData) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, expenseData);
    } else {
      await addExpense(expenseData);
    }
    setShowForm(false);
    setEditingExpense(null);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingId) {
      await deleteExpense(deletingId);
      setDeletingId(null);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      setFilters({ category: 'all', month: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Balance"
            amount={totalIncome - totalExpenses}
            icon={Wallet}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatsCard
            title="Total Income"
            amount={totalIncome}
            icon={TrendingUp}
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatsCard
            title="Total Expenses"
            amount={totalExpenses}
            icon={TrendingDown}
            bgColor="bg-red-100"
            iconColor="text-red-600"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setView('transactions')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'transactions'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Transactions
              </button>
              <button
                onClick={() => setView('analytics')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  view === 'analytics'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
              <button
                onClick={() => setView('timeline')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  view === 'timeline'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Clock className="w-4 h-4" />
                Timeline
              </button>
            </div>
          </div>

          <div className="p-6">
            {view === 'transactions' && (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
                  <button
                    onClick={() => {
                      setEditingExpense(null);
                      setShowForm(true);
                    }}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Transaction
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <SearchBar
                    searchTerm={searchTerm}
                    onSearch={handleSearch}
                    onClear={() => setSearchTerm('')}
                  />
                  <FilterSort
                    filters={filters}
                    onFilterChange={setFilters}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                  />
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : (
                  <ExpenseList
                    expenses={displayedExpenses}
                    onEdit={handleEdit}
                    onDelete={setDeletingId}
                  />
                )}
              </>
            )}

            {view === 'analytics' && <Charts expenses={expenses} />}

            {view === 'timeline' && <Timeline expenses={expenses} />}
          </div>
        </div>
      </main>

      {showForm && (
        <ExpenseForm
          expense={editingExpense}
          onSubmit={handleAddExpense}
          onCancel={() => {
            setShowForm(false);
            setEditingExpense(null);
          }}
        />
      )}

      {deletingId && (
        <DeleteConfirmation
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
