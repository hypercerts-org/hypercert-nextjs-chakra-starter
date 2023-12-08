"use client";
import { useEffect, useState } from "react";
import { useHypercertClient } from "./useHypercertClient";

const useIndexer = () => {
  const { client } = useHypercertClient();
  const [firstHypercert, setFirstHypercert] = useState<any>();

  useEffect(() => {
    if (client) {
      const getFirstHypercert = async () => {
        const firstHypercert = await client.indexer.firstClaims();
        if (firstHypercert.claims && firstHypercert.claims.length > 0)
          console.log(firstHypercert);
        setFirstHypercert(firstHypercert.claims[0]);
      };

      getFirstHypercert();
    }
  }, [client]);

  return { indexer: client?.indexer, firstHypercert };
};

export { useIndexer };
