import axios from "axios";

export type LinkData = {
  id: string;
  name: string;
  dateShared: string;
};

export const linksApi = {
  getLinks: async () => {
    const res = await axios.get<Array<LinkData>>("links");
    return res.data;
  },

  deleteLink: async (id: string) => {
    await axios.delete(`links/${id}`);
  },
};
