import { LinkData } from "./api/linksApi";
import { Button } from "./components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./components/ui/table";
import { TrashIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";

type Props = { links: Array<LinkData>; deleteLink: (id: string) => void };

export const LinkTable = ({ links, deleteLink }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date Shared</TableHead>
          <TableHead className="flex justify-end items-center">
            <Button variant="link" size="icon" asChild>
              <div>
                <DotsHorizontalIcon className="h-4 w-4" />
              </div>
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {links.map((link) => (
            <motion.tr
              key={link.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <TableCell className="font-medium">{link.name}</TableCell>
              <TableCell>{link.dateShared}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => deleteLink(link.id)}
                  variant="outline"
                  size="icon"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
};
