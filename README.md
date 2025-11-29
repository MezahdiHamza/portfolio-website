# Portfolio Website

A modern, responsive portfolio website with a contact form feature, backend API, and database integration.

## Features

- 🎨 Modern and responsive design
- 📱 Mobile-friendly layout
- 📧 Contact form with backend integration
- 💾 SQLite database for storing messages
- 🚀 Express.js backend API
- ✨ Smooth animations and transitions

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Styling**: Custom CSS with gradients and animations

## Installation

1. Clone or download this repository

2. Install Node.js dependencies:
```bash
npm install
```

## Running the Application

1. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

The server will run on port 3000 by default. You can change this by setting the `PORT` environment variable.

## Project Structure

```
portfolio-website/
├── website/
│   ├── index.html          # Home page
│   ├── aboutme.html        # About page
│   ├── contact.html        # Contact form page
│   ├── style.css           # Main stylesheet
│   ├── script.js           # General JavaScript
│   └── contact.js          # Contact form handler
├── server.js               # Express backend server
├── database.sqlite         # SQLite database (created automatically)
├── package.json            # Node.js dependencies
└── README.md              # This file
```

## API Endpoints

### POST `/api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "id": 1
}
```

### GET `/api/contacts`
Get all contact messages (for viewing stored messages).

**Response:**
```json
{
  "contacts": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "I'd like to discuss...",
      "created_at": "2024-01-01 12:00:00"
    }
  ]
}
```

### GET `/api/contacts/:id`
Get a specific contact message by ID.

### GET `/api/health`
Health check endpoint.

## Database Schema

The `contacts` table has the following structure:

- `id` - INTEGER (Primary Key, Auto-increment)
- `name` - TEXT (Required)
- `email` - TEXT (Required)
- `subject` - TEXT (Required)
- `message` - TEXT (Required)
- `created_at` - DATETIME (Auto-generated timestamp)

## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and mobile devices
- Flexible navigation menu
- Adaptive image sizing

### Contact Form
- Client-side validation
- Server-side validation
- Email format validation
- Success/error messaging
- Loading states

## Development

To modify the database schema or add new features:

1. Edit `server.js` to add new routes or modify existing ones
2. Update the database schema in the `db.run()` call in `server.js`
3. Restart the server

## Notes

- The database file (`database.sqlite`) is created automatically on first run
- All contact messages are stored locally in the SQLite database
- CORS is enabled for API access
- The server serves static files from the `website` directory

## License

MIT
