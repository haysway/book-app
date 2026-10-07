import { useState, useEffect, useCallback } from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchBooksHandler() {
    const response = await fetch("https://openlibrary.org/search.json?q=fiction&limit=10");
    const data = await response.json();
    
    const transformedData = data.docs.map((bookData) => {
      return {
        id: bookData.key,
        title: bookData.author,
        author: bookData.author_name,
        publishYear: bookData.first_publish_year
      };
    });

    setBooks(transformedData);

  }

  // TODO: Complete addBookHandler
  function addBookHandler() {}

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);

  let content = <p>No books found.</p>;

  if (books.length > 0) {
    content = <BookList books={books} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading books...</p>;
  }

  return (
    <main className="container">
      <section>
        <h2>Add New Book</h2>
        <AddBook onAddBook={addBookHandler} />
      </section>

      <section>
        <button onClick={fetchBooksHandler}>Fetch Books</button>
      </section>

      <section>{content}</section>
    </main>
  );
}

export default App;