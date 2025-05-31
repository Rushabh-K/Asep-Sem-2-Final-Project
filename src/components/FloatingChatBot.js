import React from 'react';
import {
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    Box,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import ChatBot from './ChatBot';

const FloatingChatBot = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box
                position="fixed"
                bottom="4"
                right="4"
                zIndex="999"
            >
                <IconButton
                    icon={<ChatIcon />}
                    colorScheme="blue"
                    rounded="full"
                    w="50px"
                    h="50px"
                    onClick={onOpen}
                    boxShadow="lg"
                    _hover={{
                        transform: 'scale(1.1)',
                    }}
                    transition="all 0.2s"
                    aria-label="Open FoodLink Assistant"
                />
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent maxW="600px" h="600px">
                    <ModalHeader borderBottomWidth="1px">FoodLink Assistant</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={0}>
                        <ChatBot />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default FloatingChatBot; 