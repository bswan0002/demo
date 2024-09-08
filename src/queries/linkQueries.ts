import { linksApi } from "@/api/linksApi";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const linkQueries = {
  getLinks: queryOptions({
    queryKey: ["getLinks"],
    queryFn: linksApi.getLinks,
    staleTime: 5 * 60 * 1000,
  }),
};

export const useDeleteLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: linksApi.deleteLink,
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: linkQueries.getLinks.queryKey,
      });

      // Snapshot the previous value
      const prevLinks = queryClient.getQueryData(linkQueries.getLinks.queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(linkQueries.getLinks.queryKey, (oldLinks) =>
        oldLinks?.filter((link) => link.id !== id)
      );

      // Return a context object with the snapshotted value
      return { prevLinks };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, id, context) => {
      const errLinkName = context?.prevLinks?.find(
        (link) => link.id === id
      )?.name;

      toast(`Error deleting ${errLinkName ?? "link"}`);
      queryClient.setQueryData(
        linkQueries.getLinks.queryKey,
        context?.prevLinks
      );
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: linkQueries.getLinks.queryKey,
      });
    },
  });
};
