import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Modal,
  Spinner,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useDisclosure,
  useSteps,
} from "@chakra-ui/react";
import { ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";

type Step = {
  title: string;
  description: string;
};

interface Props {
  getCurrentStep: () => string;
  onOpen: (steps: Step[]) => void;
  onClose: () => void;
  setStep: (step: string) => void;
}

const defaultValues = {
  getCurrentStep: () => "",
  setStep: () => {},
  onOpen: () => {},
  onClose: () => {},
};

const InteractionModalContext = createContext<Props>(defaultValues);

export const useInteractionModal = () => useContext(InteractionModalContext);

export const InteractionDialogProvider = ({ children }: PropsWithChildren) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [steps, setSteps] = useState<Step[]>([]);

  const stepsRef = useRef(steps);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const onSetStep = (step: string) => {
    const index = stepsRef.current.findIndex((s) => s.title === step);
    setActiveStep(index);
  };

  const onOpenAndSetSteps = (steps: Step[]) => {
    setSteps(steps);
    stepsRef.current = steps;
    setActiveStep(0);
    onOpen();
  };

  const onCloseAndResetSteps = () => {
    setSteps([]);
    stepsRef.current = [];
    setActiveStep(0);
    onClose();
  };

  const getCurrentStep = () => stepsRef.current[activeStep]?.title;

  return (
    <InteractionModalContext.Provider
      value={{
        getCurrentStep,
        onOpen: onOpenAndSetSteps,
        onClose: onCloseAndResetSteps,
        setStep: onSetStep,
      }}
    >
      {children}
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody py={4}>
            <Stepper index={activeStep} orientation="vertical" gap="0">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<Spinner />}
                    />
                  </StepIndicator>

                  <Box
                    minHeight={"80px"}
                    _last={{ minHeight: "fit-content" }}
                    mt={-2}
                  >
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </ModalBody>
        </ModalContent>
      </Modal>
    </InteractionModalContext.Provider>
  );
};
