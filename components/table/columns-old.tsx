import { ColumnDef } from "@tanstack/react-table";
import { Checkbox, Chip } from "@mui/material";

export const BusinessTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
  {
    accessorKey: "id",
    header: "Merchant ID",
  },
  {
    accessorKey: "name",
    header: "Business name",
  },
  {
    accessorKey: "email",
    header: "Email address",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "contact",
    header: "Contact person",
  },
  {
    accessorKey: "date",
    header: "Sign Up date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];
