import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookSearch.css';
import { NavLink } from 'react-router-dom';

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookshelf, setBookshelf] = useState(() => {
    const savedBookshelf = localStorage.getItem('bookshelf');
    return savedBookshelf ? JSON.parse(savedBookshelf) : [];
  });

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    setBookshelf(updatedBookshelf);
    alert('Book added to bookshelf!');
  };

  const isBookInBookshelf = (book) => {
    return bookshelf.some(item => item.key === book.key);
  };

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
        .then(response => {
          setBooks(response.data.docs);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    } else {
      setBooks([]);
    }
  }, [query]);

  return (
    <div className="container">
        <div className='d-flex justify-content-between'>
            <div>
      <h1 className="title">Search by book name:</h1>
      <input
        type="text"
        className="form-control mb-4"
        
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      </div>
       <NavLink to="/bookshelf" className="nav-link bg-success text-white">
              My Bookshelf
            </NavLink>
            </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div className="col-md-4 mb-3" key={book.key}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Book Title: {book.title}</h5>
                  <p className="card-text">Edition Count: {book.edition_count}</p>
                  {!isBookInBookshelf(book) && (
                    <button onClick={() => addToBookshelf(book)} className="btn btn-success mt-2">Add to Bookshelf</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookSearch;
