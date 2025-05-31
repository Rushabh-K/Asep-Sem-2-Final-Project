import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from 'contexts/AuthContext';
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { login } = useAuth();
  
  // Get the redirect path from location state, or default to /admin/default
  const from = location.state?.from?.pathname || "/admin/default";
  
  // Chakra color mode
  const textColor = useColorModeValue("gray.800", "white");
  const textColorSecondary = useColorModeValue("gray.600", "gray.400");
  const textColorDetails = useColorModeValue("gray.600", "gray.400");
  const textColorBrand = useColorModeValue("blue.500", "blue.200");
  const requiredColor = useColorModeValue("red.500", "red.300");
  const googleBg = useColorModeValue("white", "gray.700");
  const googleText = useColorModeValue("gray.800", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.100" },
    { bg: "gray.600" }
  );
  const googleActive = useColorModeValue(
    { bg: "gray.200" },
    { bg: "gray.500" }
  );

  // Form state
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);

  // Handlers
  const handleClick = () => setShow(!show);
  
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Hardcoded credentials check
      if (formData.username === 'rushabh' && formData.password === 'admin') {
        const mockUserData = {
          user: {
            username: 'rushabh',
            role: 'admin'
          },
          token: 'dummy-token-123'
        };
        
        login(mockUserData);
        
        toast({
          title: "Sign in successful",
          description: `Welcome back, ${mockUserData.user.username}!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        // Navigate to the redirect path
        navigate(from, { replace: true });
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your username and password to sign in
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='md'
            bg={googleBg}
            color={googleText}
            border="1px solid"
            borderColor="gray.200"
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
            onClick={() => {
              toast({
                title: "Google Sign In",
                description: "This feature is not implemented yet",
                status: "info",
                duration: 3000,
                isClosable: true,
              });
            }}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button>
          <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color={textColorSecondary} mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex>
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={errors.username}>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Username<Text color={requiredColor} ms="1">*</Text>
              </FormLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='text'
                placeholder='Enter your username'
                mb='24px'
                fontWeight='500'
                size='lg'
                borderColor={errors.username ? "red.300" : null}
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                Password<Text color={requiredColor} ms="1">*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Enter your password'
                  mb='24px'
                  size='lg'
                  type={show ? "text" : "password"}
                  variant='auth'
                  borderColor={errors.password ? "red.300" : null}
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  colorScheme='blue'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              type='submit'
              isLoading={isLoading}>
              Sign In
            </Button>
          </form>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
