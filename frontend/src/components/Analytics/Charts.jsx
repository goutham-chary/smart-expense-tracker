import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

const Charts = ({ expenses }) => {
  const categoryData = expenses.reduce((acc, exp) => {
    if (exp.type === 'expense') {
      const existing = acc.find(item => item.name === exp.category);
      if (existing) {
        existing.value += exp.amount;
      } else {
        acc.push({ name: exp.category, value: exp.amount });
      }
    }
    return acc;
  }, []);

  const monthlyData = expenses.reduce((acc, exp) => {
    const date = new Date(exp.date);
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    const existing = acc.find(item => item.month === monthName);

    if (existing) {
      if (exp.type === 'expense') {
        existing.expenses += exp.amount;
      } else {
        existing.income += exp.amount;
      }
    } else {
      acc.push({
        month: monthName,
        expenses: exp.type === 'expense' ? exp.amount : 0,
        income: exp.type === 'income' ? exp.amount : 0
      });
    }
    return acc;
  }, []);

  const trendData = expenses
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, exp, index) => {
      const date = new Date(exp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const prevBalance = index > 0 ? acc[acc.length - 1].balance : 0;
      const balance = exp.type === 'income'
        ? prevBalance + exp.amount
        : prevBalance - exp.amount;

      acc.push({ date, balance });
      return acc;
    }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="income" fill="#10B981" name="Income" />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Balance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Balance"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
