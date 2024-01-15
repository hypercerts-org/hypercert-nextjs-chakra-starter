import { MutableRefObject } from "react";
import { Flex, HStack, Image, Text } from "@chakra-ui/react";
import { MintingFormValues } from "./MintingForm";

export const HypercertPreview = ({
  values,
  imageRef,
  backgroundColor = "#F8F7F3",
  textColor = "#194446",
}: {
  imageRef?: MutableRefObject<HTMLDivElement | null>;
  values: Partial<MintingFormValues>;
  backgroundColor?: string;
  textColor?: string;
}) => {
  return (
    <Flex
      ref={imageRef}
      width={"320px"}
      height={"400px"}
      minW={"320px"}
      minH={"400px"}
      borderRadius={"22px"}
      backgroundColor={backgroundColor}
      position={"relative"}
      flexDirection={"column"}
    >
      <Flex
        position={"absolute"}
        flexDirection={"column"}
        alignItems={"stretch"}
        justifyContent={"flex-start"}
        width={"100%"}
        height={"100%"}
        maxWidth={"100%"}
        maxHeight={"200px"}
        left={"0px"}
        top={"0px"}
        overflow={"hidden"}
        background={"none"}
        minW={"0"}
        minH={"0"}
      >
        <Image
          alt={"background art"}
          borderTopRadius={"22px"}
          src={"https://i.imgur.com/wsM3fWd.jpeg"}
          position={"relative"}
          objectFit={"fill"}
          maxWidth={"none"}
          left={"auto"}
          top={"auto"}
          width={"100%"}
          height={"100%"}
        />
      </Flex>

      <Flex
        display={"flex"}
        position={"absolute"}
        flexDirection={"column"}
        alignItems={"stretch"}
        justifyContent={"flex-start"}
        width={"100%"}
        height={"100%"}
        maxWidth={"100%"}
        maxHeight={"51%"}
        left={"0px"}
        top={"0px"}
        overflow={"hidden"}
        background={`linear-gradient(0deg,${backgroundColor} 0%,${backgroundColor}00 100%) 0% 0% / 100% 100% repeat`}
        minW={"0"}
        minH={"0"}
      />
      <Flex
        display={"flex"}
        position={"relative"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        width={"100%"}
        height={"100%"}
        maxWidth={"100%"}
        top={"auto"}
        left={"auto"}
        zIndex={"1"}
        minWidth={"0"}
        minHeight={"0"}
        padding={"18px 18px 0"}
      >
        <Flex
          display={"flex"}
          flexDirection={"row"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          width={"40px"}
          height={"40px"}
          maxWidth={"100%"}
          overflow={"hidden"}
          background={"white"}
          flexShrink={"0"}
          borderRadius={"2000px"}
          border={`1px solid ${textColor}`}
        >
          <Image src="/hc_logo_400_400.png" alt={"Logo image"} />
        </Flex>
        <Flex
          position={"relative"}
          flexDirection={"column"}
          width={"100%"}
          height={"auto"}
          paddingTop={"8px"}
          paddingBottom={"8px"}
          minWidth={"0"}
          borderTop={`2px solid ${textColor}`}
          borderColor={textColor}
          minHeight={"114.5px"}
        >
          <Text
            fontSize={"24px"}
            fontWeight={"700"}
            color={textColor}
            lineHeight={"1.2"}
            textAlign={"left"}
            className={"shifted-text"}
          >
            {values.name}
          </Text>
        </Flex>
      </Flex>
      <Flex
        display="flex"
        position="relative"
        flexDirection="column"
        width="100%"
        height="auto"
        maxWidth="100%"
        minWidth="0"
        padding="16px"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-end"
          minWidth="0"
          marginTop="-8px"
          height="calc(100% + 8px)"
          width={"100%"}
        >
          <Flex
            display="flex"
            position="relative"
            flexDirection="column"
            width="100%"
            height="auto"
            maxWidth="100%"
            minWidth="0"
            padding="6px 0 6px 0"
            borderTop={`1px solid ${textColor}`}
          >
            <Flex maxWidth="100%" width="100%" justifyContent={"space-between"}>
              <Text
                fontSize={"12px"}
                fontWeight={500}
                className={"shifted-text"}
                color={textColor}
              >
                WORK
              </Text>
              {values.workTimeframeFrom && values.workTimeframeTo && (
                <Text
                  fontSize={"12px"}
                  className={"shifted-text"}
                  color={textColor}
                >
                  {values.workTimeframeFrom} → {values.workTimeframeTo}
                </Text>
              )}
            </Flex>
            <HStack flexWrap={"wrap"} pt={2}>
              {values.workScope
                ?.split(",")
                .map((x) => x.trim())
                .map((workScope) => (
                  <Flex
                    backgroundColor={backgroundColor}
                    paddingX={2}
                    paddingY={1}
                    key={workScope}
                    border={`1px solid ${textColor}`}
                    borderRadius={"6px"}
                    fontSize={"14px"}
                  >
                    <Text className={"shifted-text"} color={textColor}>
                      {workScope.toLowerCase()}
                    </Text>
                  </Flex>
                ))}
            </HStack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
