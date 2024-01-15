"use client";
import { useHypercertClient } from "./useHypercertClient";

const useIndexer = () => {
  const { client } = useHypercertClient();

  return { indexer: client?.indexer };
};

export { useIndexer };
