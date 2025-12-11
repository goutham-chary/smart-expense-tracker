import * as Icons from 'lucide-react';
import { categories } from '../../data/dummyData';

const Timeline = ({ expenses }) => {
  const getCategoryIcon = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    if (!category) return Icons.MoreHorizontal;
    return Icons[category.icon] || Icons.MoreHorizontal;
  };

  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || 'bg-gray-500';
  };

  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Transaction Timeline</h3>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-6">
          {sortedExpenses.map((expense, index) => {
            const Icon = getCategoryIcon(expense.category);
            const colorClass = getCategoryColor(expense.category);

            return (
              <div key={expense.id} className="relative pl-16">
                <div className={`absolute left-0 ${colorClass} p-2 rounded-full`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{expense.description}</h4>
                      <p className="text-sm text-gray-500">{expense.category}</p>
                    </div>
                    <span className={`text-lg font-bold ${
                      expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{formatDate(expense.date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
