// const { callCohereJSON, callCohereText } = require('./cohere.service');
// const { calculateBenchmarkKeywordMatch } = require('./benchmarks.service');
// const {
//   detectSections,
//   detectFormattingIssues,
//   calculateContentCompleteScore,
//   calculateAchievementsScore,
// } = require('./parser.service');

// // Scoring weights (no JD mode)
// const ATS_WEIGHTS = {
//   keywords: 0.30,
//   formatting: 0.20,
//   achievements: 0.20,
//   contentComplete: 0.15,
//   roleAlignment: 0.15,
// };

// /**
//  * Get ATS grade from score
//  */
// function getATSGrade(score) {
//   if (score >= 90) return { grade: 'A+', label: 'Excellent', color: '#22c55e' };
//   if (score >= 80) return { grade: 'A', label: 'Very Good', color: '#84cc16' };
//   if (score >= 70) return { grade: 'B', label: 'Good', color: '#eab308' };
//   if (score >= 60) return { grade: 'C', label: 'Average', color: '#f97316' };
//   if (score >= 50) return { grade: 'D', label: 'Below Average', color: '#ef4444' };
//   return { grade: 'F', label: 'Poor', color: '#dc2626' };
// }

// /**
//  * Step 1: Detect role and industry from resume using Cohere
//  */
// async function detectRoleFromResume(resumeText) {
//   const prompt = `Analyze this resume and extract the following information.

// Resume Text:
// ${resumeText.substring(0, 3000)}

// Return a JSON object with these fields:
// {
//   "jobFunction": "The most likely job role (e.g. Backend Engineer, Data Scientist, Product Manager, Financial Analyst, etc.)",
//   "seniorityLevel": "Entry Level OR Mid Level OR Senior Level OR Lead/Manager",
//   "industry": "Primary industry (e.g. Technology, Finance, Healthcare, Marketing, etc.)",
//   "yearsOfExperience": <number or 0>,
//   "currentTitle": "Most recent job title from the resume or null",
//   "topSkills": ["up to 6 key skills found in the resume"]
// }

// Rules:
// - yearsOfExperience should be estimated from dates in experience section
// - jobFunction should be specific, not generic
// - Return only valid JSON`;

//   try {
//     const result = await callCohereJSON(prompt);
//     return result;
//   } catch (e) {
//     // Fallback if JSON parse fails
//     return {
//       jobFunction: 'Software Engineer',
//       seniorityLevel: 'Mid Level',
//       industry: 'Technology',
//       yearsOfExperience: 0,
//       currentTitle: null,
//       topSkills: [],
//     };
//   }
// }

// /**
//  * Step 2: Calculate role alignment score using Cohere
//  */
// async function calculateRoleAlignment(resumeText, roleInfo) {
//   const prompt = `You are an expert recruiter. Score this resume's alignment to the detected role.

// Detected Role: ${roleInfo.jobFunction}
// Seniority: ${roleInfo.seniorityLevel}
// Industry: ${roleInfo.industry}

// Resume (excerpt):
// ${resumeText.substring(0, 2000)}

// Score the alignment from 0 to 100 based on:
// - Does the candidate's experience match the role?
// - Are the right skills present for this specific role?
// - Is the career progression logical for this role and seniority?
// - Does the resume content feel authentic for this job function?

// Return JSON:
// {
//   "score": <number 0-100>,
//   "reasoning": "One concise sentence explaining the score",
//   "strengths": ["2-3 specific strengths for this role"],
//   "gaps": ["2-3 specific gaps for this role"]
// }`;

//   try {
//     return await callCohereJSON(prompt);
//   } catch (e) {
//     return { score: 50, reasoning: 'Could not analyze role alignment', strengths: [], gaps: [] };
//   }
// }

// /**
//  * Step 3: Generate actionable feedback using Cohere
//  */
// async function generateFeedback(resumeText, scoreData, roleInfo) {
//   const prompt = `You are a professional resume coach specializing in ATS optimization.

// Candidate Role: ${roleInfo.jobFunction} (${roleInfo.seniorityLevel})
// ATS Score: ${scoreData.totalScore}/100

// Score Breakdown:
// - Keywords & Skills: ${scoreData.breakdown.keywords.score}/100
// - Formatting: ${scoreData.breakdown.formatting.score}/100
// - Achievements: ${scoreData.breakdown.achievements.score}/100
// - Section Completeness: ${scoreData.breakdown.contentComplete.score}/100
// - Role Alignment: ${scoreData.breakdown.roleAlignment.score}/100

