import { type ColumnDef } from "@tanstack/react-table";
import type Receipt from "@/types/receipt";

const columns: ColumnDef<Receipt>[] = [
  {
    accessorKey: "merchant",
    header: "Merchant",
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "tax",
    header: () => <div className="text-right">Tax</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("tax"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      const time = row.getValue("time");
      let formattedTime = "";

      if (typeof time === "string" && /^\d{2}:\d{2}$/.test(time)) {
        const [hourStr, minuteStr] = time.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        formattedTime = `${hour}:${minuteStr} ${ampm}`;
      }

      return <div>{formattedTime}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);

      return <div>{formattedDate}</div>;
    },
  },
];

export default columns;
