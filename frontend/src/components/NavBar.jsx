import React from 'react';
import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { MdOutlineHive } from "react-icons/md";

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    
    return (
        <Container maxW="1140px" px={4} bg={useColorModeValue("gray.200", "gray.500")}>
            <Flex
                h={16}
                alignItems="center"
                justifyContent="space-between"
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >
                {/* Logo Section */}
                <Flex align="center">
                    <MdOutlineHive size="40px" style={{ marginRight: "8px" }} /> 
                    <Text
                        fontSize={{ base: "22px", sm: "28px" }}
                        fontWeight="bold"
                        textTransform="uppercase"
                        textAlign="center"
                        bgGradient="linear(to-r, yellow, black)"
                        bgClip="text"
                    >
                        <Link to="/">SportHive</Link>
                    </Text>
                </Flex>

                {/* Navigation Buttons */}
                <HStack spacing={2} alignItems="center">
                    <Link to={"/create"}>
                        <Button>
                            <FaUserPlus />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? "Dark" : "Light"}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
}

export default NavBar;
