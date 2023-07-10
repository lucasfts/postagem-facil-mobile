import { HStack, Heading, Spinner, VStack } from "native-base";
import React from "react";

const Loading = () => {
    return <HStack space={2} h={'100%'} justifyContent="center">
        <Spinner color={"blue.600"} size={50} />
    </HStack>;
};

export default Loading;
