# Address Book Application

A full-stack address book application built with Next.js, featuring CRUD operations, REST API, and token-based authentication.

## Features

- ✅ **Dashboard**: View all addresses in a tabular format
- ✅ **Add Address**: Create new addresses with name, gender, email, city, and bio
- ✅ **Edit Address**: Update existing addresses (loads previous data)
- ✅ **Delete Address**: Remove addresses from the database
- ✅ **Authentication**: Token-based login system for protected operations
- ✅ **REST API**: Complete API endpoints for all CRUD operations

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js/Express-like)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory with the following variables:
```env
MONGO_URI=mongodb://localhost:27017/addressbook
JWT_SECRET=your-secret-key-change-this-in-production
ADMIN_USER=admin
ADMIN_PASS=admin123
```

**Note**: 
- Replace `MONGO_URI` with your MongoDB connection string
- Change `JWT_SECRET` to a secure random string
- Update `ADMIN_USER` and `ADMIN_PASS` for your admin credentials

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **View Dashboard**: Navigate to the home page to see all addresses
2. **Login**: Click "Login" and use the admin credentials to access protected operations
3. **Add Address**: After logging in, click "Add New Address" to create a new entry
4. **Edit Address**: Click "Update" next to any address to modify it
5. **Delete Address**: Click "Delete" next to any address to remove it

## API Endpoints

- `GET /api/address` - Get all addresses (public)
- `POST /api/address` - Create a new address (requires authentication)
- `PUT /api/address` - Update an address (requires authentication)
- `DELETE /api/address?id={id}` - Delete an address (requires authentication)
- `POST /api/login` - Login and get JWT token

## Project Structure

```
addressbook_nextjs/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── address/
│   │   │   │   └── route.js      # Address CRUD API
│   │   │   └── login/
│   │   │       └── route.js      # Login API
│   │   ├── login/
│   │   │   └── page.js           # Login page
│   │   ├── page.js               # Dashboard
│   │   └── layout.js             # Root layout
│   ├── components/
│   │   └── AddressForm.js        # Add/Edit form component
│   └── lib/
│       ├── auth.js               # JWT verification
│       ├── db.js                 # MongoDB connection
│       └── models/
│           └── Address.js        # Address model
└── package.json
```

## Default Admin Credentials

- Username: `admin` (set in `.env.local` as `ADMIN_USER`)
- Password: `admin123` (set in `.env.local` as `ADMIN_PASS`)

**Important**: Change these credentials in production!