// Missing Keywords: ${scoreData.keywords.missingKeywords.join(', ')}
// Formatting Issues: ${scoreData.formatting.issues.join('; ') || 'None'}
// Missing Sections: ${scoreData.sections.missingSections.join(', ') || 'None'}

// Resume excerpt:
// ${resumeText.substring(0, 1500)}

// Provide specific, actionable feedback. Return JSON:
// {
//   "topImprovements": [
//     {
//       "priority": "HIGH",
//       "category": "Keywords",
//       "action": "Specific action to take",
//       "impact": "What this will improve"
//     }
//   ],
//   "quickWins": ["3-4 quick things they can fix in under 5 minutes"],
//   "overallAdvice": "2-3 sentences of overall coaching advice"
// }

// Rules:
// - topImprovements: exactly 4 items, mix of HIGH/MEDIUM priority
// - quickWins: 3-4 items maximum
// - Be specific and actionable, not generic
// - Reference actual content from the resume where possible`;

//   try {
//     return await callCohereJSON(prompt);
//   } catch (e) {
//     return {
//       topImprovements: [],
//       quickWins: ['Add quantified achievements to bullet points', 'Include a professional summary', 'Add relevant skills section'],
//       overallAdvice: 'Focus on quantifying your achievements and ensuring your resume includes role-relevant keywords.',
//     };
//   }
// }

// /**
//  * MAIN: Calculate complete ATS score for a resume
//  */
// async function calculateATSScore(resumeText, fileName) {
//   // ── Step 1: Parse & rule-based analysis ──────────────────
//   const sections = detectSections(resumeText);
//   const formattingResult = detectFormattingIssues(resumeText, fileName);
//   const contentResult = calculateContentCompleteScore(sections);
//   const achievementsResult = calculateAchievementsScore(resumeText);

//   // ── Step 2: LLM calls (role detection + alignment) ───────
//   const roleInfo = await detectRoleFromResume(resumeText);

//   // ── Step 3: Keyword benchmark match ──────────────────────
//   const keywordResult = calculateBenchmarkKeywordMatch(resumeText, roleInfo.jobFunction);

//   // ── Step 4: Role alignment (LLM) ─────────────────────────
//   const roleAlignment = await calculateRoleAlignment(resumeText, roleInfo);

//   // ── Step 5: Calculate weighted total score ────────────────
//   const scores = {
//     keywords: keywordResult.keywordScore,
//     formatting: formattingResult.formattingScore,
//     achievements: achievementsResult.achievementsScore,
//     contentComplete: contentResult.contentCompleteScore,
//     roleAlignment: roleAlignment.score,
//   };

//   const totalScore = Math.round(
//     (scores.keywords * ATS_WEIGHTS.keywords) +
//     (scores.formatting * ATS_WEIGHTS.formatting) +
//     (scores.achievements * ATS_WEIGHTS.achievements) +
//     (scores.contentComplete * ATS_WEIGHTS.contentComplete) +
//     (scores.roleAlignment * ATS_WEIGHTS.roleAlignment)
//   );

//   const gradeInfo = getATSGrade(totalScore);

//   // ── Step 6: Assemble intermediate result ─────────────────
//   const scoreData = {
//     totalScore,
//     grade: gradeInfo.grade,
//     gradeLabel: gradeInfo.label,
//     gradeColor: gradeInfo.color,
//     breakdown: {
//       keywords: { score: scores.keywords, weight: 30, label: 'Keywords & Skills' },
//       formatting: { score: scores.formatting, weight: 20, label: 'Formatting & Structure' },
//       achievements: { score: scores.achievements, weight: 20, label: 'Impact & Achievements' },
//       contentComplete: { score: scores.contentComplete, weight: 15, label: 'Section Completeness' },
//       roleAlignment: { score: scores.roleAlignment, weight: 15, label: 'Role Alignment' },
//     },
//     keywords: keywordResult,
//     formatting: {
//       score: formattingResult.formattingScore,
//       issues: formattingResult.issues,
//       warnings: formattingResult.warnings,
//     },
//     sections: contentResult,
//     achievements: achievementsResult,
//     roleInfo,
//     roleAlignment: {
//       score: roleAlignment.score,
//       reasoning: roleAlignment.reasoning,
//       strengths: roleAlignment.strengths || [],
//       gaps: roleAlignment.gaps || [],
//     },
//   };

