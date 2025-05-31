import React, { useState, useEffect } from 'react';
import {
    Box,
    Input,
    VStack,
    HStack,
    Text,
    IconButton,
    useColorModeValue,
    useToast,
    Heading,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const { user } = useAuth();

    const bgColor = useColorModeValue('white', 'gray.700');
    const userBgColor = useColorModeValue('blue.50', 'blue.800');
    const botBgColor = useColorModeValue('gray.50', 'gray.600');
    const errorColor = useColorModeValue('red.500', 'red.300');

    const predefinedResponse = {
        mainContent: `Smart NGO Recommendations:
Implement an AI-driven recommendation engine to match users with relevant NGOs, projects, and volunteer opportunities. The system should consider users' interests, past interactions, and profile data to deliver personalized suggestions, improving engagement and matching users with causes that resonate with them.

Intelligent Document Processing:
Enhance NGO registration processes by leveraging AI for intelligent document analysis. The system should include:

Automatic Document Analysis: Use AI to process and validate NGO registration documents.

OCR & NLP Integration: Implement Optical Character Recognition (OCR) and Natural Language Processing (NLP) to automatically fill out forms, extract relevant data, and ensure accuracy in document submissions.

AI Chatbot Assistant:
Develop an AI-powered chatbot to assist users in navigating the platform efficiently. Key functionalities include:

Instant Query Resolution: Provide users with immediate answers to common queries about NGOs, volunteer opportunities, and registration procedures.

Guided Navigation: Help users find relevant NGO projects or volunteering roles based on their interests and profile.

Content Moderation & Spam Detection:
Implement AI algorithms for content moderation to maintain a safe and respectful environment. Key features:

Inappropriate Content Detection: Use AI to identify and flag harmful or inappropriate content in user-generated descriptions, comments, and reviews.

Spam Filtering: Automatically detect and filter out spam or irrelevant content in NGO posts or user comments.`,
        errorMessage: 'Server is busy, please try again later.'
    };

    useEffect(() => {
        // Check authentication on component mount
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "Please log in to use the chat feature",
                status: "warning",
                duration: 5000,
                isClosable: true
            });
            navigate('/auth/sign-in');
        }
    }, [navigate, toast, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setIsLoading(true);

        try {
            // Simulate AI response with predefined content
            setTimeout(() => {
                setMessages(prev => [...prev, { 
                    text: predefinedResponse.mainContent,
                    errorMessage: predefinedResponse.errorMessage,
                    sender: 'bot' 
                }]);
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to get response from assistant",
                status: "error",
                duration: 5000,
                isClosable: true
            });
            setIsLoading(false);
        }
    };

    const renderMessage = (message) => {
        if (message.sender === 'bot') {
            return (
                <>
                    <Text whiteSpace="pre-wrap" mb={4} fontSize="md" lineHeight="1.7">
                        {message.text}
                    </Text>
                    <Heading size="md" color={errorColor} fontWeight="bold">
                        {message.errorMessage}
                    </Heading>
                </>
            );
        }
        return (
            <Text 
                whiteSpace="pre-wrap" 
                fontSize="md"
                fontWeight="medium"
            >
                {message.text}
            </Text>
        );
    };

    return (
        <Box
            p={6}
            bg={bgColor}
            borderRadius="xl"
            boxShadow="xl"
            maxW="800px"
            mx="auto"
            my={8}
            height="70vh"
            display="flex"
            flexDirection="column"
        >
            <Box 
                flex="1" 
                overflowY="auto" 
                mb={4}
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: useColorModeValue('gray.300', 'gray.600'),
                        borderRadius: '24px',
                    },
                }}
            >
                <VStack spacing={4} align="stretch">
                    {messages.map((message, index) => (
                        <Box
                            key={index}
                            bg={message.sender === 'user' ? userBgColor : botBgColor}
                            p={4}
                            borderRadius="lg"
                            alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                            maxW="90%"
                            boxShadow="sm"
                        >
                            {renderMessage(message)}
                        </Box>
                    ))}
                    {isLoading && (
                        <Box bg={botBgColor} p={3} borderRadius="lg" alignSelf="flex-start" boxShadow="sm">
                            <Text>Typing...</Text>
                        </Box>
                    )}
                </VStack>
            </Box>
            <form onSubmit={handleSubmit} style={{ marginTop: 'auto' }}>
                <HStack spacing={3}>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        size="lg"
                        borderRadius="lg"
                        _focus={{
                            borderColor: 'blue.400',
                            boxShadow: '0 0 0 1px blue.400',
                        }}
                    />
                    <IconButton
                        type="submit"
                        aria-label="Send message"
                        icon={<ChatIcon />}
                        disabled={isLoading}
                        size="lg"
                        colorScheme="blue"
                        borderRadius="lg"
                        _hover={{
                            bg: 'blue.500',
                        }}
                    />
                </HStack>
            </form>
        </Box>
    );
};

export default ChatBot; 