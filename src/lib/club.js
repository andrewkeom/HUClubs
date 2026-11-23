import { clubs } from "../data/mockData";

export function findClubName(clubId) {
  const club = clubs.find((c) => {
    if (c.id === clubId) {
      return true;
    }
    return false;
  });
  if (club) {
    return club.name;
  }
  return "Unknown Club";
}
