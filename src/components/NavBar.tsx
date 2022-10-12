import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [isServer, setIsServer] = useState(true);
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer,
  });

  useEffect(() => {
    setIsServer(false);
  }, []);

  return (
    <Flex bg="teal" p="4">
      <Box ml={"auto"}>
        {!fetching && !data?.me && (
          <>
            <NextLink href={"/login"}>
              <Link color={"white"} mr={2}>
                Login
              </Link>
            </NextLink>
            <NextLink href={"/register"}>
              <Link color={"white"}>Register</Link>
            </NextLink>
          </>
        )}
        {!fetching && data?.me && (
          <Flex>
            <Box mr={2}>{data.me.username}</Box>
            <Button
              onClick={() => {
                logout();
              }}
              isLoading={logoutFetching}
              variant="link"
            >
              logout
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default NavBar;