//   // ── Step 7: Generate feedback (LLM) ──────────────────────
//   const feedback = await generateFeedback(resumeText, scoreData, roleInfo);

//   return {
//     ...scoreData,
//     feedback,
//   };
// }

// module.exports = { calculateATSScore };
// const { callCohereJSON, callCohereText } = require('./cohere.service');
// const { calculateBenchmarkKeywordMatch } = require('./benchmarks.service');
// const {
//   detectSections,
//   detectFormattingIssues,
//   calculateContentCompleteScore,
//   calculateAchievementsScore,
// } = require('./parser.service');

// // Scoring weights (no JD mode) — v2
// // Achievements reduced from 20% → 15% (too punishing before)
// // Keywords increased from 30% → 35% (most important signal)
// // Role alignment kept at 15%
// const ATS_WEIGHTS = {
//   keywords:        0.35,  // benchmark keyword match
//   formatting:      0.20,  // rule-based formatting checks
//   achievements:    0.15,  // quantified bullet detection
//   contentComplete: 0.15,  // section completeness
//   roleAlignment:   0.15,  // LLM role alignment score
// };

// /**
//  * Get ATS grade from score
//  */
// function getATSGrade(score) {
//   if (score >= 90) return { grade: 'A+', label: 'Excellent', color: '#22c55e' };
//   if (score >= 80) return { grade: 'A', label: 'Very Good', color: '#84cc16' };
//   if (score >= 70) return { grade: 'B', label: 'Good', color: '#eab308' };
//   if (score >= 60) return { grade: 'C', label: 'Average', color: '#f97316' };
//   if (score >= 50) return { grade: 'D', label: 'Below Average', color: '#ef4444' };
//   return { grade: 'F', label: 'Poor', color: '#dc2626' };
// }

// /**
//  * Step 1: Detect role and industry from resume using Cohere
//  */
// async function detectRoleFromResume(resumeText) {
//   const prompt = `Analyze this resume and extract the following information.

// Resume Text:
// ${resumeText.substring(0, 3000)}

// Return a JSON object with these fields:
// {
//   "jobFunction": "The most likely job role (e.g. Backend Engineer, Data Scientist, Product Manager, Financial Analyst, etc.)",
//   "seniorityLevel": "Entry Level OR Mid Level OR Senior Level OR Lead/Manager",
//   "industry": "Primary industry (e.g. Technology, Finance, Healthcare, Marketing, etc.)",
//   "yearsOfExperience": <number or 0>,
//   "currentTitle": "Most recent job title from the resume or null",
//   "topSkills": ["up to 6 key skills found in the resume"]
// }

// Rules:
// - yearsOfExperience should be estimated from dates in experience section
// - jobFunction should be specific, not generic
// - Return only valid JSON`;

//   try {
//     const result = await callCohereJSON(prompt);
//     return result;
//   } catch (e) {
//     // Fallback if JSON parse fails
//     return {
//       jobFunction: 'Software Engineer',
//       seniorityLevel: 'Mid Level',
//       industry: 'Technology',
//       yearsOfExperience: 0,
//       currentTitle: null,
//       topSkills: [],
//     };
//   }
// }

// /**
//  * Step 2: Calculate role alignment score using Cohere
//  */
// async function calculateRoleAlignment(resumeText, roleInfo) {
//   const prompt = `You are an expert recruiter. Score this resume's alignment to the detected role.

// Detected Role: ${roleInfo.jobFunction}
// Seniority: ${roleInfo.seniorityLevel}
// Industry: ${roleInfo.industry}

// Resume (excerpt):
// ${resumeText.substring(0, 2000)}

// Score the alignment from 0 to 100 based on:
// - Does the candidate's experience match the role?
// - Are the right skills present for this specific role?
// - Is the career progression logical for this role and seniority?
// - Does the resume content feel authentic for this job function?

// Return JSON:
// {
//   "score": <number 0-100>,
//   "reasoning": "One concise sentence explaining the score",
//   "strengths": ["2-3 specific strengths for this role"],
//   "gaps": ["2-3 specific gaps for this role"]
// }`;

//   try {
//     return await callCohereJSON(prompt);
//   } catch (e) {
//     return { score: 50, reasoning: 'Could not analyze role alignment', strengths: [], gaps: [] };
//   }
// }

// /**
//  * Step 3: Generate actionable feedback using Cohere
//  */
// async function generateFeedback(resumeText, scoreData, roleInfo) {
//   const prompt = `You are a professional resume coach specializing in ATS optimization.

