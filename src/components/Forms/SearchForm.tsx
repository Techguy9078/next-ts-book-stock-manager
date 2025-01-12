import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';

interface SearchFormProps {
  setBooksArray: (booksArray: any[] | undefined) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ setBooksArray }) => {
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const {
    register,
    watch,
    formState: { errors },
    setFocus,
    resetField,
  } = useForm({
    defaultValues: { search: '' },
  });

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 400),
    [],
  );

  useEffect(() => {
    const subscription = watch(({ search }) => {
      debouncedUpdate(search || '');
    });

    return () => subscription.unsubscribe();
  }, [debouncedUpdate, watch]);

  useEffect(() => {
    if (!debouncedSearch) {
      setBooksArray(undefined);
    }
  }, [debouncedSearch, setBooksArray]);

  const { data, isFetching, isError } = useQuery(
    ['search', debouncedSearch],
    () =>
      axios
        .get(`/api/BookAPI/Book?search=${debouncedSearch}`)
        .then((res) => res.data),
    {
      enabled: !!debouncedSearch && debouncedSearch.length >= 1,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (data) setBooksArray(data);
    if (isError) setBooksArray(undefined);
  }, [data, isError, setBooksArray]);

  return (
    <FormControl isInvalid={!!errors.search}>
      <FormLabel htmlFor="search">Search for a book...</FormLabel>
      <InputGroup>
        <Input
          autoFocus
          autoComplete="on"
          id="search"
          placeholder="Start Searching books..."
          {...register('search', { required: true })}
        />
        <InputRightElement>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              resetField('search');
              setBooksArray(undefined);
              setDebouncedSearch('');
              setFocus('search');
            }}
          >
            Clear
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        {isFetching
          ? 'Searching...'
          : 'Only will search once 3 characters have been entered'}
      </FormHelperText>
      <FormErrorMessage>
        {errors.search && errors.search.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default SearchForm;
