# Smart Expense Tracker

A beautiful, feature-rich personal budgeting application for tracking expenses, income, and spending patterns with stunning visualizations.

## Features

### Authentication
- **Secure Signup/Login** - User authentication with email and password
- **Session Management** - Persistent login using localStorage
- **User Profile** - Display user avatar and information

### Expense Management
- **CRUD Operations** - Create, Read, Update, and Delete expenses
- **Transaction Types** - Track both expenses and income
- **Categories** - Organize transactions by category (Food, Transport, Entertainment, Health, Education, Utilities, Income, Shopping, Other)
- **Date Tracking** - Record transaction dates and times

### Search & Filter
- **Search** - Find transactions by name or description
- **Filter by Category** - View transactions for specific categories
- **Filter by Month** - View transactions for specific months
- **Sort Options** - Sort by date (newest/oldest) or amount (high/low)

### Visualizations
- **Statistics Dashboard** - View total balance, income, and expenses at a glance
- **Pie Chart** - Visual breakdown of spending by category
- **Bar Chart** - Monthly income vs expenses comparison
- **Line Chart** - Balance trend over time
- **Timeline View** - Chronological view of all transactions

### User Experience
- **Onboarding Carousel** - Beautiful introduction to app features
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Smooth Animations** - Polished transitions and hover effects
- **Confirmation Dialogs** - Prevent accidental deletions
- **Loading States** - Clear feedback during operations
- **Category Icons** - Visual icons for each expense category

### State Management
- **React Context API** - Centralized state management
- **AuthContext** - Manages user authentication state
- **ExpenseContext** - Manages expense data and operations

## Tech Stack

- **React 18** - Modern React with hooks
- **JavaScript** - Vanilla JavaScript (no TypeScript in implementation)
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful, responsive charts
- **React Slick** - Smooth carousel for onboarding
- **Lucide React** - Modern icon library
- **Vite** - Fast build tool and dev server

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Current Setup

The app is currently using **dummy data** for demonstration purposes. All API integration code is written and commented out in the context files, ready to be activated when you connect to your backend.

## API Integration

To connect this app to your backend:

1. Read the **[API_INTEGRATION.md](./API_INTEGRATION.md)** file for detailed instructions
2. Uncomment the API calls in `src/context/AuthContext.jsx` and `src/context/ExpenseContext.jsx`
3. Comment out the dummy implementations
4. Set up your backend with the required endpoints

### Required API Endpoints

**Authentication:**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

**Expenses:**
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get single expense
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/search?keyword=...` - Search expenses
- `GET /api/expenses/filter?category=...&month=...` - Filter expenses
- `GET /api/expenses/sort?by=amount` - Sort expenses
- `GET /api/expenses/summary` - Get expense summary
- `GET /api/expenses/statistics` - Get statistics

## Project Structure

```
src/
├── components/
│   ├── Analytics/
│   │   ├── Charts.jsx         # All visualizations (Pie, Bar, Line charts)
│   │   └── Timeline.jsx       # Transaction timeline view
│   ├── Auth/
│   │   ├── Login.jsx          # Login form
│   │   └── Signup.jsx         # Signup form
│   ├── Dashboard/
│   │   ├── Header.jsx         # App header with user info
│   │   ├── StatsCard.jsx      # Statistics cards
│   │   ├── SearchBar.jsx      # Search input
│   │   └── FilterSort.jsx     # Filter and sort controls
│   ├── Expenses/
│   │   ├── ExpenseList.jsx    # List of transactions
│   │   ├── ExpenseForm.jsx    # Add/Edit form
│   │   └── DeleteConfirmation.jsx  # Confirmation modal
│   └── Onboarding.jsx         # Onboarding carousel
├── context/
│   ├── AuthContext.jsx        # Authentication state management
│   └── ExpenseContext.jsx     # Expense state management
├── data/
│   └── dummyData.js          # Dummy data for development
├── pages/
│   └── Dashboard.jsx         # Main dashboard page
├── App.tsx                   # Main app component
└── main.tsx                  # App entry point
```

## Features Walkthrough

### 1. Onboarding
First-time users see a beautiful carousel introducing the app's key features.

### 2. Authentication
Users can sign up or log in with email and password. The session persists across page refreshes.

### 3. Dashboard
The main dashboard shows:
- Three statistics cards (Balance, Income, Expenses)
- Add transaction button
- Search bar for finding transactions
- Filter controls for category and month
- Sort options for organizing transactions
- List of all transactions with edit/delete actions

### 4. Analytics
Visual representation of spending:
- Pie chart showing spending distribution by category
- Bar chart comparing monthly income vs expenses
- Line chart showing balance trend over time

### 5. Timeline
Chronological view of all transactions with category icons and color coding.

## Dummy Data

The app includes 15 sample transactions across different categories to demonstrate all features. Categories include:
- Food (Grocery, Restaurant, Coffee)
- Transport (Gas, Uber)
- Entertainment (Netflix, Movies)
- Health (Gym, Pharmacy)
- Education (Courses, Books)
- Utilities (Electric, Internet)
- Income (Salary, Freelance)

## Design Highlights

- **Modern Color Scheme** - Blues and greens with accent colors for categories
- **Smooth Transitions** - All interactions have smooth animations
- **Responsive Layout** - Works beautifully on all screen sizes
- **Intuitive UX** - Clear visual hierarchy and easy navigation
- **Professional Polish** - Production-ready design with attention to detail

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Credits

- Icons by [Lucide](https://lucide.dev/)
- Stock photos by [Pexels](https://www.pexels.com/)
- Charts by [Recharts](https://recharts.org/)
- Carousel by [React Slick](https://react-slick.neostack.com/)
