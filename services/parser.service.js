// const pdfParse = require('pdf-parse');
// const mammoth = require('mammoth');
// const path = require('path');

// /**
//  * Extract raw text from uploaded resume file
//  * Supports PDF and DOCX
//  */
// async function extractTextFromFile(fileBuffer, originalName) {
//   const ext = path.extname(originalName).toLowerCase();

//   if (ext === '.pdf') {
//     const data = await pdfParse(fileBuffer);
//     return data.text;
//   }

//   if (ext === '.docx' || ext === '.doc') {
//     const result = await mammoth.extractRawText({ buffer: fileBuffer });
//     return result.value;
//   }

//   throw new Error(`Unsupported file type: ${ext}. Please upload PDF or DOCX.`);
// }

// /**
//  * Basic rule-based section detection
//  * Returns structured sections from raw text
//  */
// function detectSections(rawText) {
//   const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

//   const sectionKeywords = {
//     summary: ['summary', 'objective', 'profile', 'about', 'overview'],
//     experience: ['experience', 'work history', 'employment', 'career'],
//     education: ['education', 'academic', 'qualification', 'degree'],
//     skills: ['skills', 'technical skills', 'competencies', 'technologies', 'tools'],
//     certifications: ['certification', 'certificate', 'license', 'credential','certifications'],
//     projects: ['projects', 'portfolio', 'work samples'],
//     achievements: ['achievements', 'awards', 'honors', 'accomplishments'],
//   };

//   const sections = {
//     summary: [],
//     experience: [],
//     education: [],
//     skills: [],
//     certifications: [],
//     projects: [],
//     achievements: [],
//     other: [],
//   };

//   let currentSection = 'other';

//   for (const line of lines) {
//     const lineLower = line.toLowerCase();

//     // Check if this line is a section header
//     let foundSection = null;
//     for (const [section, keywords] of Object.entries(sectionKeywords)) {
//       if (keywords.some(kw => lineLower.includes(kw)) && line.length < 60) {
//         foundSection = section;
//         break;
//       }
//     }

//     if (foundSection) {
//       currentSection = foundSection;
//     } else {
//       sections[currentSection].push(line);
//     }
//   }

//   return sections;
// }

// /**
//  * Detect formatting issues that hurt ATS parsing
//  */
// function detectFormattingIssues(rawText, fileName) {
//   const issues = [];
//   const warnings = [];

//   // Check for tables (rough heuristic: many | characters)
//   const pipeCount = (rawText.match(/\|/g) || []).length;
//   if (pipeCount > 10) {
//     issues.push('Resume appears to use tables — many ATS systems cannot parse tables correctly');
//   }

//   // Check for very short lines (could indicate columns)
//   const lines = rawText.split('\n').filter(l => l.trim().length > 0);
//   const shortLines = lines.filter(l => l.trim().length < 20);
//   if (shortLines.length / lines.length > 0.4) {
//     warnings.push('Resume may use multi-column layout — ATS systems often read columns left-to-right causing jumbled text');
//   }

//   // Check length
//   const wordCount = rawText.split(/\s+/).filter(Boolean).length;
//   if (wordCount < 150) {
//     issues.push('Resume is very short — add more detail to your experience and skills sections');
//   }
//   if (wordCount > 1200) {
//     warnings.push('Resume may be too long — aim for 1-2 pages (400-800 words)');
//   }

//   // Check for contact info
//   const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(rawText);
//   const hasPhone = /(\+?\d[\d\s\-().]{7,}\d)/.test(rawText);

//   if (!hasEmail) issues.push('No email address detected');
//   if (!hasPhone) warnings.push('No phone number detected');

//   // Calculate formatting score
//   let formattingScore = 100;
//   formattingScore -= issues.length * 15;
//   formattingScore -= warnings.length * 8;
//   formattingScore = Math.max(formattingScore, 10);

//   return { issues, warnings, formattingScore };
// }

