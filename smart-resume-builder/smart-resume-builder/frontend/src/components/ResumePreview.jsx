export default function ResumePreview({ resume }) {
  return (
    <div
      id="resume-preview"
      className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 sticky top-8"
    >
      <h1 className="text-2xl font-bold">{resume.fullName || 'Your Name'}</h1>
      <p className="text-sm text-gray-600 mt-1">
        {[resume.email, resume.phone, resume.location].filter(Boolean).join(' · ')}
      </p>

      {resume.summary && (
        <div className="mt-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 border-b border-gray-200 pb-1 mb-2">
            Summary
          </h2>
          <p className="text-sm text-gray-800 whitespace-pre-line">{resume.summary}</p>
        </div>
      )}

      {resume.experience?.length > 0 && (
        <div className="mt-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 border-b border-gray-200 pb-1 mb-2">
            Experience
          </h2>
          <div className="space-y-3">
            {resume.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-medium">
                  <span>
                    {exp.role}
                    {exp.company ? ` · ${exp.company}` : ''}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-700 whitespace-pre-line mt-1">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.education?.length > 0 && (
        <div className="mt-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 border-b border-gray-200 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {resume.education.map((edu, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>
                  {edu.degree}
                  {edu.school ? ` · ${edu.school}` : ''}
                </span>
                <span className="text-gray-500 text-xs">
                  {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.skills?.length > 0 && (
        <div className="mt-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 border-b border-gray-200 pb-1 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
