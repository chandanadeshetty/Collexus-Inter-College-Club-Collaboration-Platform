# Collexus API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `POST /auth/logout` - User logout

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user profile
- `DELETE /users/:id` - Delete user account

### Clubs
- `GET /clubs` - Get all clubs with filters
- `GET /clubs/:id` - Get specific club
- `POST /clubs` - Create new club
- `PUT /clubs/:id` - Update club
- `DELETE /clubs/:id` - Delete club
- `POST /clubs/:id/join` - Join club
- `POST /clubs/:id/leave` - Leave club

### Events
- `GET /events` - Get all events with filters
- `GET /events/:id` - Get specific event
- `POST /events` - Create new event
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event
- `POST /events/:id/register` - Register for event
- `POST /events/:id/unregister` - Unregister from event

### Messages
- `GET /messages/:conversationId` - Get conversation messages
- `POST /messages` - Send new message
- `PUT /messages/:id` - Edit message
- `DELETE /messages/:id` - Delete message

### Reports
- `GET /reports` - Get all reports (moderators only)
- `POST /reports` - Submit new report
- `PUT /reports/:id` - Update report status
- `DELETE /reports/:id` - Delete report

## Error Responses
All endpoints return consistent error responses:
```json
{
  "message": "Error description",
  "errors": [] // Validation errors if any
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error