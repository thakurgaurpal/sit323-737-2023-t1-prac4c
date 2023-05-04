//Login and return JWT

const express = require("express");
const jsonwebtoken = require("jsonwebtoken");


const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(`${username} is trying to login ..`);

  if (username === "admin" && password === "admin") {
    return res.json({
      token: jsonwebtoken.sign({ user: "admin" }, JWT_SECRET),
    });
  }

  return res
    .status(401)
    .json({ message: " Invalid username and password " });
});
const port=3000;
app.listen(port,()=> {
    console.log(" I'm listening to port " +port);
})

// Sending token to super secure resources for verifying to gain access

app.get("/super-secure-resource", (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Non-authorized, acxcess denied" });
    }
  
    // Using Bearer token
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1]; 
    try {


      // Token velidation on postman
      const { user } = jsonwebtoken.verify(token, JWT_SECRET);
      return res.status(200).json({
        message: `Congrats ${user}! You can now accesss the super secret resource`,
      });
    } catch (error) {
      return res.status(401).json({ error: "Not Authorized" });
    }
  });
  