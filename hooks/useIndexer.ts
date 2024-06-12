"use client";
import {useHypercertClient} from "./useHypercertClient";

const useIndexer = () => {
    const {client} = useHypercertClient();

    const getMetadataForUri = async (uri: string) => {
        return await client.indexer.metadataByUri({uri})
    }

    return {indexer: client?.indexer, getMetadataForUri};
};

export {useIndexer};
