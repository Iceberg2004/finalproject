const express = require('express');
const OpenAI = require('openai');
const Resume = require('../models/Resume');

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create a resume
router.post('/', async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(201).json(resume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all resumes (basic list)
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single resume
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update resume
router.put('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete resume
router.delete('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json({ message: 'Resume deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// AI suggestions endpoint
// Accepts the current (possibly unsaved) resume data in the request body
// and returns section-by-section improvement suggestions.
router.post('/suggest', async (req, res) => {
  try {
    const resumeData = req.body;

    const prompt = `You are an expert resume reviewer. Given the following resume data as JSON,
provide concise, actionable improvement suggestions grouped by section
(Summary, Experience, Education, Skills). Focus on clarity, impact,
quantifiable achievements, and removing filler words. Keep the whole
response under 300 words.

Resume JSON:
${JSON.stringify(resumeData, null, 2)}`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful, concise resume-writing coach.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 500,
    });

    const suggestions = completion.choices[0]?.message?.content || '';
    res.json({ suggestions });
  } catch (err) {
    console.error('AI suggestion error:', err.message);
    res.status(500).json({ error: 'Failed to generate AI suggestions' });
  }
});

module.exports = router;
