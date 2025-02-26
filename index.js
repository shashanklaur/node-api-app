const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set up Pug as the template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Default Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));
const Project = require("./models/Project");
const Skill = require("./models/Skill");

// Admin Panel Route
app.get("/admin", (req, res) => {
    res.render("admin");
  });
// Admin: Manage Projects Page
app.get("/admin/projects", (req, res) => {
    res.render("projects");
  });
  // Handle Project Submission
app.post("/admin/projects/add", async (req, res) => {
    try {
      const { title, description, link } = req.body;
      const newProject = new Project({ title, description, link });
      await newProject.save();
      res.redirect("/admin/projects");
    } catch (err) {
      res.status(500).send("Error saving project.");
    }
  });
    // API: Get All Projects
app.get("/api/projects", async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });
  
  
  // Admin: Manage Skills Page
  app.get("/admin/skills", (req, res) => {
    res.render("skills");
  });
  // Handle Skill Submission
app.post("/admin/skills/add", async (req, res) => {
    try {
      const { name, level } = req.body;
      const newSkill = new Skill({ name, level });
      await newSkill.save();
      res.redirect("/admin/skills");
    } catch (err) {
      res.status(500).send("Error saving skill.");
    }
  });
  // API: Get All Skills
app.get("/api/skills", async (req, res) => {
    try {
      const skills = await Skill.find();
      res.json(skills);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });
    