// /**
//  * Check section completeness
//  */
// function calculateContentCompleteScore(sections) {
//   const requiredSections = ['summary', 'experience', 'education', 'skills'];
//   const bonusSections = ['certifications', 'projects', 'achievements'];

//   let score = 0;
//   const missing = [];
//   const present = [];

//   for (const section of requiredSections) {
//     if (sections[section] && sections[section].length > 0) {
//       score += 20;
//       present.push(section);
//     } else {
//       missing.push(section);
//     }
//   }

//   for (const section of bonusSections) {
//     if (sections[section] && sections[section].length > 0) {
//       score += 6;
//       present.push(section);
//     }
//   }

//   return {
//     contentCompleteScore: Math.min(score, 100),
//     missingSections: missing,
//     presentSections: present,
//   };
// }

// /**
//  * Detect quantified achievements in bullet points
//  */
// function calculateAchievementsScore(rawText) {
//   const lines = rawText.split('\n').filter(l => l.trim().length > 10);

//   // Patterns for quantified achievements
//   const quantifiedPattern = /(\d+%|\$[\d,]+|\d+x|\d+\+|[\d,]+\s*(users|customers|clients|revenue|sales|employees|team|projects|systems|features|bugs|issues|tickets|hours|days|months|weeks))/i;
//   const bulletLines = lines.filter(l => /^[\-•*▪▸◦>]/.test(l.trim()) || /^\d+\./.test(l.trim()));

//   if (bulletLines.length === 0) {
//     // No bullets found, analyze all lines
//     const quantifiedLines = lines.filter(l => quantifiedPattern.test(l));
//     return {
//       achievementsScore: Math.min(quantifiedLines.length * 10, 80),
//       quantifiedCount: quantifiedLines.length,
//       totalBullets: lines.length,
//     };
//   }

//   const quantifiedBullets = bulletLines.filter(l => quantifiedPattern.test(l));
//   const percentage = quantifiedBullets.length / bulletLines.length;

//   return {
//     achievementsScore: Math.round(percentage * 100),
//     quantifiedCount: quantifiedBullets.length,
//     totalBullets: bulletLines.length,
//   };
// }

// module.exports = {
//   extractTextFromFile,
//   detectSections,
//   detectFormattingIssues,
//   calculateContentCompleteScore,
//   calculateAchievementsScore,
// };
// const pdfParse = require('pdf-parse');
// const mammoth = require('mammoth');
// const path = require('path');

// /**
//  * Extract raw text from uploaded resume file
//  * Supports PDF and DOCX
//  */
// async function extractTextFromFile(fileBuffer, originalName) {
//   const ext = path.extname(originalName).toLowerCase();

//   if (ext === '.pdf') {
//     const data = await pdfParse(fileBuffer);
//     return data.text;
//   }

//   if (ext === '.docx' || ext === '.doc') {
//     const result = await mammoth.extractRawText({ buffer: fileBuffer });
//     return result.value;
//   }

//   throw new Error(`Unsupported file type: ${ext}. Please upload PDF or DOCX.`);
// }

// /**
//  * Basic rule-based section detection
//  * Returns structured sections from raw text
//  */
// function detectSections(rawText) {
//   const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

//   // Expanded: catches "Work Experience", "Professional Experience", "SKILLS & TOOLS" etc.
//   const sectionKeywords = {
//     summary: ['summary', 'objective', 'profile', 'about', 'overview', 'professional summary', 'career objective', 'personal statement', 'introduction'],
//     experience: ['experience', 'work history', 'employment', 'career', 'work experience', 'professional experience', 'job history', 'positions held', 'relevant experience'],
//     education: ['education', 'academic', 'qualification', 'degree', 'educational background', 'academic background', 'schooling', 'university', 'college'],
//     skills: ['skills', 'technical skills', 'competencies', 'technologies', 'tools', 'expertise', 'core skills', 'key skills', 'skill set', 'tech stack', 'languages', 'frameworks'],
//     certifications: ['certification', 'certificate', 'license', 'credential', 'certifications', 'licenses', 'accreditation'],
//     projects: ['projects', 'portfolio', 'work samples', 'personal projects', 'side projects', 'key projects', 'project experience'],
//     achievements: ['achievements', 'awards', 'honors', 'accomplishments', 'recognition', 'accolades', 'publications', 'volunteer'],
//   };

