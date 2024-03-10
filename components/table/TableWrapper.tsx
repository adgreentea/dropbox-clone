"use client";

import { FileType } from "@/typings";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { columns } from "./Columns";
import { DataTable } from "./Table";
import { useUser } from "@clerk/nextjs";

function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  return (
    <div onClick={() => setSort(sort === "desc" ? "asc" : "desc")}>
      <Button>Sort By {sort === "desc" ? "Newest" : "Oldest"}</Button>
      <DataTable columns={columns} data={skeletonFiles} />
    </div>
  );
}

export default TableWrapper;
