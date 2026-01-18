import { NextResponse } from 'next/server';
import { ChatGroq } from '@langchain/groq';
import { PromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';

// Initialize LLM
const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: 'meta-llama/llama-4-scout-17b-16e-instruct',
  temperature: 0,
});

// Check if input is a URL
function isUrl(input) {
  if (!input || typeof input !== 'string') return false;
  const trimmed = input.trim();
  try {
    const url = new URL(trimmed);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Clean text helper (for scraped content)
function cleanText(text) {
  return text
    .replace(/<[^>]*?>/g, '')
    .replace(/https?:\/\/[^\s]+/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Light cleaning for direct text input (preserves structure)
function cleanDirectText(text) {
  return text.trim().replace(/\s{3,}/g, ' ').trim();
}

function truncateToTokenLimit(text, maxTokens = 25000) {
    const maxChars = maxTokens * 4;
    if (text.length > maxChars) {
      console.log(`Text truncated from ${text.length} to ${maxChars} characters`);
      return text.slice(0, maxChars);
    }
    return text;
}

// Extract jobs from text
async function extractJobs(cleanedText) {
  const promptExtract = PromptTemplate.fromTemplate(`
    ### JOB DESCRIPTION TEXT
    {page_data}
    
    ### INSTRUCTION:
    Extract job posting from the text and return a JSON object with:
    - \`role\`
    - \`skills\` (as a list)
    - \`experience\`
    - \`job_details\`
    **IMPORTANT: All values must be strings or arrays of strings. Do NOT return objects for any field.**
    **Ensure that the response is valid JSON and does not contain extra text.**
    **Ensure that the response is only one job posting, even if there are multiple job postings in the text, return only one.**

    ### OUTPUT FORMAT:
    \`\`\`json
    {{
        "role": "Software Engineer",
        "skills": ["Python", "Django", "REST APIs"],
        "experience": "2+ years",
        "job_details": "Full-time position in a tech company."
    }}
    \`\`\`
  `);

  const chain = promptExtract.pipe(llm);
  const response = await chain.invoke({ page_data: cleanedText });
  
  const parser = new JsonOutputParser();
  return parser.parse(response.content);
}

// Generate email as individual
async function writeEmailAsIndividual(job) {
  const promptEmail = PromptTemplate.fromTemplate(`
    ### JOB DESCRIPTION:
    {job_description}

    ### INSTRUCTION:
    You are ABC, a highly skilled professional with expertise relevant to the given job description. 
    You are applying for this role and need to craft a compelling, personalized cold email that highlights:
    - Your key skills and experience that align with the job.
    - Your enthusiasm for the position and the company.
    - How you can add value to the organization.
    - A polite and professional request for further discussion or an interview.

    Make the email concise, engaging, and persuasive while maintaining a formal yet approachable tone.

    ### OUTPUT FORMAT:
    Provide the email in a professional format with:
    - A subject line
    - A proper salutation
    - A well-structured body (opening, main content, closing)
    - A polite sign-off

    ### EMAIL (NO PREAMBLE):
  `);

  const chain = promptEmail.pipe(llm);
  const response = await chain.invoke({ 
    job_description: JSON.stringify(job)
  });
  
  return response.content;
}

export async function POST(request) {
  try {
    const { input } = await request.json();
    
    if (!input || !input.trim()) {
      return NextResponse.json(
        { error: "Please provide either a job description or a job URL" },
        { status: 400 }
      );
    }

    let textData;

    // Check if input is a URL or plain text
    if (isUrl(input)) {
      // If it's a URL, scrape the page
      console.log("Detected URL, scraping page...");
      try {
        const loader = new CheerioWebBaseLoader(input.trim());
        const docs = await loader.load();
        textData = cleanText(docs[0].pageContent);
        console.log("Scraped text length:", textData.length);
      } catch (scrapeError) {
        console.error("Scraping error:", scrapeError);
        return NextResponse.json(
          { error: "Failed to scrape the URL. Please check if the URL is valid and accessible." },
          { status: 400 }
        );
      }
    } else {
      // If it's plain text, use it directly with light cleaning
      console.log("Detected plain text, using directly...");
      textData = cleanDirectText(input);
      console.log("Text length:", textData.length);
    }

    const truncatedText = truncateToTokenLimit(textData);
    
    // Extract job info
    const job = await extractJobs(truncatedText);
    console.log("Extracted job:", job);
    
    // Generate email
    const email = await writeEmailAsIndividual(job);
    
    return NextResponse.json({
      results: [{ job, email }]
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}