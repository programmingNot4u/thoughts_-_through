import { Link, useParams } from "react-router-dom";
import { getWebinarById } from "../data/webinars";

const WebinarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const webinar = id ? getWebinarById(id) : null;

  if (!webinar) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-dark-gray mb-4">
            Webinar Not Found
          </h1>
          <p className="text-medium-gray mb-8">
            The webinar you're looking for doesn't exist.
          </p>
          <Link to="/media" className="btn-primary">
            Back to Media
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-blue-50 via-light-green to-deep-green">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray mb-6">
            {webinar.title}
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-dark-gray mb-8">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-forest-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">{webinar.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-forest-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">
                GMT: {webinar.time.gmt} | BD Time: {webinar.time.bdTime}
              </span>
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-heading font-bold text-dark-gray mb-6">
            Webinar Topics
          </h2>
          <ul className="space-y-3">
            {webinar.topics.map((topic, index) => (
              <li
                key={index}
                className="flex items-start space-x-3 text-dark-gray">
                <span className="text-forest-green font-bold mt-1">
                  {index + 1}.
                </span>
                <span className="text-lg">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Participants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Presenter */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-forest-green to-deep-green rounded-full flex items-center justify-center text-4xl text-white">
              👨‍🔬
            </div>
            <h3 className="text-lg font-heading font-bold text-dark-gray text-center mb-2">
              {webinar.presenter.name}
            </h3>
            <p className="text-sm text-forest-green font-semibold text-center mb-2">
              {webinar.presenter.role}
            </p>
            <p className="text-xs text-medium-gray text-center">
              {webinar.presenter.affiliation}
            </p>
          </div>

          {/* Moderator */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-forest-green to-deep-green rounded-full flex items-center justify-center text-4xl text-white">
              🎤
            </div>
            <h3 className="text-lg font-heading font-bold text-dark-gray text-center mb-2">
              {webinar.moderator.name}
            </h3>
            <p className="text-sm text-forest-green font-semibold text-center mb-2">
              {webinar.moderator.role}
            </p>
            <p className="text-xs text-medium-gray text-center">
              {webinar.moderator.affiliation}
            </p>
          </div>

          {/* Discussants */}
          {webinar.discussants.map((discussant, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-forest-green to-deep-green rounded-full flex items-center justify-center text-4xl text-white">
                {index % 2 === 0 ? "👩‍🔬" : "👨‍🔬"}
              </div>
              <h3 className="text-lg font-heading font-bold text-dark-gray text-center mb-2">
                {discussant.name}
              </h3>
              <p className="text-sm text-forest-green font-semibold text-center mb-2">
                {discussant.role}
              </p>
              <p className="text-xs text-medium-gray text-center">
                {discussant.affiliation}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Participants */}
        {(webinar.welcomeSpeech || webinar.closingRemarks) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {webinar.welcomeSpeech && (
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-heading font-bold text-dark-gray mb-2">
                  {webinar.welcomeSpeech.role}
                </h3>
                <p className="text-forest-green font-semibold mb-1">
                  {webinar.welcomeSpeech.name}
                </p>
                <p className="text-sm text-medium-gray">
                  {webinar.welcomeSpeech.affiliation}
                </p>
              </div>
            )}
            {webinar.closingRemarks && (
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-heading font-bold text-dark-gray mb-2">
                  {webinar.closingRemarks.role}
                </h3>
                <p className="text-forest-green font-semibold mb-1">
                  {webinar.closingRemarks.name}
                </p>
                <p className="text-sm text-medium-gray">
                  {webinar.closingRemarks.affiliation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {webinar.description && (
          <div className="bg-white rounded-lg p-8 mb-8 shadow-lg">
            <h2 className="text-2xl font-heading font-bold text-dark-gray mb-4">
              About This Webinar
            </h2>
            <p className="text-medium-gray leading-relaxed">
              {webinar.description}
            </p>
          </div>
        )}

        {/* Organizer Info */}
        <div className="bg-deep-green rounded-lg p-8 text-white text-center shadow-lg">
          <p className="text-lg font-heading font-semibold mb-2">
            Organized by: {webinar.organizer}
          </p>
          <p className="text-light-green">{webinar.location}</p>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link to="/media" className="btn-primary inline-block">
            Back to Media & Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebinarDetails;
