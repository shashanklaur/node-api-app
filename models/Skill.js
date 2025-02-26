const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Skill = mongoose.model("Skill", SkillSchema);
module.exports = Skill;
