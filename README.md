# School Library API

Simple library system for managing books, students, authors and attendants.

## What I Used

- Node.js
- Express
- MongoDB with Mongoose

## How to Run

1. Download the code
2. Run `npm install`
3. Add your MongoDB URI to a `.env` file:
4. 4. Run `node server.js`
5. Open Postman and test on `http://localhost:5001`

## API Routes

| Route | What It Does |
|-------|-------------|
| GET /api/authors | List all authors |
| POST /api/authors | Add new author |
| GET /api/books | List all books |
| POST /api/books | Add new book |
| POST /api/books/:id/borrow | Borrow a book |
| POST /api/books/:id/return | Return a book |
| GET /api/students | List all students |
| POST /api/students | Add new student |
| GET /api/attendants | List all attendants |
| POST /api/attendants | Add new attendant |

## Example: Create a Book

POST to `/api/books` with this body:
```json
{
  "title": "The Great Gatsby",
  "isbn": "978-0743273565",
  "authors": ["65f8a2b3c4d5e6f7a8b9c0d1"]
}
{
  "studentId": "65f8a2b3c4d5e6f7a8b9c0d2",
  "attendantId": "65f8a2b3c4d5e6f7a8b9c0d3",
  "returnDate": "2026-04-15"
}
