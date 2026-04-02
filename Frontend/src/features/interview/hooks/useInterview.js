import { useContext, useEffect } from "react";
import {
  getAllInterviewReportsOfUser,
  getInterviewReportById,
  generateInterviewReport,
  getGeneratedResume,
} from "../services/interview.api";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router-dom";

export const useInterview = () => {
  const { interviewId } = useParams();

  const { loading, report, setLoading, setReport, reports, setReports } =
    useContext(InterviewContext);

  const handleGenerateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    let response = null;
    try {
      setLoading(true);
      response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    return response.interviewReport;
  };

  const handleGetAllInterviewReports = async () => {
    let response = null;
    try {
      setLoading(true);
      response = await getAllInterviewReportsOfUser();
      setReports(response.interviewReports);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    return response.reports;
  };

  const handleGetInterviewReportById = async (interviewId) => {
    setLoading(true);
    let response = null;

    try {
      response = await getInterviewReportById(interviewId);

      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    return response.report;
  };

  const handleGeneratedResumePdf = async (interviewId) => {
    let response = null;
    try {
      setLoading(true);
      response = await getGeneratedResume(interviewId);
      setReport(response.interviewReport);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    return response.report;
  };

  useEffect(() => {
    if (interviewId) {
      handleGetInterviewReportById(interviewId);
    } else {
      handleGetAllInterviewReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,

    reports,

    handleGenerateInterviewReport,
    handleGetInterviewReportById,
    handleGetAllInterviewReports,

    handleGeneratedResumePdf,
  };
};
