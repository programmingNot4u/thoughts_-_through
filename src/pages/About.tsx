import BoardDirectors from "../components/BoardDirectors";
import ChairmanIntro from "../components/ChairmanIntro";
import VisionMission from "../components/VisionMission";

const About = () => {
  return (
    <div className="pt-20">
      <VisionMission />
      <ChairmanIntro />
      <BoardDirectors />
    </div>
  );
};

export default About;