// Candidate Role: ${roleInfo.jobFunction} (${roleInfo.seniorityLevel})
// ATS Score: ${scoreData.totalScore}/100

// Score Breakdown:
// - Keywords & Skills: ${scoreData.breakdown.keywords.score}/100
// - Formatting: ${scoreData.breakdown.formatting.score}/100
// - Achievements: ${scoreData.breakdown.achievements.score}/100
// - Section Completeness: ${scoreData.breakdown.contentComplete.score}/100
// - Role Alignment: ${scoreData.breakdown.roleAlignment.score}/100

// Missing Keywords: ${scoreData.keywords.missingKeywords.join(', ')}
// Formatting Issues: ${scoreData.formatting.issues.join('; ') || 'None'}
// Missing Sections: ${scoreData.sections.missingSections.join(', ') || 'None'}

// Resume excerpt:
// ${resumeText.substring(0, 1500)}

// Provide specific, actionable feedback. Return JSON:
// {
//   "topImprovements": [
//     {
//       "priority": "HIGH",
//       "category": "Keywords",
//       "action": "Specific action to take",
//       "impact": "What this will improve"
//     }
//   ],
//   "quickWins": ["3-4 quick things they can fix in under 5 minutes"],
//   "overallAdvice": "2-3 sentences of overall coaching advice"
// }

// Rules:
// - topImprovements: exactly 4 items, mix of HIGH/MEDIUM priority
// - quickWins: 3-4 items maximum
// - Be specific and actionable, not generic
// - Reference actual content from the resume where possible`;

//   try {
//     return await callCohereJSON(prompt);
//   } catch (e) {
//     return {
//       topImprovements: [],
//       quickWins: ['Add quantified achievements to bullet points', 'Include a professional summary', 'Add relevant skills section'],
//       overallAdvice: 'Focus on quantifying your achievements and ensuring your resume includes role-relevant keywords.',
//     };
//   }
// }

// /**
//  * MAIN: Calculate complete ATS score for a resume
//  */
// async function calculateATSScore(resumeText, fileName) {
//   // ── Step 1: Parse & rule-based analysis ──────────────────
//   const sections = detectSections(resumeText);
//   const formattingResult = detectFormattingIssues(resumeText, fileName);
//   const contentResult = calculateContentCompleteScore(sections);
//   const achievementsResult = calculateAchievementsScore(resumeText);

//   // ── Step 2: LLM calls (role detection + alignment) ───────
//   const roleInfo = await detectRoleFromResume(resumeText);

//   // ── Step 3: Keyword benchmark match ──────────────────────
//   const keywordResult = calculateBenchmarkKeywordMatch(resumeText, roleInfo.jobFunction);

//   // ── Step 4: Role alignment (LLM) ─────────────────────────
//   const roleAlignment = await calculateRoleAlignment(resumeText, roleInfo);

//   // ── Step 5: Calculate weighted total score ────────────────
//   const scores = {
//     keywords: keywordResult.keywordScore,
//     formatting: formattingResult.formattingScore,
//     achievements: achievementsResult.achievementsScore,
//     contentComplete: contentResult.contentCompleteScore,
//     roleAlignment: roleAlignment.score,
//   };

//   const totalScore = Math.round(
//     (scores.keywords * ATS_WEIGHTS.keywords) +
//     (scores.formatting * ATS_WEIGHTS.formatting) +
//     (scores.achievements * ATS_WEIGHTS.achievements) +
//     (scores.contentComplete * ATS_WEIGHTS.contentComplete) +
//     (scores.roleAlignment * ATS_WEIGHTS.roleAlignment)
//   );

//   const gradeInfo = getATSGrade(totalScore);

//   // ── Step 6: Assemble intermediate result ─────────────────
//   const scoreData = {
//     totalScore,
//     grade: gradeInfo.grade,
//     gradeLabel: gradeInfo.label,
//     gradeColor: gradeInfo.color,
//     breakdown: {
//       keywords: { score: scores.keywords, weight: 30, label: 'Keywords & Skills' },
//       formatting: { score: scores.formatting, weight: 20, label: 'Formatting & Structure' },
//       achievements: { score: scores.achievements, weight: 20, label: 'Impact & Achievements' },
//       contentComplete: { score: scores.contentComplete, weight: 15, label: 'Section Completeness' },
//       roleAlignment: { score: scores.roleAlignment, weight: 15, label: 'Role Alignment' },
//     },
//     keywords: keywordResult,
//     formatting: {
//       score: formattingResult.formattingScore,
//       issues: formattingResult.issues,
//       warnings: formattingResult.warnings,
//     },
//     sections: contentResult,
//     achievements: achievementsResult,
//     roleInfo,
//     roleAlignment: {
//       score: roleAlignment.score,
//       reasoning: roleAlignment.reasoning,
//       strengths: roleAlignment.strengths || [],
//       gaps: roleAlignment.gaps || [],
//     },
//   };

