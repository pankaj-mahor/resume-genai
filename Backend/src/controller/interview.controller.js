const interviewReportModel = require("../models/interviewReport.model");
const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const { get } = require("mongoose");
/**
 * @route POST /api/interview/generate-interview-report
 * @description Generate an interview report for a candidate on basis of job description and resume
 * @access Private
 * @returns {Object} 200 - Interview report generated successfully
 * @returns {Object} 400 - Bad request
 * @returns {Object} 500 - Internal server error
 *
 * @param {*} req
 * @param {*} res
 */
const generateInterviewReportController = async (req, res) => {
  const resumeFile = req.file;

  const { jobDescription, selfDescription } = req.body;
  const userId = req.user.id;

  if (!resumeFile) {
    return res
      .status(400)
      .json({ message: "Resume file is required", success: false });
  }

  const resumeDataFromPDF = await new pdfParse.PDFParse(
    Uint8Array.from(resumeFile.buffer),
  ).getText();
  const resumeTextFromPDF = resumeDataFromPDF.text;

  //interview report by ai
  const interviewReportByAI = await generateInterviewReport({
    resume: resumeTextFromPDF,
    jobDescription,
    selfDescription,
  });

  const newInterviewReport = await interviewReportModel.create({
    user: userId,
    resume: resumeDataFromPDF,
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
 * @returns {Object} 200 - Interview report fetched successfully
 * @returns {Object} 400 - Bad request
 * @returns {Object} 500 - Internal server error
 *
 * @param {*} req
 * @param {*} res
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
 * @returns {Object} 200 - Interview reports fetched successfully
 * @returns {Object} 400 - Bad request
 * @returns {Object} 500 - Internal server error
 *
 * @param {*} req
 * @param {*} res
 */

const getAllInterviewReportsController = async (req, res) => {
  const interviewReports = await interviewReportModel.find({
    user: req.user.id,
  });
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

module.exports = {
  generateInterviewReportController,
  getAllInterviewReportsController,
  getInterviewReportIdController,
};
