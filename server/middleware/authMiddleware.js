
// In a simple web application using Express.js, middleware is essentially a function that sits between the client's request and the final route handler (the function that sends the response).Think of middleware as a security checkpoint or a processing station that every request must pass through.A request comes in $\rightarrow$ Middleware 1 runs (e.g., logging the request time) $\rightarrow$ Middleware 2 runs (e.g., checking if the user is authenticated) $\rightarrow$ Final Route Handler runs (e.g., fetching profile data).
// The key features of middleware are:It has access to the request object (req), 
// the response object (res), and the next function.It can execute any code.It can make changes to the request and response objects.It can end the request-response cycle (by sending a response, like a 401 error).
// If it doesn't end the cycle, it must call next() to pass control to the next middleware function or the final route handler.🔑 Explanation of the authMiddleware CodeThis specific code defines an Authentication Middleware called authMiddleware. 
// Its sole purpose is to check if a user is logged in and authorized to access a specific route. It is designed to be placed on protected routes (like a user's dashboard or profile settings).Here's a step-by-step breakdown:🚪 Get the Token (const token = req.header("Authorization");)
// It tries to read the authorization information from the request headers. The standard way to send a JWT is in a header called Authorization, usually formatted as "Bearer [token_string]".🛑 Check for Missing Token (if (!token)...)If no Authorization header or token is found, the middleware stops the request and sends a 401 Unauthorized status back to the client with the message, "No token provided".
//  It doesn't call next().🔍 Verify the TokenThe code wraps the token verification in a try...catch block because verification can fail.Strip "Bearer ": It removes the "Bearer " prefix from the header string (token.replace("Bearer ", "")) to get just the raw token value.Verify JWT: It uses jwt.verify() to check two things:
//  a.  Is the token valid (not expired and correctly structured)
//  b.  Was the token signed using the application's secret key (process.env.JWT_SECRET)?If successful, jwt.verify returns the decoded payload (which contains the user's ID, as defined in your login route).
//     ✅ Attach User Data and ContinueIf verification is successful, the decoded user data (including the id) is attached to the request object: req.user = decoded;. This makes the user's identity available to the final route handler.next(); is called. 
//  This is crucial—it tells Express to proceed to the next function in the chain, which is typically the function that handles the business logic for the protected route.🚫 Handle Invalid Token (catch (err)...)If the token is expired, tampered with, or signed with a different key, jwt.verify throws an error.The catch block executes, stops the request, and sends a 401 Unauthorized status with the message, "Invalid token".

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
