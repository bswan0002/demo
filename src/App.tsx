import { LinkData, LinkTable } from "./LinkTable";
import { faker } from "@faker-js/faker";

const links: Array<LinkData> = [
  {
    name: "Shopping List Summary",
    dateShared: faker.date
      .between({ from: "2000-01-01", to: Date.now() })
      .toLocaleDateString(undefined, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
  },
];
export default function App() {
  return (
    <div className="container mx-auto">
      <LinkTable links={links} />
    </div>
  );
}
