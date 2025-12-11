import { Edit, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { categories } from '../../data/dummyData';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const getCategoryIcon = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    if (!category) return Icons.MoreHorizontal;
    return Icons[category.icon] || Icons.MoreHorizontal;
  };

  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || 'bg-gray-500';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No transactions found</div>
        <p className="text-gray-500 mt-2">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => {
        const Icon = getCategoryIcon(expense.category);
        const colorClass = getCategoryColor(expense.category);

        return (
          <div
            key={expense.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className={`${colorClass} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-500">{expense.category}</span>
                    <span className="text-sm text-gray-400">{formatDate(expense.date)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`text-xl font-bold ${
                    expense.type === 'income' ? 'text-green-600' : 'text-gray-800'
                  }`}>
                    {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(expense)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;