//   const sections = {
//     summary: [],
//     experience: [],
//     education: [],
//     skills: [],
//     certifications: [],
//     projects: [],
//     achievements: [],
//     other: [],
//   };

//   let currentSection = 'other';

//   for (const line of lines) {
//     const lineLower = line.toLowerCase();

//     // Check if this line is a section header
//     let foundSection = null;
//     for (const [section, keywords] of Object.entries(sectionKeywords)) {
//       if (keywords.some(kw => lineLower.includes(kw)) && line.length < 60) {
//         foundSection = section;
//         break;
//       }
//     }

//     if (foundSection) {
//       currentSection = foundSection;
//     } else {
//       sections[currentSection].push(line);
//     }
//   }

//   return sections;
// }

// /**
//  * Detect formatting issues that hurt ATS parsing
//  */
// function detectFormattingIssues(rawText, fileName) {
//   const issues = [];
//   const warnings = [];

//   // Check for tables (rough heuristic: many | characters)
//   const pipeCount = (rawText.match(/\|/g) || []).length;
//   if (pipeCount > 10) {
//     issues.push('Resume appears to use tables — many ATS systems cannot parse tables correctly');
//   }

//   // Check for very short lines (could indicate columns)
//   const lines = rawText.split('\n').filter(l => l.trim().length > 0);
//   const shortLines = lines.filter(l => l.trim().length < 20);
//   if (shortLines.length / lines.length > 0.4) {
//     warnings.push('Resume may use multi-column layout — ATS systems often read columns left-to-right causing jumbled text');
//   }

//   // Check length
//   const wordCount = rawText.split(/\s+/).filter(Boolean).length;
//   if (wordCount < 150) {
//     issues.push('Resume is very short — add more detail to your experience and skills sections');
//   }
//   if (wordCount > 1200) {
//     warnings.push('Resume may be too long — aim for 1-2 pages (400-800 words)');
//   }

//   // Check for contact info
//   const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(rawText);
//   const hasPhone = /(\+?\d[\d\s\-().]{7,}\d)/.test(rawText);

//   if (!hasEmail) issues.push('No email address detected');
//   if (!hasPhone) warnings.push('No phone number detected');

//   // Calculate formatting score — gentler penalties
//   let formattingScore = 100;
//   formattingScore -= issues.length * 10;   // was 15 — hard issues
//   formattingScore -= warnings.length * 5;  // was 8  — soft warnings
//   formattingScore = Math.max(formattingScore, 25); // floor at 25

//   return { issues, warnings, formattingScore };
// }

// /**
//  * Check section completeness
//  */
// function calculateContentCompleteScore(sections) {
//   // Weights: experience(30) + skills(25) + education(20) + summary(15) + bonus(10)
//   const sectionWeights = {
//     experience: 30,
//     skills: 25,
//     education: 20,
//     summary: 15,
//   };
//   const bonusSections = ['certifications', 'projects', 'achievements'];

//   let score = 0;
//   const missing = [];
//   const present = [];

//   for (const [section, weight] of Object.entries(sectionWeights)) {
//     if (sections[section] && sections[section].length > 0) {
//       score += weight;
//       present.push(section);
//     } else {
//       // Partial credit — even without a dedicated section header,
//       // many resumes have content detected under 'other'
//       if (sections.other && sections.other.length > 5) {
//         score += Math.round(weight * 0.3); // 30% credit
//       }
//       missing.push(section);
//     }
//   }

//   // Bonus sections
//   for (const section of bonusSections) {
//     if (sections[section] && sections[section].length > 0) {
//       score += 4;
//       present.push(section);
//     }
//   }

//   // Baseline: if we have a lot of 'other' content the resume has substance
//   if (sections.other && sections.other.length > 20 && score < 40) {
//     score = Math.max(score, 45);
//   }

