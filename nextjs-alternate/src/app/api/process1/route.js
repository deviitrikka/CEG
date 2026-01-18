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

// Clean text helper
function cleanText(text) {
  return text
    .replace(/<[^>]*?>/g, '')
    .replace(/https?:\/\/[^\s]+/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
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
    ### SCRAPED TEXT FROM WEBSITE
    {page_data}
    
    ### INSTRUCTION:
    Extract job posting from the scraped text and return a JSON object with:
    - \`role\`
    - \`skills\` (as a list)
    - \`experience\`
    - \`job_details\`

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
    const { url } = await request.json();
    // url.toString();
    
    // Scrape and clean text
    const loader = new CheerioWebBaseLoader(url.toString());
    const docs = await loader.load();
    // console.log("docs: ", {docs});
    const textData = cleanText(docs[0].pageContent);
    console.log(textData);

    const truncatedText = truncateToTokenLimit(textData);
    
    // Extract job info
    const job = await extractJobs(truncatedText);
    console.log(job);
    
    // Generate email (no portfolio/links needed for individual email)
    const email = await writeEmailAsIndividual(job);
    
    return NextResponse.json({
      results: [{ job, email }]
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}