import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import {useState} from 'react'

const CreatePage = () => {
  const [newMemory, setNewMemory] = useState({
    location: "",
    month: "",
    image: "",
});
const toast = useToast();


const handleAddMemory = async () => {
  console.log("Memory added", newMemory);
  // const { success, message } = await createMemory(newMemory);
  // if (!success) {
  //   toast({
  //     title: "Error",
  //     description: message,
  //     status: "error",
  //     isClosable: true,
  //   });
  // } else {
  //   toast({
  //     title: "Success",
  //     description: message,
  //     status: "success",
  //     isClosable: true,
  //   });
  // }
  // setNewMemory({ location: "", month: "", image: "" });
};
  return (
    <Container maxW= {"container.sm"}>
      <VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Memory
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Memory Location'
							name ='location'
							value={newMemory.location}
							onChange={(e) => setNewMemory({ ...newMemory, location: e.target.value })}
						/>
						<Input
							placeholder='Month'
							name='month'
							value={newMemory.month}
							onChange={(e) => setNewMemory({ ...newMemory, month: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newMemory.image}
							onChange={(e) => setNewMemory({ ...newMemory, image: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddMemory} w='full'>
							Add Memory
						</Button>
					</VStack>
				</Box>
			</VStack>
    </Container>
  );
};

export default CreatePage