//   return {
//     contentCompleteScore: Math.min(Math.round(score), 100),
//     missingSections: missing,
//     presentSections: present,
//   };
// }

// /**
//  * Detect quantified achievements in resume text
//  * Much more lenient — looks for any numbers, metrics, or impact language
//  */
// function calculateAchievementsScore(rawText) {
//   const lines = rawText.split('\n').filter(l => l.trim().length > 8);

//   // Broad pattern: any number or metric anywhere in a line
//   const quantifiedPattern = /(\d+%|\$[\d,]+|\d+x|\d+\+|₹[\d,]+|[\d,]+\s*(users|customers|clients|revenue|sales|employees|team|projects|systems|features|bugs|issues|tickets|hours|days|months|weeks|countries|regions|markets|requests|queries|records|transactions)|\b\d{2,}\b)/i;

//   // Impact/action phrases that imply strong bullets even without numbers
//   const impactPattern = /(increased|decreased|reduced|improved|optimized|accelerated|grew|scaled|launched|delivered|achieved|exceeded|saved|generated|streamlined|automated|built|led|managed|spearheaded|drove|pioneered|revamped)/i;

//   // Detect bullet lines broadly (includes indented lines starting with common chars)
//   const bulletLines = lines.filter(l =>
//     /^[\-•*▪▸◦>◉○●]\s/.test(l.trim()) ||
//     /^\d+[.)]\s/.test(l.trim()) ||
//     /^\s{2,}[A-Z]/.test(l)        // indented lines starting with capital (common in PDFs)
//   );

//   const targetLines = bulletLines.length >= 4 ? bulletLines : lines; // fallback to all lines

//   const quantifiedLines = targetLines.filter(l => quantifiedPattern.test(l));
//   const impactLines    = targetLines.filter(l => impactPattern.test(l) && !quantifiedPattern.test(l));

//   if (targetLines.length === 0) {
//     return { achievementsScore: 40, quantifiedCount: 0, totalBullets: 0 };
//   }

//   // Quantified lines score higher than impact-only lines
//   const quantifiedRatio = quantifiedLines.length / targetLines.length;
//   const impactRatio     = impactLines.length    / targetLines.length;

//   // Score: quantified(70%) + impact language(30%) — floor at 35
//   let score = Math.round((quantifiedRatio * 70) + (impactRatio * 30));
//   score = Math.max(score, 35); // floor: most resumes have at least some action verbs
//   score = Math.min(score, 100);

//   return {
//     achievementsScore: score,
//     quantifiedCount: quantifiedLines.length,
//     totalBullets: targetLines.length,
//   };
// }

// module.exports = {
//   extractTextFromFile,
//   detectSections,
//   detectFormattingIssues,
//   calculateContentCompleteScore,
//   calculateAchievementsScore,
// };

// edit 3 -------
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

/**
 * Extract raw text from uploaded resume file
 * Supports PDF and DOCX
 */
async function extractTextFromFile(fileBuffer, originalName) {
  const ext = path.extname(originalName).toLowerCase();

  if (ext === '.pdf') {
    const data = await pdfParse(fileBuffer);
    return data.text;
  }

  if (ext === '.docx' || ext === '.doc') {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  }

  throw new Error(`Unsupported file type: ${ext}. Please upload PDF or DOCX.`);
}

/**
 * Basic rule-based section detection
 * Returns structured sections from raw text
 */
