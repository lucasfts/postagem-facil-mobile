import { NativeBaseProvider, Box, VStack, Center } from "native-base";
import { Button } from "native-base";
import Footer from "./components/footer";
import Form from "./components/form";

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Form />
      </Center>
      <Center>
        <Footer />
      </Center>
    </NativeBaseProvider>
  );
}
