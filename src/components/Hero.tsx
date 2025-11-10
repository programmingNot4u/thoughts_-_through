import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-20 pb-32 bg-gradient-to-br from-forest-green via-deep-green to-forest-green overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Evidence-based Insights for a Sustainable Future
          </h1>
          <p className="text-xl md:text-2xl text-light-green mb-10 max-w-3xl mx-auto leading-relaxed">
            Survey. Research. Consultancy services grounded in data and
            environmental awareness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/research-areas" className="btn-primary">
              View Our Research
            </Link>
            <Link
              to="/projects"
              className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-forest-green">
              Explore Ongoing Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
