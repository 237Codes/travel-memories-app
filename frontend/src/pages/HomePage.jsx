
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMemoryGallery } from "../gallery/memory";
import MemoryCard from "../components/MemoryCard";

const HomePage = () => {
	const { fetchMemories, memories } = useMemoryGallery();

	useEffect(() => {
		fetchMemories();
	}, [fetchMemories]);
	console.log("memories", memories);
  
	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Memories ✈️
				</Text>

				<SimpleGrid
					columns={{  // Columns give responsiveness based on screen size
						base: 1,
						md: 2,
						lg: 3,    
					}}
					spacing={10}
					w={"full"}
				>
					{memories.map((memory) => (
						<MemoryCard key={memory._id} memory={memory} />
					))}
				</SimpleGrid>

				{memories.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No memories found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a memory
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;
