const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, default: '' },
    role: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const EducationSchema = new mongoose.Schema(
  {
    school: { type: String, default: '' },
    degree: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
  },
  { _id: false }
);

const ResumeSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    summary: { type: String, default: '' },
    experience: { type: [ExperienceSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    skills: { type: [String], default: [] },
    lastAISuggestions: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', ResumeSchema);
