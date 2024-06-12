"use client";
import {useHypercertClient} from "@/hooks/useHypercertClient";
import {useIndexer} from "@/hooks/useIndexer";
import {Divider, Flex, Spinner, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import HypercertInfo from "./HypercertInfo";
import {ConnectKitButton} from "connectkit";

type HypercertFetcherProps = {
    hypercertId: string;
};

export const HypercertFetcher = ({hypercertId}: HypercertFetcherProps) => {
    const {client} = useHypercertClient();
    const {indexer} = useIndexer();
    const [hypercert, sethypercert] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (indexer) {
            setIsLoading(false);
            const getHypercert = async () => {
                const res = await indexer.hypercertById({id: hypercertId});

                console.log(res);
                if (!res) {
                    console.error("Hypercert not found");
                    return;
                }

                if (res.hypercerts.data) {
                    sethypercert(res.hypercerts.data[0]);
                }
            };

            getHypercert();
        }
    }, [indexer, hypercertId]);

    if (isLoading) {
        return (
            <Flex
                mt="2em"
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"1em"}
            >
                <Text>Loading Hypercert SDK client...</Text>
                <Spinner size="xl"/>
            </Flex>
        );
    }

    if (!hypercertId) {
        return (
            <Flex
                mt="2em"
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"1em"}
            >
                <Text>Please provide a valid hypercert ID</Text>
            </Flex>
        );
    }


    return (
        <>
            {client && indexer ? (
                <Flex
                    mt="2em"
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Text>
                        Hypercert SDK client connected to{" "}
                        <Text as="kbd" fontWeight={"bold"}>
                            {client._config?.environment}
                        </Text>
                    </Text>
                    <Divider my="2em" w={"sm"}/>
                    <Text>First Hypercert ID:</Text>
                    <Text as="kbd" fontWeight={"bold"}>
                        {hypercert ? hypercert.id : "Loading..."}
                    </Text>
                    {hypercert && hypercert?.uri ? (
                        <HypercertInfo uri={hypercert.uri}/>
                    ) : (
                        <Text>No URI found</Text>
                    )}
                </Flex>
            ) : (
                <Flex
                    mt="2em"
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Text mb={"2em"}>Hypercert SDK client not connected</Text>
                    <ConnectKitButton/>
                </Flex>
            )}
        </>
    );
};