//   // ── Step 7: Generate feedback (LLM) ──────────────────────
//   const feedback = await generateFeedback(resumeText, scoreData, roleInfo);

//   return {
//     ...scoreData,
//     feedback,
//   };
// }

// module.exports = { calculateATSScore };
const { callCohereJSON, callCohereText } = require('./cohere.service');
const { calculateBenchmarkKeywordMatch } = require('./benchmarks.service');
const {
  detectSections,
  detectFormattingIssues,
  calculateContentCompleteScore,
  calculateAchievementsScore,
  parseExperienceEntries,
} = require('./parser.service');

// Scoring weights (no JD mode) — v2
// Achievements reduced from 20% → 15% (too punishing before)
// Keywords increased from 30% → 35% (most important signal)
// Role alignment kept at 15%
const ATS_WEIGHTS = {
  keywords:        0.35,  // benchmark keyword match
  formatting:      0.20,  // rule-based formatting checks
  achievements:    0.15,  // quantified bullet detection
  contentComplete: 0.15,  // section completeness
  roleAlignment:   0.15,  // LLM role alignment score
};

/**
 * Get ATS grade from score
 */
function getATSGrade(score) {
  if (score >= 90) return { grade: 'A+', label: 'Excellent', color: '#22c55e' };
  if (score >= 80) return { grade: 'A', label: 'Very Good', color: '#84cc16' };
  if (score >= 70) return { grade: 'B', label: 'Good', color: '#eab308' };
  if (score >= 60) return { grade: 'C', label: 'Average', color: '#f97316' };
  if (score >= 50) return { grade: 'D', label: 'Below Average', color: '#ef4444' };
  return { grade: 'F', label: 'Poor', color: '#dc2626' };
}

/**
 * Step 1: Detect role and industry from resume using Cohere
 */
async function detectRoleFromResume(resumeText) {
  const prompt = `Analyze this resume and extract the following information.

Resume Text:
${resumeText.substring(0, 3000)}

Return a JSON object with these fields:
{
  "jobFunction": "The most likely job role (e.g. Backend Engineer, Data Scientist, Product Manager, Financial Analyst, etc.)",
  "seniorityLevel": "Entry Level OR Mid Level OR Senior Level OR Lead/Manager",
  "industry": "Primary industry (e.g. Technology, Finance, Healthcare, Marketing, etc.)",
  "yearsOfExperience": <number or 0>,
  "currentTitle": "Most recent job title from the resume or null",
  "topSkills": ["up to 6 key skills found in the resume"],
  "isFresher": true or false (true if 0-1 years experience, no work history, or student/recent graduate)
}

Rules:
- yearsOfExperience should be estimated from dates in experience section
- jobFunction should be specific, not generic
- Return only valid JSON`;

  try {
    const result = await callCohereJSON(prompt);
    return result;
  } catch (e) {
    // Fallback if JSON parse fails
    return {
      jobFunction: 'Software Engineer',
      seniorityLevel: 'Mid Level',
      industry: 'Technology',
      yearsOfExperience: 0,
      currentTitle: null,
      topSkills: [],
      isFresher: false,
    };
  }
}

/**
 * Step 2: Calculate role alignment score using Cohere
 */
async function calculateRoleAlignment(resumeText, roleInfo) {
  const prompt = `You are an expert recruiter. Score this resume's alignment to the detected role.

Detected Role: ${roleInfo.jobFunction}
Seniority: ${roleInfo.seniorityLevel}
Industry: ${roleInfo.industry}

Resume (excerpt):
${resumeText.substring(0, 2000)}

Score the alignment from 0 to 100 based on:
- Does the candidate's experience match the role?
- Are the right skills present for this specific role?
- Is the career progression logical for this role and seniority?
- Does the resume content feel authentic for this job function?

Return JSON:
{
  "score": <number 0-100>,
  "reasoning": "One concise sentence explaining the score",
  "strengths": ["2-3 specific strengths for this role"],
  "gaps": ["2-3 specific gaps for this role"]
}`;

  try {
    return await callCohereJSON(prompt);
  } catch (e) {
    return { score: 50, reasoning: 'Could not analyze role alignment', strengths: [], gaps: [] };
  }
}

