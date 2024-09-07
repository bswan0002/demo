import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./components/ui/table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export type LinkData = {
  name: string;
  dateShared: string;
};

type Props = { links: Array<LinkData> };

export const LinkTable = ({ links }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date Shared</TableHead>
          <TableHead className="flex justify-end items-center">
            <DotsHorizontalIcon />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {links.map((link) => (
          <TableRow key={link.name}>
            <TableCell className="font-medium">{link.name}</TableCell>
            <TableCell>{link.dateShared}</TableCell>
            <TableCell className="text-right">buttons</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
