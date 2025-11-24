import { useMemo } from "react";
import type { OrganizationalMember } from "../services/aboutService";

interface OrganizationalStructureProps {
  members: OrganizationalMember[];
}

const OrganizationalStructure = ({ members }: OrganizationalStructureProps) => {
  // Build hierarchical structure
  const hierarchy = useMemo(() => {
    const memberMap = new Map<number, OrganizationalMember & { children: OrganizationalMember[] }>();
    const rootMembers: (OrganizationalMember & { children: OrganizationalMember[] })[] = [];

    // Initialize all members with children array
    members.forEach((member) => {
      memberMap.set(member.id, { ...member, children: [] });
    });

    // Build tree structure
    members.forEach((member) => {
      const memberWithChildren = memberMap.get(member.id)!;
      if (member.reports_to) {
        const parent = memberMap.get(member.reports_to);
        if (parent) {
          parent.children.push(memberWithChildren);
        } else {
          rootMembers.push(memberWithChildren);
        }
      } else {
        rootMembers.push(memberWithChildren);
      }
    });

    // Sort by level and order
    const sortMembers = (
      mems: (OrganizationalMember & { children: OrganizationalMember[] })[]
    ) => {
      mems.sort((a, b) => {
        if (a.level !== b.level) return a.level - b.level;
        return a.order - b.order;
      });
      mems.forEach((mem) => {
        if (mem.children.length > 0) {
          sortMembers(mem.children);
        }
      });
    };

    sortMembers(rootMembers);
    return rootMembers;
  }, [members]);

  const renderMember = (
    member: OrganizationalMember & { children: OrganizationalMember[] },
    isRoot: boolean = false
  ) => {
    return (
      <div key={member.id} className="flex flex-col items-center">
        {/* Member Card */}
        <div
          className={`${
            isRoot
              ? "bg-forest-green text-white"
              : "bg-light-green border-2 border-forest-green"
          } px-6 py-3 rounded-lg font-heading font-bold text-center min-w-[200px] max-w-[250px] shadow-lg`}>
          <div className="font-semibold">{member.designation}</div>
          {member.name && (
            <div className={`text-sm mt-1 ${isRoot ? "text-white/90" : "text-dark-gray"}`}>
              {member.name}
            </div>
          )}
        </div>

        {/* Children */}
        {member.children.length > 0 && (
          <>
            {/* Connector Line */}
            <div className="w-1 h-8 bg-forest-green my-4"></div>

            {/* Children Container */}
            <div className="flex flex-wrap justify-center gap-8">
              {member.children.map((child) => renderMember(child, false))}
            </div>
          </>
        )}
      </div>
    );
  };

  if (members.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-2 border-forest-green rounded-lg p-8 overflow-x-auto">
      <h3 className="text-3xl font-heading font-bold text-dark-gray text-center mb-12">
        Organizational Structure
      </h3>
      <div className="flex flex-col items-center min-w-max">
        {hierarchy.map((rootMember) => renderMember(rootMember, true))}
      </div>
    </div>
  );
};

export default OrganizationalStructure;