/**
 * Step 3: Generate actionable feedback using Cohere
 */
async function generateFeedback(resumeText, scoreData, roleInfo) {
  // Build breakdown text dynamically based on what's in scoreData
  const breakdownText = Object.entries(scoreData.breakdown)
    .map(([key, val]) => `- ${val.label}: ${val.score}/100`)
    .join('\n');

  const prompt = `You are a professional resume coach specializing in ATS optimization.

Candidate Role: ${roleInfo.jobFunction} (${roleInfo.seniorityLevel})
${scoreData.isFresher ? '(FRESHER/ENTRY-LEVEL candidate)' : ''}
ATS Score: ${scoreData.totalScore}/100

Score Breakdown:
${breakdownText}

Missing Keywords: ${scoreData.keywords?.missingKeywords?.join(', ') || 'None'}
Formatting Issues: ${scoreData.formatting?.issues?.join('; ') || 'None'}
Missing Sections: ${scoreData.sections?.missingSections?.join(', ') || 'None'}

Resume excerpt:
${resumeText.substring(0, 1500)}

Provide specific, actionable feedback. Return JSON:
{
  "topImprovements": [
    {
      "priority": "HIGH",
      "category": "Keywords",
      "action": "Specific action to take",
      "impact": "What this will improve"
    }
  ],
  "quickWins": ["3-4 quick things they can fix in under 5 minutes"],
  "overallAdvice": "2-3 sentences of overall coaching advice"
}

Rules:
- topImprovements: exactly 4 items, mix of HIGH/MEDIUM priority
- quickWins: 3-4 items maximum
- Be specific and actionable, not generic
- Reference actual content from the resume where possible
${scoreData.isFresher ? '- For freshers, focus on projects, coursework, and skills rather than work achievements' : ''}`;

  try {
    return await callCohereJSON(prompt);
  } catch (e) {
    console.warn('Feedback generation failed:', e.message);
    return {
      topImprovements: [],
      quickWins: scoreData.isFresher 
        ? ['Add relevant coursework to education', 'List personal/academic projects', 'Include technical skills section', 'Add a career objective']
        : ['Add quantified achievements to bullet points', 'Include a professional summary', 'Add relevant skills section'],
      overallAdvice: scoreData.isFresher
        ? 'Focus on showcasing relevant coursework, projects, and technical skills. Highlight any internships or academic achievements.'
        : 'Focus on quantifying your achievements and ensuring your resume includes role-relevant keywords.',
    };
  }
}

/**
 * FRESHER-SPECIFIC SCORING
 * Different weights and criteria for candidates with 0-1 years experience
 * 
 * Fresher weights:
 * - Skills & Keywords: 40% (most important — shows relevant coursework/self-learning)
 * - Projects: 25% (internships, personal projects, academic work)
 * - Education: 20% (field relevance matters more than degree level)
 * - Formatting: 15% (clean, readable structure)
 */
