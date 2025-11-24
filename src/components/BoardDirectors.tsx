import { useEffect, useState } from "react";
import { aboutService, type OrganizationalMember } from "../services/aboutService";
import OrganizationalStructure from "./OrganizationalStructure";

const BoardDirectors = () => {
  const [members, setMembers] = useState<OrganizationalMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await aboutService.getOrganizationalMembers();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching organizational members:", error);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <section id="board-directors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-forest-green text-xl">Loading...</div>
        </div>
      </section>
    );
  }

  if (members.length === 0) {
    return null;
  }

  return (
    <section id="board-directors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-16">
          Board of Directors
        </h2>

        {/* Directors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="bg-light-green rounded-lg p-8 card-hover"
              data-aos="fade-up"
              data-aos-delay={index * 100}>
              <div className="flex items-start space-x-6">
                {member.image ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-forest-green">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-forest-green flex items-center justify-center text-3xl flex-shrink-0 text-white">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-heading font-bold text-dark-gray mb-2">
                    {member.name}
                  </h3>
                  <p className="text-forest-green font-semibold mb-3">
                    {member.designation}
                  </p>
                  {member.bio && (
                    <p className="text-medium-gray leading-relaxed">{member.bio}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Organizational Structure */}
        <OrganizationalStructure members={members} />
      </div>
    </section>
  );
};

export default BoardDirectors;
