const express = require("express");
const interviewRouter = express.Router();
const { authenticateToken } = require("../middlewares/auth.middleware");
const interviewController = require("../controller/interview.controller");
const fileMiddleware = require("../middlewares/file.middleware");

/**
 * @route POST /api/interview/generate-interview-report
 * @description Generate an interview report for a candidate on basis of job description and resume
 * @access Private
 */
interviewRouter.post(
  "/generate-interview-report",
  authenticateToken,
  fileMiddleware.single("resume"),
  interviewController.generateInterviewReportController,
);

/**
 *
 * @route GET /api/interview/:interviewId
 * @description Get all interview reports for a candidate
 * @access Private
 */
interviewRouter.post(
  "/:interviewReportId",
  authenticateToken,
  interviewController.getAllInterviewReportsController,
);

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authenticateToken,
  interviewController.generateResumePdfController,
);
/**
 *
 * @route GET /api/interview/all
 * @description Get all interview reports for a candidate
 * @access Private
 */
interviewRouter.get(
  "/all",
  authenticateToken,
  interviewController.getAllInterviewReportsController,
);

module.exports = interviewRouter;
