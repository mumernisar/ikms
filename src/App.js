import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ArticleList from "./Pages/ArticleList";
import ArticleDetails from "./Pages/ArticleDetails";
import AdminArticleList from "./Pages/AdminArticleList";
import ArticleForm from "./Pages/ArticleForm";

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Change to 'false' for testing simple user

  return (
    <Router>
      <Routes>
        {/* Public Routes */}

        {/* Admin Routes */}
        {isAdmin ? (
          <>
            <Route path="/" element={<AdminArticleList />} />
            <Route path="/create-article" element={<ArticleForm />} />
            <Route path="/edit-article/:id" element={<ArticleForm />} />
          </>
        ) : (
          <>
            <Route path="/" element={<ArticleList />} />
            <Route path="/article/:id" element={<ArticleDetails />} />
          </>
          // <Route path="/admin/*" element={<Navigate to="/" />} /> // Redirect if not admin
        )}
      </Routes>
    </Router>
  );
}

export default App;
