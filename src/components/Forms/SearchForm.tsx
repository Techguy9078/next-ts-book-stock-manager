import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
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

interface SearchFormProps {
  setBooksArray: (booksArray: any[] | undefined) => void;
  refetch?: boolean;
}

const MINIMUM_SEARCH_LENGTH = 2;
const DEBOUNCE_TIME = 400;
const DEFAULT_STALE_TIME = 5000;

const SearchForm: React.FC<SearchFormProps> = ({ setBooksArray, refetch }) => {
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [controller, setController] = useState<AbortController | null>(null);

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
        if (value.length < MINIMUM_SEARCH_LENGTH) {
          setDebouncedSearch('');
          setBooksArray(undefined);
          return;
        }
        setDebouncedSearch(value);
      }, DEBOUNCE_TIME),
    [setBooksArray],
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
      if (controller) {
        controller.abort();
        setController(null);
      }
    }
  }, [debouncedSearch, setBooksArray, controller]);

  const {
    data,
    isError,
    refetch: queryRefetch,
  } = useQuery(
    ['search', debouncedSearch],
    async () => {
      if (!debouncedSearch) return;

      if (controller) {
        controller.abort();
      }

      const newController = new AbortController();
      setController(newController);

      try {
        const res = await axios.get(
          `/api/BookAPI/Book?search=${debouncedSearch}`,
          {
            signal: newController.signal,
          },
        );
        return res.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          throw error;
        }
      }
    },
    {
      enabled:
        !!debouncedSearch && debouncedSearch.length >= MINIMUM_SEARCH_LENGTH,
      refetchOnWindowFocus: false,
      staleTime: DEFAULT_STALE_TIME,
      retry: false,
    },
  );

  useEffect(() => {
    if (data) setBooksArray(data);
    if (isError) setBooksArray(undefined);
  }, [data, isError, setBooksArray]);

  useEffect(() => {
    if (refetch) {
      queryRefetch();
    }
  }, [refetch, queryRefetch]);

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
            style={{
              marginRight: '0.5rem',
              padding: '0.1rem',
              minWidth: '3rem',
            }}
            onClick={() => {
              resetField('search');
              setBooksArray(undefined);
              setDebouncedSearch('');
              setFocus('search');

              if (controller) {
                controller.abort();
                setController(null);
              }
            }}
          >
            Clear
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        Enter a minimum of {MINIMUM_SEARCH_LENGTH} characters to search.
      </FormHelperText>
      <FormErrorMessage>
        {errors.search && errors.search.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default SearchForm;
