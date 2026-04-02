const interviewReportModel = require("../models/interviewReport.model");
const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.service");

/**
 * @route POST /api/interview/generate-interview-report
 * @description Generate an interview report for a candidate on basis of job description and resume
 * @access Private
 */
const generateInterviewReportController = async (req, res) => {
  const { jobDescription, selfDescription } = req.body;
  const userId = req.user.id;

  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Resume file is required", success: false });
  }

  const resumeDataFromPDF = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const resumeTextFromPDF = resumeDataFromPDF.text;

  //interview report by ai
  const interviewReportByAI = await generateInterviewReport({
    resume: resumeTextFromPDF,
    jobDescription,
    selfDescription,
  });

  console.log("INTERVIEW REPORT GEN", interviewReportByAI);

  const newInterviewReport = await interviewReportModel.create({
    user: userId,
    resume: resumeTextFromPDF,
    selfDescription,
    jobDescription,
    ...interviewReportByAI,
  });

  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport: newInterviewReport,
    success: true,
  });
};

/**
 *
 * @route GET /api/interview/:interviewId
 * @description Get an interview report for a candidate
 * @access Private
 */
const getInterviewReportIdController = async (req, res) => {
  const { interviewId } = req.params;
  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });
  if (!interviewReport) {
    return res
      .status(400)
      .json({ message: "Interview report not found", success: false });
  }
  res.status(200).json({
    message: "Interview report fetched successfully",
    interviewReport,
    success: true,
  });
};

/**
 * @route GET /api/interview/all
 * @description Get all interview reports for a candidate
 * @access Private
 */
const getAllInterviewReportsController = async (req, res) => {
  const interviewReports = await interviewReportModel
    .find({
      user: req.user.id,
    })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  if (!interviewReports) {
    return res
      .status(400)
      .json({ message: "No interview reports found", success: false });
  }
  res.status(200).json({
    message: "Interview reports fetched successfully",
    interviewReports,
    success: true,
  });
};

/**
 * @route /interview/download-pdf
 * @description Controller to generate resume pdf based on user self description, resume and job description
 *
 */
const generateResumePdfController = async (req, res) => {
  console.log("Should Return PDF");
  const { interviewReportId } = req.params;

  const interviewReport =
    await interviewReportModel.findById(interviewReportId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "No Reports found.",
      success: false,
    });
  }

  const { resume, selfDescription, jobDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });

  return res.send(pdfBuffer);
};

module.exports = {
  generateInterviewReportController,
  getAllInterviewReportsController,
  getInterviewReportIdController,
  generateResumePdfController,
};
