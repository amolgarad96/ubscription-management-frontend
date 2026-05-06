# subscription-management-frontend

# Folder Structure

    subscription-management-frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── Component/                   # For reusable UI and logic
    │   │   ├── CancelModal.tsx
    │   │   ├── PieChart.tsx
    │   │   ├── ProtectedRoute.tsx
    │   │   ├── StatusBadge.tsx
    │   │   └── SubscriptionCard.tsx
    │   ├── context/
    │   │   └── AuthContext.tsx           # Add login, logout authentication
    │   ├── graphql/
    │   │   ├── mutation.ts               # To write in graphql
    │   │   └── queries.ts                # To Read in graphql
    │   ├── hooks/
    │   │   └── useSubscriptions.ts        # custom hook
    │   ├── Layout/
    │   │   └── layout.tsx                # Sidebar logic
    │   ├── Pages/                        # application pages
    │   │   ├── Dashboard.tsx
    │   │   ├── Home.tsx
    │   │   ├── Login.tsx
    │   │   └── subscriptions.tsx
    │   ├── App.css
    │   ├── App.tsx                        # handle routing                   
    │   ├── appoloClient.ts                # appolo client connection
    │   ├── index.css
    │   ├── main.tsx
    │   └── types.ts                  
    ├── .env                               # store username password and other credentials
    ├── .env.example                       # example of what include in env
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts


# Tech Stacks

- React JS library to implement frontend application
- use appolo client for connection with graphql
- use tailwind css for styling purpose
- e-charts for showing analytics in pie chart

# Setup Instructions

    Run following commands

    git clone <repo-url>
    npm install

    Create a .env file in the root:
    add keys-value based on .env.example file

    Run project using
    npm run dev



# Future Improvements

- Replace mock frontend-only login with real JWT-based authentication
- Implement role-based access control (admin and customer)
- Protect all API calls with Authorization headers using tokens
- Subscription analytics will map with real data
- Email notifications for upcoming billing, skipped deliveries, cancellations