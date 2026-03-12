import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="interview-home">
      <div className="interview-home__container">
        <header className="interview-home__header">
          <h1 className="interview-home__title">
            Create Your Custom <span className="highlight">Interview</span> Plan
          </h1>
          <p className="interview-home__subtitle">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </header>

        <section
          className="interview-home__panel"
          aria-label="Interview plan inputs"
        >
          <div className="interview-home__grid">
            <article className="interview-card interview-card--left">
              <div className="interview-card__head">
                <div className="interview-card__head-left">
                  <span className="interview-card__icon" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 8h8M8 12h10M8 16h7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <h2 className="interview-card__title">
                    Target Job Description
                  </h2>
                </div>
                <span className="pill pill--required">Required</span>
              </div>

              <label className="sr-only" htmlFor="jobDescription">
                Target job description
              </label>
              <textarea
                className="interview-textarea"
                id="jobDescription"
                name="jobDescription"
                placeholder={`Paste the full job description here...\n\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."`}
              />

              <div className="interview-card__foot">
                <span className="muted">0 / 5000 chars</span>
              </div>
            </article>

            <article className="interview-card interview-card--right">
              <div className="interview-card__head">
                <div className="interview-card__head-left">
                  <span className="interview-card__icon" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M20 21a8 8 0 1 0-16 0"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <h2 className="interview-card__title">Your Profile</h2>
                </div>
              </div>

              <div className="interview-field">
                <div className="interview-field__label-row">
                  <label className="interview-field__label" htmlFor="resume">
                    Upload Resume{" "}
                    <span className="pill pill--best">Best Results</span>
                  </label>
                </div>

                <label className="dropzone" htmlFor="resume">
                  <span className="dropzone__icon" aria-hidden="true">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 16V8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8.5 11.5 12 8l3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 16.5a4.5 4.5 0 0 0-3.9-4.46A6 6 0 0 0 4 13a3.5 3.5 0 0 0 .5 7H18a2 2 0 0 0 2-2v-1.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="dropzone__title">
                    Click to upload or drag &amp; drop
                  </span>
                  <span className="dropzone__meta">PDF or DOCX (Max 5MB)</span>
                </label>

                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  hidden
                />
              </div>

              <div className="divider">
                <span className="divider__text">OR</span>
              </div>

              <div className="interview-field">
                <label
                  className="interview-field__label"
                  htmlFor="selfDescription"
                >
                  Quick Self-Description
                </label>
                <textarea
                  className="interview-textarea interview-textarea--compact"
                  id="selfDescription"
                  name="selfDescription"
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                />
              </div>

              <div className="callout" role="note">
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required to generate a
                personalized plan.
              </div>

              <div className="interview-card__actions">
                <span className="muted">
                  AI-Powered Strategy Generation • Approx 30s
                </span>
                <button
                  type="button"
                  className="button button-primary interview-cta"
                >
                  Generate My Interview Strategy
                </button>
              </div>

              <Link
                to={`/interview/${3}`}
                className="button button-primary interview-cta"
              >
                Generate My Interview Strategy
              </Link>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