async function calculateFresherATSScore(resumeText, fileName, roleInfo, sections, formattingResult, contentResult) {
  console.log('📚 Detected FRESHER resume — using adjusted scoring weights');

  // Keywords — benchmark match (same as experienced)
  const keywordResult = calculateBenchmarkKeywordMatch(resumeText, roleInfo.jobFunction);

  // Parse actual experience entries to get accurate duration
  const experienceSection = sections.experience || [];
  const experienceParsed = parseExperienceEntries(experienceSection);
  
  // Update roleInfo with parsed experience (more accurate than Cohere's estimate)
  if (experienceParsed.entriesFound > 0) {
    roleInfo.yearsOfExperience = parseFloat(experienceParsed.totalYears);
    roleInfo.experienceEntries = experienceParsed.entriesFound;
    roleInfo.totalExperienceMonths = experienceParsed.totalMonths;
    console.log(`✓ Parsed ${experienceParsed.entriesFound} experience entries: ${experienceParsed.totalYears} years total`);
  }

  // Projects score — check for ANY projects/internships
  let projectsScore = 40; // baseline
  const projectsSection = sections.projects || [];
  const allProjectText = [...projectsSection, ...experienceSection].join(' ').toLowerCase();

  if (projectsSection.length > 0) projectsScore += 30; // has projects section
  if (experienceSection.length > 0) projectsScore += 20; // has some experience/internship
  
  // Check for project indicators in text
  const projectIndicators = ['project', 'internship', 'capstone', 'thesis', 'hackathon', 'built', 'developed', 'created'];
  const hasProjects = projectIndicators.some(ind => allProjectText.includes(ind));
  if (hasProjects) projectsScore += 10;

  projectsScore = Math.min(projectsScore, 100);

  // Education relevance — use LLM
  let educationScore = 50;
  try {
    const eduPrompt = `Analyze this resume for a FRESHER candidate.

Resume excerpt:
${resumeText.substring(0, 2000)}

Target Role: ${roleInfo.jobFunction}
Education: ${(sections.education || []).join('\n')}

Score the education relevance from 0-100:
- Is the degree field relevant to the target role?
- Are there relevant courses, certifications, or training mentioned?
- GPA, honors, or academic achievements?

Return JSON:
{
  "score": <0-100>,
  "reasoning": "One sentence explanation"
}`;
    
    const eduResult = await callCohereJSON(eduPrompt);
    educationScore = eduResult.score || 50;
  } catch (e) {
    console.warn('Education scoring failed:', e.message);
    educationScore = 50;
  }

  // Role alignment — lighter version for freshers
  let roleAlignmentScore = 60; // higher baseline for freshers
  try {
    const alignPrompt = `You are a recruiter reviewing a FRESHER/ENTRY-LEVEL resume.

Target Role: ${roleInfo.jobFunction}
Resume (excerpt):
${resumeText.substring(0, 1500)}

Score 0-100 on potential fit:
- Do they have relevant coursework, projects, or skills?
- Is there clear interest/passion for this field?
- Are there transferable skills?

Return JSON:
{
  "score": <0-100>,
  "reasoning": "One sentence",
  "strengths": ["2-3 items"],
  "gaps": ["2-3 items to work on"]
}`;

    const align = await callCohereJSON(alignPrompt);
    roleAlignmentScore = align.score || 60;
    roleInfo.alignmentReasoning = align.reasoning;
    roleInfo.strengths = align.strengths || [];
    roleInfo.gaps = align.gaps || [];
  } catch (e) {
    console.warn('Role alignment failed:', e.message);
    roleAlignmentScore = 60;
    roleInfo.alignmentReasoning = 'Could not analyze alignment';
    roleInfo.strengths = [];
    roleInfo.gaps = [];
  }

  // Fresher weights
  const FRESHER_WEIGHTS = {
    keywords: 0.20,       // 20%
    skills: 0.20,         // 20% (combines with keywords = 40% total)
    projects: 0.25,       // 25%
    education: 0.20,      // 20%
    formatting: 0.15,     // 15%
  };

  const scores = {
    keywords: keywordResult.keywordScore,
    skills: keywordResult.keywordScore, // same source — skills are in keywords
    projects: projectsScore,
    education: educationScore,
    formatting: formattingResult.formattingScore,
  };

  const totalScore = Math.round(
    (scores.keywords * FRESHER_WEIGHTS.keywords) +
    (scores.skills * FRESHER_WEIGHTS.skills) +
    (scores.projects * FRESHER_WEIGHTS.projects) +
    (scores.education * FRESHER_WEIGHTS.education) +
    (scores.formatting * FRESHER_WEIGHTS.formatting)
  );

  const gradeInfo = getATSGrade(totalScore);

  const scoreData = {
    totalScore,
    grade: gradeInfo.grade,
    gradeLabel: gradeInfo.label,
    gradeColor: gradeInfo.color,
    isFresher: true,
    breakdown: {
      keywords: { score: scores.keywords, weight: 20, label: 'Keywords & Skills (Part 1)' },
      skills: { score: scores.skills, weight: 20, label: 'Technical Skills (Part 2)' },
      projects: { score: scores.projects, weight: 25, label: 'Projects & Experience' },
      education: { score: scores.education, weight: 20, label: 'Education Relevance' },
      formatting: { score: scores.formatting, weight: 15, label: 'Resume Formatting' },
    },
    keywords: keywordResult,
    formatting: {
      score: formattingResult.formattingScore,
      issues: formattingResult.issues,
      warnings: formattingResult.warnings,
    },
    sections: contentResult,
    projects: {
      score: projectsScore,
      hasProjects: projectsSection.length > 0,
      hasExperience: experienceSection.length > 0,
    },
    roleInfo: {
      ...roleInfo,
      educationScore,
    },
    roleAlignment: {
      score: roleAlignmentScore,
      reasoning: roleInfo.alignmentReasoning || 'N/A',
      strengths: roleInfo.strengths || [],
      gaps: roleInfo.gaps || [],
    },
  };

  // Generate feedback (same as experienced)
  const feedback = await generateFeedback(resumeText, scoreData, roleInfo);

  return {
    ...scoreData,
    feedback,
  };
}

