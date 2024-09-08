import { http, HttpResponse, delay } from "msw";
import { faker } from "@faker-js/faker";
import { LinkData } from "@/api/linksApi";

class LinkStore {
  links: Array<LinkData>;

  constructor(links: Array<LinkData>) {
    this.links = links;
  }

  deleteLink(id: string) {
    this.links = this.links.filter((link) => link.id !== id);
    return this.links;
  }
}

const generateMockLink = (): LinkData => ({
  id: faker.string.uuid(),
  name: faker.internet.domainName(),
  dateShared: faker.date
    .between({ from: "2000-01-01", to: Date.now() })
    .toLocaleDateString(undefined, {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
});

const initLinks: Array<LinkData> = [];
for (let i = 0; i < 10; i++) {
  initLinks.push(generateMockLink());
}

const linkStore = new LinkStore(initLinks);

let deleteCount = 0;

export const linksHandlers = [
  http.get("http://localhost:5173/links", async () => {
    await delay(1000);

    const mockLinks = linkStore.links;

    return HttpResponse.json(mockLinks);
  }),

  http.delete("http://localhost:5173/links/:id", async ({ params }) => {
    deleteCount++;
    await delay(1000);
    if (deleteCount % 3 === 0) return new HttpResponse(null, { status: 400 });

    const { id } = params;

    if (typeof id !== "string") return new HttpResponse(null, { status: 400 });

    linkStore.deleteLink(id);

    return new HttpResponse(null, { status: 204 }); // 204 No Content
  }),
];
