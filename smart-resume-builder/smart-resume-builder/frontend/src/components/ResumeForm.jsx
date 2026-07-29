export default function ResumeForm({ resume, setResume }) {
  const updateField = (field, value) => setResume((r) => ({ ...r, [field]: value }));

  const updateExperience = (index, field, value) => {
    const updated = [...resume.experience];
    updated[index] = { ...updated[index], [field]: value };
    updateField('experience', updated);
  };

  const addExperience = () =>
    updateField('experience', [
      ...resume.experience,
      { company: '', role: '', startDate: '', endDate: '', description: '' },
    ]);

  const removeExperience = (index) =>
    updateField(
      'experience',
      resume.experience.filter((_, i) => i !== index)
    );

  const updateEducation = (index, field, value) => {
    const updated = [...resume.education];
    updated[index] = { ...updated[index], [field]: value };
    updateField('education', updated);
  };

  const addEducation = () =>
    updateField('education', [
      ...resume.education,
      { school: '', degree: '', startDate: '', endDate: '' },
    ]);

  const removeEducation = (index) =>
    updateField(
      'education',
      resume.education.filter((_, i) => i !== index)
    );

  const updateSkills = (value) =>
    updateField(
      'skills',
      value.split(',').map((s) => s.trim()).filter(Boolean)
    );

  const inputClass =
    'w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500';
  const labelClass = 'block text-xs font-medium text-gray-600 mb-1';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <section>
        <h2 className="font-semibold mb-3">Contact Info</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              className={inputClass}
              value={resume.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              className={inputClass}
              value={resume.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              className={inputClass}
              value={resume.phone}
              onChange={(e) => updateField('phone', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input
              className={inputClass}
              value={resume.location}
              onChange={(e) => updateField('location', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Summary</h2>
        <textarea
          className={inputClass}
          rows={4}
          value={resume.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          placeholder="A short professional summary…"
        />
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Experience</h2>
          <button
            onClick={addExperience}
            className="text-sm text-indigo-600 hover:underline"
          >
            + Add
          </button>
        </div>
        <div className="space-y-4">
          {resume.experience.map((exp, i) => (
            <div key={i} className="border border-gray-200 rounded-md p-3 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <input
                  className={inputClass}
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(i, 'company', e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) => updateExperience(i, 'role', e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Start date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(i, 'startDate', e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="End date"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(i, 'endDate', e.target.value)}
                />
              </div>
              <textarea
                className={inputClass}
                rows={2}
                placeholder="Description / achievements"
                value={exp.description}
                onChange={(e) => updateExperience(i, 'description', e.target.value)}
              />
              <button
                onClick={() => removeExperience(i)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Education</h2>
          <button
            onClick={addEducation}
            className="text-sm text-indigo-600 hover:underline"
          >
            + Add
          </button>
        </div>
        <div className="space-y-4">
          {resume.education.map((edu, i) => (
            <div key={i} className="border border-gray-200 rounded-md p-3 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <input
                  className={inputClass}
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => updateEducation(i, 'school', e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(i, 'degree', e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Start date"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(i, 'startDate', e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="End date"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(i, 'endDate', e.target.value)}
                />
              </div>
              <button
                onClick={() => removeEducation(i)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Skills</h2>
        <input
          className={inputClass}
          placeholder="Comma-separated, e.g. React, Node.js, MongoDB"
          value={resume.skills.join(', ')}
          onChange={(e) => updateSkills(e.target.value)}
        />
      </section>
    </div>
  );
}
