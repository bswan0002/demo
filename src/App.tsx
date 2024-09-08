import { useQuery } from "@tanstack/react-query";
import { LinkTable } from "./LinkTable";
import { linkQueries, useDeleteLinkMutation } from "./queries/linkQueries";
import { Progress } from "./components/ui/progress";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const { data: links, isLoading: isLoadingLinks } = useQuery(
    linkQueries.getLinks
  );

  const { mutate: deleteLink } = useDeleteLinkMutation();

  if (isLoadingLinks) return <Progress indeterminate />;

  return (
    <>
      <div className="container mx-auto">
        <LinkTable links={links ?? []} deleteLink={deleteLink} />
      </div>
      <Toaster />
    </>
  );
}
