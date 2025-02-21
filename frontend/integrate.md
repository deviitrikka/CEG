Sure! Here's a simple, minimal project setup that will help you verify if your React frontend and FastAPI backend are properly integrated.

### Step 1: FastAPI Backend

First, we'll create a simple FastAPI app with a single `GET` endpoint that returns a list of items.

#### 1. Create a new directory for your backend project (e.g., `fastapi-backend`), and create a file `main.py`:

```python
# main.py
from fastapi import FastAPI

app = FastAPI()

# A sample route to return a list of items
@app.get("/items")
def get_items():
    return [{"id": 1, "name": "Item 1"}, {"id": 2, "name": "Item 2"}, {"id": 3, "name": "Item 3"}]
```

#### 2. Install FastAPI and Uvicorn

Inside your `fastapi-backend` directory, install the necessary dependencies:

```bash
pip install fastapi uvicorn
```

#### 3. Run FastAPI server

Now, run the FastAPI app with Uvicorn:

```bash
uvicorn main:app --reload
```

This will run the server on `http://localhost:8000`.

### Step 2: React Frontend

Next, we'll create a simple React app that fetches data from the FastAPI backend.

#### 1. Create a new React app:

In a separate directory (e.g., `react-frontend`), create a React app using `create-react-app`:

```bash
npx create-react-app react-frontend
cd react-frontend
```

#### 2. Install Axios (for HTTP requests):

Inside the `react-frontend` directory, install Axios:

```bash
npm install axios
```

#### 3. Create a simple component that fetches data from the FastAPI backend:

Open `src/App.js` and replace its content with this:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:8000/items';  // FastAPI backend URL

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from FastAPI backend
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setItems(response.data);  // Save the fetched data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Items</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
```

This code fetches the list of items from the FastAPI backend and displays them in a list.

#### 4. Start the React app:

In the `react-frontend` directory, start the React development server:

```bash
npm start
```

This will run the frontend on `http://localhost:3000`.

### Step 3: Ensure FastAPI CORS Setup

Since your React app and FastAPI app are running on different ports (`3000` for React and `8000` for FastAPI), you need to allow Cross-Origin Resource Sharing (CORS) in FastAPI.

In your `main.py` (FastAPI backend), add the following lines to enable CORS:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow React frontend to make requests
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/items")
def get_items():
    return [{"id": 1, "name": "Item 1"}, {"id": 2, "name": "Item 2"}, {"id": 3, "name": "Item 3"}]
```

### Step 4: Verify Integration

1. **Run the FastAPI backend:**

   In the `fastapi-backend` folder, run:

   ```bash
   uvicorn main:app --reload
   ```

   Your FastAPI server should be running at `http://localhost:8000`.

2. **Run the React frontend:**

   In the `react-frontend` folder, run:

   ```bash
   npm start
   ```

   Your React app should now be running at `http://localhost:3000`.

3. **Check the result:**

   Open `http://localhost:3000` in your browser. You should see a list of items like this:

   ```
   Items
   - Item 1
   - Item 2
   - Item 3
   ```

If you see this, it means your React frontend and FastAPI backend are successfully integrated!

### Optional Improvements
- Add more endpoints to FastAPI (e.g., `POST`, `PUT`, `DELETE`) and use these methods in your React app.
- Deploy your React app and FastAPI app for production.
- Use environment variables to handle API URLs in different environments.

Let me know if you need further clarification or assistance!