function detectSections(rawText) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

  // Expanded: catches "Work Experience", "Professional Experience", "SKILLS & TOOLS" etc.
  const sectionKeywords = {
    summary: ['summary', 'objective', 'profile', 'about', 'overview', 'professional summary', 'career objective', 'personal statement', 'introduction'],
    experience: ['experience', 'work history', 'employment', 'career', 'work experience', 'professional experience', 'job history', 'positions held', 'relevant experience'],
    education: ['education', 'academic', 'qualification', 'degree', 'educational background', 'academic background', 'schooling', 'university', 'college'],
    skills: ['skills', 'technical skills', 'competencies', 'technologies', 'tools', 'expertise', 'core skills', 'key skills', 'skill set', 'tech stack', 'languages', 'frameworks'],
    certifications: ['certification', 'certificate', 'license', 'credential', 'certifications', 'licenses', 'accreditation'],
    projects: ['projects', 'portfolio', 'work samples', 'personal projects', 'side projects', 'key projects', 'project experience'],
    achievements: ['achievements', 'awards', 'honors', 'accomplishments', 'recognition', 'accolades', 'publications', 'volunteer'],
  };

  const sections = {
    summary: [],
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    achievements: [],
    other: [],
  };

  let currentSection = 'other';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineLower = line.toLowerCase();

    // Check if this line is a section header
    let foundSection = null;
    for (const [section, keywords] of Object.entries(sectionKeywords)) {
      if (keywords.some(kw => lineLower.includes(kw)) && line.length < 100) {
        foundSection = section;
        break;
      }
    }

    // If no match, try combining with next line (handles PDF splits like "WORK" + "EXPERIENCE")
    if (!foundSection && i + 1 < lines.length) {
      const combinedLine = lineLower + ' ' + lines[i + 1].toLowerCase();
      for (const [section, keywords] of Object.entries(sectionKeywords)) {
        if (keywords.some(kw => combinedLine.includes(kw)) && combinedLine.length < 100) {
          foundSection = section;
          // Skip the next line since we've combined it
          i++;
          break;
        }
      }
    }

    if (foundSection) {
      currentSection = foundSection;
    } else {
      sections[currentSection].push(line);
    }
  }

  return sections;
}

/**
 * Detect formatting issues that hurt ATS parsing
 */
function detectFormattingIssues(rawText, fileName) {
  const issues = [];
  const warnings = [];

  // Check for tables (rough heuristic: many | characters)
  const pipeCount = (rawText.match(/\|/g) || []).length;
  if (pipeCount > 10) {
    issues.push('Resume appears to use tables — many ATS systems cannot parse tables correctly');
  }

  // Check for very short lines (could indicate columns)
  const lines = rawText.split('\n').filter(l => l.trim().length > 0);
  const shortLines = lines.filter(l => l.trim().length < 20);
  if (shortLines.length / lines.length > 0.4) {
    warnings.push('Resume may use multi-column layout — ATS systems often read columns left-to-right causing jumbled text');
  }

  // Check length
  const wordCount = rawText.split(/\s+/).filter(Boolean).length;
  if (wordCount < 150) {
    issues.push('Resume is very short — add more detail to your experience and skills sections');
  }
  if (wordCount > 1200) {
    warnings.push('Resume may be too long — aim for 1-2 pages (400-800 words)');
  }

  // Check for contact info
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(rawText);
  const hasPhone = /(\+?\d[\d\s\-().]{7,}\d)/.test(rawText);
  const hasLinkedIn = /(linkedin\.com\/in\/|linkedin\.com\/pub\/)/i.test(rawText);
  const hasGitHub = /(github\.com\/)/i.test(rawText);
  const hasPortfolio = /(portfolio|website|personal site|blog).*?(http|www\.)/i.test(rawText);

  if (!hasEmail) issues.push('No email address detected');
  if (!hasPhone) warnings.push('No phone number detected');
  if (!hasLinkedIn) warnings.push('Consider adding your LinkedIn profile URL');

  // Calculate formatting score — gentler penalties
  let formattingScore = 100;
  formattingScore -= issues.length * 10;   // was 15 — hard issues
  formattingScore -= warnings.length * 5;  // was 8  — soft warnings
  
  // Bonuses for having professional links
  if (hasLinkedIn) formattingScore += 3;
  if (hasGitHub) formattingScore += 2;
  if (hasPortfolio) formattingScore += 2;
  
  formattingScore = Math.min(formattingScore, 100); // cap at 100
  formattingScore = Math.max(formattingScore, 25);  // floor at 25

  return { 
    issues, 
    warnings, 
    formattingScore,
    hasLinkedIn,
    hasGitHub,
    hasPortfolio,
  };
}

