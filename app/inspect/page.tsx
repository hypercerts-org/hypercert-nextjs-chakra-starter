"use client";
import {Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input,} from "@chakra-ui/react";

import {z} from "zod";
import {useForm} from "react-hook-form";
import {HypercertFetcher} from "@/components/HypercertFetcher";
import {useState} from "react";

const HypercertIdFormSchema = z.object({
  hypercertId: z.string(),
});

type HypercertIdFormSchema = z.infer<typeof HypercertIdFormSchema>;

export default function Home() {
  const [hypercertId, setHypercertId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HypercertIdFormSchema>({
    defaultValues: {
      hypercertId: "11155111-0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941-340282366920938463463374607431768211456",
    },
  });

  const onSubmit = (data: HypercertIdFormSchema) => {
    if (!data.hypercertId && !errors.hypercertId) {
      console.log(`No valid hypercert is provided: ${data.hypercertId}`);
      return;
    }
    setHypercertId(data.hypercertId);
  };

  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minW={"450px"}
      color={"white"}
      p={"5rem"}
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)} minW="450px">
        <FormControl isInvalid={!!errors.hypercertId}>
          <FormLabel htmlFor="claimId">Hypercert ID</FormLabel>
          <Input id="hypercertId" placeholder="Hypercert ID" {...register("hypercertId")} />
          <FormErrorMessage>
            {errors.hypercertId && errors.hypercertId.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Search
        </Button>
      </Box>{" "}
      <HypercertFetcher hypercertId={hypercertId} />
    </Flex>
  );
}
