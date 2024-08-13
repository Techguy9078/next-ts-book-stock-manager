import { useIsMobile } from '@/utils/isMobile';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const AdminDropdown = () => {
  const isMobile = useIsMobile();

  const adminLinks = [
    {
      name: 'Park Add',
      href: 'ParkAdd',
      color: { light: '#8bd346', dark: '#4caf50' },
    },
    {
      name: 'Admin Manual Add',
      href: 'ManualAdd',
      color: { light: '#edda34', dark: '#d5c42e' },
    },
    {
      name: 'Add Customer Request',
      href: 'AddCustomerRequest',
      color: { light: '#B66878', dark: '#894553' },
    },
    {
      name: 'Search Customer Requests',
      href: 'SearchCustomerRequests',
      color: { light: '#736EA9', dark: '#554E9D' },
    },
    {
      name: 'Reports',
      href: 'Reports',
      color: { light: '#836a8a', dark: '#65466D' },
    },
    {
      name: 'Oldest',
      href: 'Oldest',
      color: { light: 'yellow.800', dark: 'yellow.700' },
    },
    {
      name: 'Stats',
      href: 'Stats',
      color: { light: '#ae9991', dark: '#86665a' },
    },
    {
      name: 'Admin',
      href: 'Admin',
      color: { light: 'purple.600', dark: 'purple.500' },
    },
  ];

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        py={4}
        px={3}
        my={1}
        display={'flex'}
        h={'100%'}
        width={isMobile ? '100%' : '135px'}
        alignItems={'center'}
        rounded={'none'}
        bgColor={'red !important'}
        color={'white'}
      >
        Boss Mode
      </MenuButton>
      <MenuList>
        {adminLinks.map((link) => (
          <MenuItem as={Link} href={link.href} key={link.name}>
            {link.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default AdminDropdown;
