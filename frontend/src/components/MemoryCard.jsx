import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useMemoryGallery } from "../gallery/memory";
import { useState } from "react";

const MemoryCard = ({ memory }) => {
	const [updatedMemory, setUpdatedMemory] = useState(memory);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteMemory, updateMemory } = useMemoryGallery();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

    // pid refers to memory ID 
	const handleDeleteMemory = async (pid) => {
		const { success, message } = await deleteMemory(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateMemory = async (pid, updatedMemory) => {
		const { success, message } = await updateMemory(pid, updatedMemory);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Memory updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={memory.image} alt={memory.location} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{memory.location}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					{memory.month}
				</Text>
                {/* HSTack from Chackra MAkes the buttons next to each other */}
				<HStack spacing={2}>    
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteMemory(memory._id)}
						colorScheme='red'
					/>
				</HStack>
			</Box>

            {/* A modal is simply like a pop up dialogue box. Check documentation for more */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Memory</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Memory Location'
								name='location'
								value={updatedMemory.location}
								onChange={(e) => setUpdatedMemory({ ...updatedMemory, location: e.target.value })}
							/>
							<Input
								placeholder='Month'
								name='month'
								type='text'
								value={updatedMemory.month}
								onChange={(e) => setUpdatedMemory({ ...updatedMemory, month: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedMemory.image}
								onChange={(e) => setUpdatedMemory({ ...updatedMemory, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateMemory(memory._id, updatedMemory)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default MemoryCard;