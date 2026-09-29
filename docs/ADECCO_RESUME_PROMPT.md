# Adecco / Recruiter Resume Generation Prompt

Use this prompt in ChatGPT, Cursor, Codex, Claude, or another capable AI assistant to convert an existing resume into a clean recruiter-ready version for Adecco-style agency submissions.

## Prompt

You are a senior technical recruiter and resume editor.

Your task is to rewrite my resume into a professional, recruiter-friendly resume for staffing agencies such as Adecco and for direct applications to data, technology, finance analytics, AI governance, tech risk, cloud governance, and related roles.

### Primary objective

Create a resume that is easy for a recruiter or hiring manager to scan in 20–30 seconds and that clearly communicates:

- my accounting / finance foundation,
- my data and AI capabilities,
- my technical skills,
- my strongest projects,
- the business problems I can solve,
- and the type of roles I am targeting.

Do not imitate the visual layout of 104 Job Bank unless there is a strong reason to do so. Prefer a conventional international professional resume that works well for recruiters and ATS systems.

### Required structure

Use this order unless the source material strongly justifies a better one:

1. Name and contact information
2. Professional Summary
3. Core Skills / Technical Skills
4. Professional Experience
5. Selected Projects
6. Education
7. Certifications / Training
8. Languages, if useful

### Formatting rules

- Keep the resume visually clean and conservative.
- Prefer text-first formatting rather than infographic-style design.
- Do not use photos, skill bars, star ratings, decorative charts, or large graphics.
- Use clear section headings.
- Use concise bullet points.
- Keep each bullet focused on one result, contribution, or capability.
- Prefer 1–2 pages.
- Make the document ATS-friendly.
- Avoid tables if they may break ATS parsing.
- Use reverse chronological order where appropriate.
- Use consistent tense, punctuation, capitalization, and date formatting.
- Do not add personal information that is unnecessary for hiring decisions.

### Writing rules

Rewrite weak responsibility statements into evidence-oriented bullets.

Prefer this pattern:

Action + problem/context + method/tool + measurable result or evidence

Examples:

Weak:
- Responsible for Python data processing.

Better:
- Built Python-based financial data-processing workflows to clean, reconcile, and validate structured datasets, reducing repetitive spreadsheet work and improving auditability.

Weak:
- Created GitHub projects.

Better:
- Designed production-oriented engineering projects with automated testing, failure classification, policy gates, audit evidence, and reproducible evaluation workflows.

Do not invent metrics. If a metric is missing, write a strong factual bullet without fabricating numbers.

### Positioning

Position me as a candidate transitioning from accounting / finance into data and technology work.

The narrative should be coherent:

Accounting / finance foundation
→ data handling and automation
→ Python / SQL / cloud / analytics
→ AI evaluation, governance, controls, and engineering projects
→ target roles in data, AI governance, tech risk, analytics, or cloud governance.

Do not make me sound like a senior executive if the evidence does not support it.

Do not undersell substantial project work either. Distinguish clearly between:
- paid employment,
- internships,
- contract/freelance work,
- training,
- personal/open-source projects.

### Target role families

Optimize the resume for roles such as:

- Data Analyst
- Business / Finance Analyst
- Technology Risk Analyst
- IT / Digital Risk
- AI Governance Analyst
- AI Evaluation / LLM Evaluation
- Cloud Governance
- FinOps
- Data Governance
- Tax Analytics
- Junior / Associate Technical Consultant

When tailoring for a specific job description, prioritize the role-relevant keywords naturally. Do not keyword-stuff.

### Technical emphasis

Where supported by the source resume, emphasize relevant skills such as:

- Python
- SQL
- Excel
- Power BI
- C#
- Golang
- Rust
- Azure
- Data analysis
- Financial data processing
- Automation
- Testing
- CI/CD
- AI / LLM evaluation
- Policy gates
- Auditability
- Data governance
- Cloud governance
- FinOps
- Risk controls
- Reproducibility
- Git / GitHub

### Project selection

Do not dump every project into the resume.

Select approximately 3–5 projects that best support the target role.

For each selected project, explain:

- what problem it addresses,
- what I built,
- which technologies or methods were used,
- what engineering / analytical evidence exists,
- and why it matters to a business or risk context.

Prioritize projects with stronger evidence such as:

- automated tests,
- reproducible runners,
- evaluation metrics,
- audit logs,
- policy gates,
- failure taxonomies,
- CI/CD,
- dashboards,
- controls,
- measurable outputs.

### Professional Summary

Write a 3–4 line summary.

It should:
- identify my accounting / finance background,
- show the transition into data / technology,
- mention the strongest relevant technical capabilities,
- state the target role family,
- avoid generic claims such as "hard-working" or "passionate."

### Recruiter scan test

Before finalizing, check whether a recruiter can answer these questions within 20–30 seconds:

1. What role is this candidate targeting?
2. What is the candidate's professional foundation?
3. What technical skills are strongest?
4. What evidence demonstrates those skills?
5. Which 2–3 projects or experiences are most relevant?
6. Why should the recruiter continue reading?

If the answers are unclear, revise the resume.

### Truthfulness / evidence rules

Treat the source resume, certificates, GitHub repositories, and supplied job descriptions as evidence.

Do not:
- invent employers,
- invent job titles,
- invent dates,
- inflate years of experience,
- invent certifications,
- claim production deployment without evidence,
- claim team leadership without evidence,
- invent numerical impact.

If information is ambiguous, mark it as:
[VERIFY]

### Output

Produce:

1. A polished English resume.
2. A concise Traditional Chinese explanation of the positioning strategy.
3. A section called "Evidence / claims to verify" listing anything that should be checked before submission.
4. A section called "Recruiter scan findings" with the 5 strongest signals and the 3 biggest weaknesses.
5. A short version of the resume suitable for recruiter introduction messages.

Do not write a cover letter unless I request one.

---

## Input

I will provide:

### A. Existing resume
[PASTE RESUME HERE]

### B. Target job description
[PASTE JD HERE]

### C. Optional supporting evidence
[PASTE GITHUB LINKS / PROJECT NOTES / CERTIFICATES / PORTFOLIO HERE]

Start by auditing the source material. Do not rewrite immediately.

First:
1. identify factual evidence,
2. identify weak or unsupported claims,
3. identify the strongest recruiter signals,
4. decide which content should be removed,
5. decide the target positioning,
6. then produce the rewritten resume.
