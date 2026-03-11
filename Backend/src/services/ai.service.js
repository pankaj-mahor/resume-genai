const { GoogleGenAI } = require("@google/genai");

const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const googleGenAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

const interviewReportSchema = z
  .object({
    technicalQuestions: z
      .array(
        z.object({
          question: z
            .string()
            .describe("The technical question can be asked in the interview"),
          answer: z
            .string()
            .describe(
              "How to answer this question, what points to cover, what approach to take etc.",
            ),
          intention: z
            .string()
            .describe(
              "The intention of the interviewer behind asking this question",
            ),
        }),
      )
      .describe(
        "The technical questions that can be asked in the interview along with the answer and the intention of the interviewer",
      ),

    behavioralQuestions: z
      .array(
        z.object({
          question: z
            .string()
            .describe("The behavioral question can be asked in the interview"),
          answer: z
            .string()
            .describe(
              "How to answer this question, what points to cover, what approach to take etc.",
            ),
          intention: z
            .string()
            .describe(
              "The intention of the interviewer behind asking this question",
            ),
        }),
      )
      .describe(
        "The behavioral questions that can be asked in the interview along with the answer and the intention of the interviewer",
      ),

    skillGaps: z
      .array(
        z.object({
          skill: z.string().describe("the skill that candidate is lacking"),
          severity: z
            .enum(["low", "medium", "high"])
            .describe("The severity of the skill gap i.e low, medium, high"),
          gap: z
            .string()
            .describe("The gap in the skill that candidate is lacking"),
        }),
      )
      .describe(
        "List of skill gaps in the candidate profile along with the severity and the gap",
      ),

    preparationPlan: z
      .array(
        z.object({
          day: z
            .number()
            .describe("The day number in the preparation plan starting from 1"),
          focus: z
            .string()
            .describe("The main focus of the day in the preparation plan"),
          tasks: z
            .array(z.string())
            .describe("List of tasks that needs to be done on this day"),
        }),
      )
      .describe(
        "The day-wise preparation plan for the candidate to prepare for the interview",
      ),

    matchScore: z
      .number()
      .min(0)
      .max(100)
      .describe(
        "A score between 0 and 100 to indicate the match between the candidate and the job description",
      ),
    jobDescription: z
      .string()
      .describe(
        "The job description of the job that the candidate is applying for",
      ),
    resume: z.string().describe("The resume of the candidate"),
    selfDescription: z
      .string()
      .describe("The self description of the candidate"),
  })
  .describe("The interview report of the candidate for the job description");

const generateInterviewReport = async ({
  resume,
  jobDescription,
  selfDescription,
}) => {
  const prompt = `
        You are a helpful assistant that generates a interview report for a candidate for a job description.
        The candidate's resume is: ${resume}

        The job description is: ${jobDescription}

        The self description of the candidate is: ${selfDescription}
        `;

  const response = await googleGenAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "",
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  console.log(response.text);
};

const invokeGeminiAI = async () => {
  try {
    const response = await googleGenAI.models.generateContent({
      model: "gemini-2.5-flash",
      prompt:
        "Hello, Gemini, Explain what is the difference between a function and a method?",
    });
    console.log(response.text);
    // return response.tex;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  invokeGeminiAI,
};
