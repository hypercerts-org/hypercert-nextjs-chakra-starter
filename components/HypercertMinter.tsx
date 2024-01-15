import {
  Heading,
  HStack,
  Spinner,
  useToast,
  Image,
  Button,
} from "@chakra-ui/react";
import { MintingForm, MintingFormValues } from "./MintingForm";
import { useEffect, useRef, useState } from "react";
import { exportAsImage } from "@/lib/exportToImage";
import { useHypercertClient } from "@/hooks/useHypercertClient";
import {
  HypercertMetadata,
  TransferRestrictions,
  validateMetaData,
  validateClaimData,
} from "@hypercerts-org/sdk";
import { useInteractionModal } from "@/components/InteractionModal";
import { TransactionReceipt } from "viem";
import { parseEther } from "viem/utils";
import { useAccount, usePublicClient } from "wagmi";
import { DateTime } from "luxon";

const formValuesToHypercertMetadata = (
  values: MintingFormValues,
  image: string
): HypercertMetadata => {
  const claimData = {
    work_scope: {
      value: values.workScope.split(",").map((x) => x.trim()),
    },
    contributors: {
      value: values.contributors.split(",").map((x) => x.trim()),
    },
    impact_scope: {
      value: ["all"],
    },
    rights: {
      value: [],
    },
    impact_timeframe: {
      value: [],
    },
    work_timeframe: {
      value: [
        DateTime.fromFormat(values.workTimeframeFrom, "yyyy-MM-dd").toSeconds(),
        DateTime.fromFormat(values.workTimeframeTo, "yyyy-MM-dd").toSeconds(),
      ],
    },
  };

  const { errors: claimDataErrors, valid: claimDataValid } =
    validateClaimData(claimData);

  if (!claimDataValid) {
    console.error(claimDataErrors);
    throw new Error("Claim data is not valid");
  }

  const metaData = {
    name: values.name,
    description: values.description,
    external_url: values.externalUrl,
    image: image,
    hypercert: claimData,
  };

  const { errors: metaDataErrors, valid: metaDataValid } =
    validateMetaData(metaData);

  if (!metaDataValid) {
    console.error(metaDataErrors);
    throw new Error("Metadata is not valid");
  }

  return metaData;
};

export const HypercertMinter = ({
  onComplete,
}: {
  onComplete?: () => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const toast = useToast();
  const { client } = useHypercertClient();
  const { onOpen, setStep, onClose } = useInteractionModal();
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();

  const [previewImageSrc, setPreviewImageSrc] = useState<string | undefined>(
    undefined
  );

  const syncPreviewImage = async () => {
    const imagePreviewSrc = await exportAsImage(ref);

    setPreviewImageSrc(imagePreviewSrc);
  };

  useEffect(() => {
    syncPreviewImage();
  }, []);

  const onMint = async (values: MintingFormValues) => {
    if (!address) {
      toast({
        title: "Error",
        description: "Address not found",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (!client) {
      toast({
        title: "Error",
        description: "Client not initialized",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const steps = [
      {
        title: "Generate image",
        description: "Generating image",
      },
      {
        title: "Minting",
        description: "Minting",
      },
    ];

    onOpen(steps);
    setStep("Generate image");
    const image = await exportAsImage(ref);

    if (!image) {
      toast({
        title: "Error",
        description: "Could not export image",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      onClose();
      return;
    }

    let transactionReceipt: TransactionReceipt | undefined;

    setStep("Minting");
    try {
      const claimData = formValuesToHypercertMetadata(values, image);
      const transactionHash = await client.mintClaim(
        claimData,
        parseEther("1"),
        TransferRestrictions.FromCreatorOnly
      );

      if (!transactionHash) {
        throw new Error("Transaction failed");
      }

      transactionReceipt = await publicClient.waitForTransactionReceipt({
        hash: transactionHash,
      });
      if (transactionReceipt?.status !== "success") {
        throw new Error("Transaction failed");
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Could not mint hypercert",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      onClose();
      return;
    }

    let claimId: bigint | undefined;

    try {
      if (!transactionReceipt) {
        throw new Error("Transaction receipt not found");
      }
      const res = await client.getClaimStoredDataFromTxHash(
        transactionReceipt.transactionHash
      );

      claimId = res.data?.claimId;
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Could not construct claimId",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      onClose();
      return;
    }

    toast({
      title: "Claim minted",
      description: `Minted hypercert with id ${claimId}`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    onClose();
    onComplete?.();
  };

  return (
    <>
      <HStack>
        <MintingForm onSubmit={onMint} buttonLabel="Mint" imageRef={ref} />
      </HStack>
      <Button onClick={syncPreviewImage}>Sync preview image</Button>
    </>
  );
};
