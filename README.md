
# ShareRent - P2P Rental Platform

ShareRent is a peer-to-peer platform for renting items in your community.

## Connecting to Django Backend

This application is configured to connect to a Django backend API. Follow these steps to set up the connection:

1. Make sure your Django backend is running and accessible.

2. Create a `.env` file in the root directory of this project with the following content:
   ```
   VITE_API_URL=http://your-django-backend-url/api
   ```
   Replace `http://your-django-backend-url/api` with the actual URL of your Django API.

3. If you're running the Django backend locally on the default port, you can use:
   ```
   VITE_API_URL=http://127.0.0.1:8000/api
   ```

4. Make sure your Django API has a health check endpoint at `/api/health-check/` that returns a 200 status code.

5. Start the React application:
   ```
   npm run dev
   ```

## API Configuration

The frontend expects the following API endpoints on your Django backend:

- Authentication:
  - `/api/auth/login/`
  - `/api/auth/register/`
  - `/api/auth/profile/`

- Items:
  - `/api/items/`
  - `/api/items/:id/`
  - `/api/categories/`

- Bookings:
  - `/api/bookings/`
  - `/api/bookings/:id/`
  - `/api/bookings/:id/cancel/`

- Reviews:
  - `/api/reviews/`
  - `/api/reviews/:id/`

## Django Backend Requirements

Your Django backend should:

1. Use Django REST Framework
2. Implement JWT authentication
3. Return tokens in the format: `{ token: "your-jwt-token" }`
4. Handle CORS for cross-origin requests from the frontend

## Development

- Run development server:
  ```
  npm run dev
  ```

- Build for production:
  ```
  npm run build
  ```
