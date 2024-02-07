"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { HypercertFetcher } from "@/components/HypercertFetcher";
import { useState } from "react";

const ClaimIdFormSchema = z.object({
  claimId: z.string(),
});

type ClaimIdFormSchema = z.infer<typeof ClaimIdFormSchema>;

export default function Home() {
  const [claimId, setClaimId] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ClaimIdFormSchema>({
    defaultValues: {
      claimId: "",
    },
  });

  const onSubmit = (data: ClaimIdFormSchema) => {
    if (!data.claimId && !errors.claimId) {
      console.log(`No valid claimId provided: ${data.claimId}`);
      return;
    }
    setClaimId(data.claimId);
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
        <FormControl isInvalid={!!errors.claimId}>
          <FormLabel htmlFor="claimId">Claim ID</FormLabel>
          <Input id="claimId" placeholder="Claim ID" {...register("claimId")} />
          <FormErrorMessage>
            {errors.claimId && errors.claimId.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Search
        </Button>
      </Box>{" "}
      <HypercertFetcher claimId={claimId} />
    </Flex>
  );
}