/**
 * Check section completeness
 */
function calculateContentCompleteScore(sections) {
  // Weights: experience(30) + skills(25) + education(20) + summary(15) + bonus(10)
  const sectionWeights = {
    experience: 30,
    skills: 25,
    education: 20,
    summary: 15,
  };
  const bonusSections = ['certifications', 'projects', 'achievements'];

  let score = 0;
  const missing = [];
  const present = [];

  for (const [section, weight] of Object.entries(sectionWeights)) {
    if (sections[section] && sections[section].length > 0) {
      score += weight;
      present.push(section);
    } else {
      // Partial credit — even without a dedicated section header,
      // many resumes have content detected under 'other'
      if (sections.other && sections.other.length > 5) {
        score += Math.round(weight * 0.3); // 30% credit
      }
      missing.push(section);
    }
  }

  // Bonus sections
  for (const section of bonusSections) {
    if (sections[section] && sections[section].length > 0) {
      score += 4;
      present.push(section);
    }
  }

  // Baseline: if we have a lot of 'other' content the resume has substance
  if (sections.other && sections.other.length > 20 && score < 40) {
    score = Math.max(score, 45);
  }

  return {
    contentCompleteScore: Math.min(Math.round(score), 100),
    missingSections: missing,
    presentSections: present,
  };
}

/**
 * Detect quantified achievements in resume text
 * Much more lenient — looks for any numbers, metrics, or impact language
 */
function calculateAchievementsScore(rawText) {
  const lines = rawText.split('\n').filter(l => l.trim().length > 8);

  // Broad pattern: any number or metric anywhere in a line
  const quantifiedPattern = /(\d+%|\$[\d,]+|\d+x|\d+\+|₹[\d,]+|[\d,]+\s*(users|customers|clients|revenue|sales|employees|team|projects|systems|features|bugs|issues|tickets|hours|days|months|weeks|countries|regions|markets|requests|queries|records|transactions)|\b\d{2,}\b)/i;

  // Impact/action phrases that imply strong bullets even without numbers
  const impactPattern = /(increased|decreased|reduced|improved|optimized|accelerated|grew|scaled|launched|delivered|achieved|exceeded|saved|generated|streamlined|automated|built|led|managed|spearheaded|drove|pioneered|revamped)/i;

  // Detect bullet lines broadly (includes indented lines starting with common chars)
  const bulletLines = lines.filter(l =>
    /^[\-•*▪▸◦>◉○●]\s/.test(l.trim()) ||
    /^\d+[.)]\s/.test(l.trim()) ||
    /^\s{2,}[A-Z]/.test(l)        // indented lines starting with capital (common in PDFs)
  );

  const targetLines = bulletLines.length >= 4 ? bulletLines : lines; // fallback to all lines

  const quantifiedLines = targetLines.filter(l => quantifiedPattern.test(l));
  const impactLines    = targetLines.filter(l => impactPattern.test(l) && !quantifiedPattern.test(l));

  if (targetLines.length === 0) {
    return { achievementsScore: 40, quantifiedCount: 0, totalBullets: 0 };
  }

  // Quantified lines score higher than impact-only lines
  const quantifiedRatio = quantifiedLines.length / targetLines.length;
  const impactRatio     = impactLines.length    / targetLines.length;

  // Score: quantified(70%) + impact language(30%) — floor at 35
  let score = Math.round((quantifiedRatio * 70) + (impactRatio * 30));
  score = Math.max(score, 35); // floor: most resumes have at least some action verbs
  score = Math.min(score, 100);

  return {
    achievementsScore: score,
    quantifiedCount: quantifiedLines.length,
    totalBullets: targetLines.length,
  };
}

/**
 * Extract and parse experience entries from experience section
 * Handles various date formats and calculates total duration
 */
