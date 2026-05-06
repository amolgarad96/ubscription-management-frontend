# subscription-management-frontend

# Folder Structure

    subscription-management-frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── Component/                   # For reusable UI and logic
    │   │   ├── Dashboard/
    │   │   │   ├── DashboardSkeleton.tsx
    │   │   │   └── PieChart.tsx
    │   │   │
    │   │   ├── Subscription/
    │   │   │   ├── CancelModal.tsx
    │   │   │   ├── StatusBadge.tsx
    │   │   │   ├── SubscriptionCard.tsx
    │   │   │   └── SubscriptionCardSkeleton.tsx
    │   │   │
    │   │   ├── loading/
    │   │   │   └── Skeleton.tsx          # while loading it looks like actual component
    │   │   │
    │   │   └── ProtectedRoute.tsx
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

# Decisions & trade-offs

- React :
  - Used React with Vite for fast development and efficient rendering.
  - Component-based architecture helps in building reusable UI like SubscriptionCard, StatusBadge etc.
  - due to component code becomes modular, predictable and logic is encapsulated(seperation of concern)
  - we can use heavy operations using context api/hooks(e.g:Authentication).
  - we can write custom hooks so as application is smaller i have used custom hooks instead Redux but     application grows we can use redux to manage global state.


- appolo Client : 
    - Used Apollo Client to interact with the GraphQL backend.
    - Provides built-in hooks (useQuery, useMutation) for clean data fetching and state handling.
    - Handles caching, loading, and error states efficiently.

- Tailwind :
    - Used Tailwind CSS for rapid UI development and consistent styling.
    - Utility-first approach makes styling faster and responsive.

  Trade-offs:
   - Can lead to long class names

- Typescript :
    - I was chose this as programming language to know errors during compiletime instead runtime

- Custom Hook :
    - Created custom hook (e.g: useSubscriptions) to centralize API calls.
    - Keeps components clean and reusable.

# Future Improvements

- Replace mock frontend-only login with real JWT-based authentication
- Implement role-based access control (admin and customer)
- Protect all API calls with Authorization headers using tokens
- Subscription analytics will map with real data
- Email notifications for upcoming billing, skipped deliveries, cancellations