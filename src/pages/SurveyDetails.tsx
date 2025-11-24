import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { surveyService, type Survey } from "../services/surveyService";

const SurveyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await surveyService.getById(id);
          setSurvey(data);
        } catch (error) {
          console.error("Error fetching survey:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSurvey();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-forest-green text-xl">Loading...</div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-dark-gray mb-4">
            Survey Not Found
          </h1>
          <p className="text-medium-gray mb-8">
            The survey you're looking for doesn't exist.
          </p>
          <Link to="/surveys" className="btn-primary">
            Back to Surveys
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-500 text-white";
      case "Completed":
        return "bg-green-600 text-white";
      case "Upcoming":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Calculate participation metrics
  const targetParticipants = survey.participants ? survey.participants * 1.5 : 1000;
  const participationRate = survey.participants 
    ? Math.min((survey.participants / targetParticipants) * 100, 100)
    : 0;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-light-green/30 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/surveys"
          className="inline-flex items-center text-forest-green hover:text-deep-green mb-8 transition-colors font-medium">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to All Surveys
        </Link>

        {/* Survey Header Card */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-forest-green/20 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-forest-green to-deep-green p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-white/90 text-sm font-medium block mb-1">
                    {survey.category}
                  </span>
                  <span className="text-white/80 text-xs">
                    {new Date(survey.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${getStatusColor(
                  survey.status
                )}`}>
                {survey.status}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {survey.title}
            </h1>
            {survey.author && (
              <p className="text-white/90 mb-4">
                Conducted by <span className="font-semibold">{survey.author}</span>
              </p>
            )}
          </div>

          {/* Participation Stats */}
          {survey.participants && survey.participants > 0 && (
            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-forest-green mb-1">
                    {survey.participants.toLocaleString()}
                  </div>
                  <div className="text-sm text-medium-gray">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-forest-green mb-1">
                    {Math.round(participationRate)}%
                  </div>
                  <div className="text-sm text-medium-gray">Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-forest-green mb-1">
                    {targetParticipants.toLocaleString()}
                  </div>
                  <div className="text-sm text-medium-gray">Target</div>
                </div>
              </div>
              <div className="w-full bg-light-green rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-forest-green to-deep-green h-3 rounded-full transition-all duration-500"
                  style={{ width: `${participationRate}%` }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Description Card */}
        <div className="bg-white rounded-xl shadow-md border-2 border-forest-green/20 p-6 mb-8">
          <h2 className="text-xl font-heading font-bold text-dark-gray mb-4 flex items-center">
            <svg
              className="w-6 h-6 text-forest-green mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            About This Survey
          </h2>
          <p className="text-lg text-dark-gray leading-relaxed">
            {survey.description}
          </p>
        </div>

        {/* Objectives */}
        {survey.objectives && survey.objectives.length > 0 && (
          <div className="bg-white rounded-xl shadow-md border-2 border-forest-green/20 p-6 mb-8">
            <h2 className="text-xl font-heading font-bold text-dark-gray mb-4 flex items-center">
              <svg
                className="w-6 h-6 text-forest-green mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Survey Objectives
            </h2>
            <ul className="space-y-3">
            {survey.objectives?.map((objective, idx) => (
              <li key={idx} className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-forest-green/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg
                    className="w-4 h-4 text-forest-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-medium-gray leading-relaxed">{objective.objective}</span>
              </li>
            ))}
            </ul>
          </div>
        )}

        {/* Methodology */}
        {survey.methodology && (
          <div className="bg-white rounded-xl shadow-md border-2 border-forest-green/20 p-6 mb-8">
            <h2 className="text-xl font-heading font-bold text-dark-gray mb-4 flex items-center">
              <svg
                className="w-6 h-6 text-forest-green mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Methodology
            </h2>
            <p className="text-medium-gray leading-relaxed">
              {survey.methodology}
            </p>
          </div>
        )}

        {/* Content */}
        {survey.content && (
          <div className="mb-8">
            <div
              className="prose prose-lg max-w-none text-dark-gray"
              dangerouslySetInnerHTML={{ __html: survey.content }}
              style={{
                lineHeight: "1.8",
              }}
            />
          </div>
        )}

        {/* Findings */}
        {survey.findings && (
          <div className="bg-gradient-to-br from-forest-green to-deep-green rounded-xl shadow-lg p-8 mb-8 text-white">
            <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Key Findings
            </h2>
            <p className="text-white/95 leading-relaxed text-lg">{survey.findings}</p>
          </div>
        )}

        {/* Call to Action for Active Surveys */}
        {survey.status === "Active" && (
          <div className="bg-white rounded-xl shadow-lg border-2 border-forest-green p-8 mb-8 text-center">
            <h3 className="text-2xl font-heading font-bold text-dark-gray mb-4">
              Ready to Participate?
            </h3>
            <p className="text-medium-gray mb-6">
              Your input is valuable! Help us gather important data by participating in this survey.
            </p>
            <button className="bg-forest-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-deep-green transition-colors shadow-lg hover:shadow-xl">
              Start Survey
            </button>
          </div>
        )}

        {/* Tags */}
        {survey.tags && survey.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-heading font-bold text-dark-gray mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {survey.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-light-green text-forest-green rounded-full text-sm font-medium">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* External Links */}
        {survey.external_links && survey.external_links.length > 0 && (
          <div className="bg-light-green rounded-lg p-6 mb-8">
            <h3 className="text-xl font-heading font-bold text-dark-gray mb-4">
              Related Resources
            </h3>
            <ul className="space-y-3">
              {survey.external_links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-forest-green hover:text-deep-green transition-colors group">
                    <span className="mr-3">{link.title}</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyDetails;