function parseExperienceEntries(experienceSectionText) {
  const text = experienceSectionText.join('\n');
  
  // Pattern to match job entries with dates
  // Matches: "JobTitle, Company" or "JobTitle, Company — dates" or "JobTitle dates"
  const datePattern = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|June|July|August|September|October|November|December|\d{1,2})[\s\-–](\d{4})\b/gi;
  
  const entries = [];
  let totalMonths = 0;
  let entryCount = 0;

  // Split text into potential job entries (separated by blank lines or company names)
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  
  let currentEntry = [];
  for (const line of lines) {
    // Check if this looks like a job header (has title + company + date)
    const dateMatches = line.match(datePattern);
    
    if (dateMatches && currentEntry.length > 0) {
      // Start new entry - save previous one
      entries.push(currentEntry.join(' '));
      currentEntry = [line];
    } else {
      currentEntry.push(line);
    }
  }
  if (currentEntry.length > 0) {
    entries.push(currentEntry.join(' '));
  }

  // Parse each entry for dates and calculate duration
  for (const entry of entries) {
    const dates = extractDatesFromEntry(entry);
    if (dates.startDate || dates.endDate) {
      entryCount++;
      const months = calculateMonthsDuration(dates.startDate, dates.endDate);
      totalMonths += months;
      console.log(`  ✓ Job ${entryCount}: ${dates.startDate.month}/${dates.startDate.year} → ${dates.endDate.month}/${dates.endDate.year} (${months} months)`);
    }
  }

  return {
    entriesFound: entryCount,
    totalMonths: totalMonths,
    totalYears: (totalMonths / 12).toFixed(1),
    entries: entries.slice(0, 5), // return first 5 entries
  };
}

/**
 * Extract start and end dates from a job entry
 */
function extractDatesFromEntry(entryText) {
  const monthYearPattern = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|June|July|August|September|October|November|December)\s+(\d{4})/gi;
  const dates = [];
  let match;
  
  while ((match = monthYearPattern.exec(entryText)) !== null) {
    dates.push({
      month: getMonthNumber(match[1]),
      year: parseInt(match[2]),
    });
  }

  // If fewer than 2 dates, look for year-only pattern (implicit start or end)
  if (dates.length < 2) {
    const yearOnly = /\b(20\d{2})\b/g;
    const yearMatches = [...entryText.matchAll(yearOnly)].map(m => ({
      month: dates.length > 0 ? dates[0].month : 1, // default to Jan
      year: parseInt(m[1]),
    }));
    dates.push(...yearMatches);
  }

  // Handle "Present" or "Current"
  const isPresentOrCurrent = /\b(present|current|ongoing)\b/i.test(entryText);
  const endDate = isPresentOrCurrent ? getCurrentDate() : (dates.length > 1 ? dates[1] : dates[0]);
  const startDate = dates.length > 0 ? dates[0] : null;

  return {
    startDate,
    endDate,
    isPresentOrCurrent,
  };
}

/**
 * Calculate months between two dates
 */
function calculateMonthsDuration(startDate, endDate) {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate.year, startDate.month - 1, 1);
  const end = new Date(endDate.year, endDate.month - 1, 1);

  const monthDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return Math.max(monthDiff, 0);
}

/**
 * Convert month name to number (1-12)
 */
function getMonthNumber(monthName) {
  const months = {
    'jan': 1, 'january': 1,
    'feb': 2, 'february': 2,
    'mar': 3, 'march': 3,
    'apr': 4, 'april': 4,
    'may': 5,
    'jun': 6, 'june': 6,
    'jul': 7, 'july': 7,
    'aug': 8, 'august': 8,
    'sep': 9, 'september': 9,
    'oct': 10, 'october': 10,
    'nov': 11, 'november': 11,
    'dec': 12, 'december': 12,
  };
  return months[monthName.toLowerCase()] || 1;
}

/**
 * Get current date object
 */
function getCurrentDate() {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };
}

module.exports = {
  extractTextFromFile,
  detectSections,
  detectFormattingIssues,
  calculateContentCompleteScore,
  calculateAchievementsScore,
  parseExperienceEntries,
};