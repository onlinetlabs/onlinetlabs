"use client"

import { Fragment } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { AlertTriangleIcon, CheckCircle2Icon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { Button } from "@ui/button"
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table"
import { checksOptions, type UserChecklog } from "@entities/lab"
import { CheckSteps } from "./check-steps"
import { useSuspenseQuery } from "@tanstack/react-query"

const columns: ColumnDef<UserChecklog>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          {...{
            className: "size-7 shadow-none text-muted-foreground",
            onClick: row.getToggleExpandedHandler(),
            "aria-expanded": row.getIsExpanded(),
            "aria-label": row.getIsExpanded()
              ? `Collapse details for ${row.original.labId}`
              : `Expand details for ${row.original.labId}`,
            size: "icon",
            variant: "ghost",
          }}
        >
          {row.getIsExpanded() ? (
            <ChevronUpIcon
              className="opacity-60"
              size={16}
              aria-hidden="true"
            />
          ) : (
            <ChevronDownIcon
              className="opacity-60"
              size={16}
              aria-hidden="true"
            />
          )}
        </Button>
      ) : undefined
    },
    minSize: 24,
    size: 48,
    maxSize: 48,
  },
  {
    header: "Статус",
    accessorKey: "passed",
    cell: ({ row }) => {
      const isPassed = row.getValue("passed");

      if (isPassed) {
        return (
          <span className="flex items-center">
            <CheckCircle2Icon className="text-ds-green-900 size-4 mr-1" />
            Решение зачтено
          </span>
        )
      }
      
      return (
        <span className="flex items-center">
          <AlertTriangleIcon className="text-ds-red-900 size-4 mr-1" />
          Неправильный ответ
        </span>
      )
    },
    minSize: 200
  },
  {
    header: "Время отправки",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <span>
          {format(new Date(createdAt), "dd.MM.yyyy HH:mm:ss")}
        </span>
      );
    },
    minSize: 200,
  },
  {
    header: "Шаги",
    accessorKey: "checklog",
    cell: () => null,
  }
]

export function ChecksTable({ projectId }: { projectId: string }) {
  const { data } = useSuspenseQuery({
    ...checksOptions(projectId),
    initialData: []
  });

  const table = useReactTable({
    data,
    columns,
    initialState: {
      columnVisibility: {
        checklog: false
      },
      sorting: [
        {
          id: "createdAt",
          desc: true,
        }
      ],
    },
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <div className="flex flex-col overflow-auto bg-background-100 rounded-md border">
      <Table className="w-full" style={{ minWidth: table.getCenterTotalSize() }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead 
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ position: 'relative', width: `${header.getSize()}px` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: `${cell.column.getSize()}px` }}
                      className="whitespace-nowrap [&:has([aria-expanded])]:w-px [&:has([aria-expanded])]:py-0 [&:has([aria-expanded])]:pr-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow className="pointer-events-none">
                    <TableCell colSpan={row.getVisibleCells().length}>
                      <div className="text-primary/80 flex items-start py-2 overflow-hidden">
                        <CheckSteps logs={row.getValue("checklog")} />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Пока нет результатов проверки
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
