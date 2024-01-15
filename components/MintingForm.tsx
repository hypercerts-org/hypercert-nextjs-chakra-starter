import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { MutableRefObject } from "react";
import { HypercertPreview } from "./HypercertPreview";

const MintingFormSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(20).max(500),
  workScope: z.string(),
  workTimeframeFrom: z.string(),
  workTimeframeTo: z.string(),
  contributors: z.string(),
  externalUrl: z.string().url(),
});

export type MintingFormValues = z.infer<typeof MintingFormSchema>;

export const MintingForm = ({
  buttonLabel,
  imageRef,
  onSubmit,
}: {
  buttonLabel: string;
  imageRef?: MutableRefObject<HTMLDivElement | null>;
  onSubmit: SubmitHandler<MintingFormValues>;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MintingFormValues>({
    defaultValues: {
      workTimeframeFrom: "2023-04-20",
      workTimeframeTo: "2023-12-31",
    },
  });

  const values = watch();

  console.log(values);

  return (
    <HStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" placeholder="Name" {...register("name")} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            placeholder="Describe the work and potentially it's impact"
            {...register("description")}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.externalUrl}>
          <FormLabel htmlFor="externalUrl">External Url</FormLabel>
          <Input
            id="externalUrl"
            placeholder="https://hypercerts.org"
            {...register("externalUrl")}
          />
          <FormErrorMessage>
            {errors.externalUrl && errors.externalUrl.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.workScope}>
          <FormLabel htmlFor="workScope">
            Work Scope. Comma separated (e.g. Education, Development)
          </FormLabel>
          <Input {...register("workScope")} />
          <FormErrorMessage>
            {errors.workScope && errors.workScope.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.workTimeframeFrom}>
          <FormLabel htmlFor="workTimeframeFrom">Work Timeframe From</FormLabel>
          <Input
            id="workTimeframeFrom"
            placeholder="2023-04-20"
            {...register("workTimeframeFrom")}
            type="date"
          />
          <FormErrorMessage>
            {errors.workTimeframeFrom && errors.workTimeframeFrom.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.workTimeframeTo}>
          <FormLabel htmlFor="workTimeframeTo">Work Timeframe To</FormLabel>
          <Input
            id="workTimeframeTo"
            placeholder="2023-04-20"
            {...register("workTimeframeTo")}
            type="date"
          />
          <FormErrorMessage>
            {errors.workTimeframeTo && errors.workTimeframeTo.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.contributors}>
          <FormLabel htmlFor="contributors">
            Contributors. Comma separated (e.g. Alice, Bob, Charlie)
          </FormLabel>
          <Input {...register("contributors")} />
          <FormErrorMessage>
            {errors.contributors && errors.contributors.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          {buttonLabel}
        </Button>
      </form>
      <HypercertPreview imageRef={imageRef} values={values} />
    </HStack>
  );
};