/**
 * MAIN: Calculate complete ATS score for a resume
 */
async function calculateATSScore(resumeText, fileName) {
  // ── Step 1: Parse & rule-based analysis ──────────────────
  const sections = detectSections(resumeText);
  const formattingResult = detectFormattingIssues(resumeText, fileName);
  const contentResult = calculateContentCompleteScore(sections);
  const achievementsResult = calculateAchievementsScore(resumeText);

  // ── Step 2: LLM calls (role detection + alignment) ───────
  const roleInfo = await detectRoleFromResume(resumeText);

  // ── FRESHER ROUTING ─────────────────────────────────────
  // If detected as fresher, use different scoring logic
  if (roleInfo.isFresher || roleInfo.yearsOfExperience <= 1) {
    return calculateFresherATSScore(
      resumeText,
      fileName,
      roleInfo,
      sections,
      formattingResult,
      contentResult
    );
  }

  // ── Step 3: Keyword benchmark match ──────────────────────
  const keywordResult = calculateBenchmarkKeywordMatch(resumeText, roleInfo.jobFunction);

  // Parse actual experience entries to get accurate duration
  const experienceSection = sections.experience || [];
  const experienceParsed = parseExperienceEntries(experienceSection);
  
  // Update roleInfo with parsed experience (more accurate than Cohere's estimate)
  if (experienceParsed.entriesFound > 0) {
    roleInfo.yearsOfExperience = parseFloat(experienceParsed.totalYears);
    roleInfo.experienceEntries = experienceParsed.entriesFound;
    roleInfo.totalExperienceMonths = experienceParsed.totalMonths;
  }

  // ── Step 4: Role alignment (LLM) ─────────────────────────
  const roleAlignment = await calculateRoleAlignment(resumeText, roleInfo);

  // ── Step 5: Calculate weighted total score ────────────────
  const scores = {
    keywords: keywordResult.keywordScore,
    formatting: formattingResult.formattingScore,
    achievements: achievementsResult.achievementsScore,
    contentComplete: contentResult.contentCompleteScore,
    roleAlignment: roleAlignment.score,
  };

  const totalScore = Math.round(
    (scores.keywords * ATS_WEIGHTS.keywords) +
    (scores.formatting * ATS_WEIGHTS.formatting) +
    (scores.achievements * ATS_WEIGHTS.achievements) +
    (scores.contentComplete * ATS_WEIGHTS.contentComplete) +
    (scores.roleAlignment * ATS_WEIGHTS.roleAlignment)
  );

  const gradeInfo = getATSGrade(totalScore);

  // ── Step 6: Assemble intermediate result ─────────────────
  const scoreData = {
    totalScore,
    grade: gradeInfo.grade,
    gradeLabel: gradeInfo.label,
    gradeColor: gradeInfo.color,
    breakdown: {
      keywords: { score: scores.keywords, weight: 30, label: 'Keywords & Skills' },
      formatting: { score: scores.formatting, weight: 20, label: 'Formatting & Structure' },
      achievements: { score: scores.achievements, weight: 20, label: 'Impact & Achievements' },
      contentComplete: { score: scores.contentComplete, weight: 15, label: 'Section Completeness' },
      roleAlignment: { score: scores.roleAlignment, weight: 15, label: 'Role Alignment' },
    },
    keywords: keywordResult,
    formatting: {
      score: formattingResult.formattingScore,
      issues: formattingResult.issues,
      warnings: formattingResult.warnings,
    },
    sections: contentResult,
    achievements: achievementsResult,
    roleInfo,
    roleAlignment: {
      score: roleAlignment.score,
      reasoning: roleAlignment.reasoning,
      strengths: roleAlignment.strengths || [],
      gaps: roleAlignment.gaps || [],
    },
  };

  // ── Step 7: Generate feedback (LLM) ──────────────────────
  const feedback = await generateFeedback(resumeText, scoreData, roleInfo);

  return {
    ...scoreData,
    feedback,
  };
}

module.exports = { calculateATSScore };