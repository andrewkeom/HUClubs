import AppScreen from "../../../components/AppScreen";
import ClubCard from "../../../components/ClubCard";
import { clubs } from "../../../data/mockData";

export default function Clubs() {
  return (
    <AppScreen>
      {clubs.map((c) => {
        return <ClubCard key={c.id} club={c} />;
      })}
    </AppScreen>
  );
}
