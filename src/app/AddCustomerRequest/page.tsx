'use client';
import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import CustomDivider from '@/components/Divider/customDivider';
import { CustomerBookRequest } from '@prisma/client';
import GenericButton from '@/components/Buttons/GenericButton';
import { toast } from 'sonner';

export default function AddCustomerRequests() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<CustomerBookRequest>();

  const onSubmit: SubmitHandler<CustomerBookRequest> = async (data) => {
    setLoading(true);
    try {
      await axios.post('/api/CustomerBookRequestAPI', data);
      toast.success('Customer Request Added Successfully');
      reset();
    } catch (err) {
      toast.error('Something went wrong', {
        description: `${(err as any)?.response?.data?.error || (err as any).message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={4}
      bgColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'md'}
    >
      <VStack spacing={4} align={'left'}>
        <Text fontSize="2xl">Add Customer Request</Text>
        <CustomDivider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>
            Manually enter the Customer details to add them to the database:
            <VStack>
              {manualInputs.map(({ placeholder, inputname, required }, i) => (
                <FormControl key={i}>
                  <InputGroup>
                    <InputLeftAddon inlineSize={120}>
                      {`${
                        inputname.charAt(0).toUpperCase() +
                        inputname.slice(1) +
                        ':'
                      } ${required ? '*' : ''}`}
                    </InputLeftAddon>
                    <Input
                      borderColor={'gray.400'}
                      id={inputname}
                      autoComplete="off"
                      placeholder={placeholder}
                      {...register(inputname, {
                        required: required,
                      })}
                    />
                  </InputGroup>
                </FormControl>
              ))}
            </VStack>
          </FormLabel>
          <GenericButton isLoading={loading} buttonType="Add" />
        </form>
      </VStack>
    </Box>
  );
}

const manualInputs: Array<{
  inputname: any; //foo and bar types...
  placeholder: string;
  required?: boolean;
}> = [
  { inputname: 'name', placeholder: 'Enter Full Name...', required: true },
  { inputname: 'phone', placeholder: 'Enter Phone Number...', required: true },
  {
    inputname: 'title',
    placeholder: 'Enter Book Full Title...',
    required: false,
  },
  {
    inputname: 'author',
    placeholder: "Enter Author's Full Name...",
    required: false,
  },
  { inputname: 'isbn', placeholder: 'Enter Book ISBN...', required: false },
  {
    inputname: 'comments',
    placeholder: 'Enter Additional Comments...',
    required: false,
  },
];
