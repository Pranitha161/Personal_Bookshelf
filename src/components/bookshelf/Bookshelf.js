import React, { useState, useEffect } from 'react';

function Bookshelf() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBooks);
  }, []);

  return (
    <div className='container'>
      <h1 className='mt-4'>My Bookshelf</h1>
      <div className='row'>
        {bookshelf.length > 0 ? (
          bookshelf.map((book, index) => (
            <div className='col-md-4 mb-3' key={index}>
              <div className='card h-100'>
                <div className='card-body'>
                <h5 className="card-title">Book Title: {book.title}</h5>
                  <p className="card-text">Edition Count: {book.edition_count}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books in your bookshelf. Add some from the search page!</p>
        )}
      </div>
    </div>
  );
}

export default Bookshelf;
