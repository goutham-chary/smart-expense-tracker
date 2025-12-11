import { useAuth } from '../../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">$</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">ExpenseTracker</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <User

                className="w-5 h-5" />
              {/* <Avatar sx={{ bgcolor: deepOrange[500] }}>{localStorage.getItem("user")[1]}</Avatar> */}
              <div className="">
                <p className="text-sm font-medium text-gray-800">{JSON.parse(localStorage.getItem("user"))}</p>
                <p className="text-xs text-gray-500">{localStorage.getItem("email")}</p>
              </div>
            </div>

            <button
              title="Logout"
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
