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
    },
    {
      name: 'Park Manual Add',
      href: 'ManualAdd',
    },
    {
      name: 'Add Customer Request',
      href: 'AddCustomerRequest',
    },
    {
      name: 'Search Customer Requests',
      href: 'SearchCustomerRequests',
    },
    {
      name: 'Reports',
      href: 'Reports',
    },
    {
      name: 'Oldest',
      href: 'Oldest',
    },
    {
      name: 'Stats',
      href: 'Stats',
    },
    {
      name: 'Admin',
      href: 'Admin',
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
      <MenuList zIndex={3}>
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
