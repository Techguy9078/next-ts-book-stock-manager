import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodErrorMap, z } from 'zod';
import { useEffect } from 'react';

import GenericButton from '@/components/Buttons/GenericButton';

const customErrorMap: ZodErrorMap = (error, ctx) => {
  if (error.code == 'too_small') {
    return { message: `No barcode entered please scan a book...` };
  }

  return { message: ctx.defaultError };
};

const barcodeValidator = z.object({
  barcode: z
    .string({
      errorMap: customErrorMap,
    })
    .min(1),
});

type barcodeForm = z.infer<typeof barcodeValidator>;

export default function BarcodeForm({
  barcodeSearch,
  isLoading,
  formType,
}: {
  barcodeSearch: Function;
  isLoading: boolean;
  formType: 'Add' | 'Remove' | 'Activate';
}) {
  const {
    register,
    handleSubmit,
    setFocus,
    resetField,
    formState: { errors },
  } = useForm<barcodeForm>({
    resolver: zodResolver(barcodeValidator),
    defaultValues: { barcode: '' },
  });

  useEffect(() => {
    if (!isLoading) {
      resetField('barcode');
      setFocus('barcode');
    }
  }, [setFocus, resetField, isLoading]);

  let formLabel = '';
  switch (formType) {
    case 'Add':
      formLabel = 'Add Book to Database:';
      break;
    case 'Activate':
      formLabel = 'Activate the book to put on shelf:';
      break;
    case 'Remove':
      formLabel = 'Remove Book From Database:';
      break;
    default:
      formLabel = 'If you are seeing this the formType is not set';
      break;
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        barcodeSearch(data);
      })}
    >
      <FormControl isInvalid={errors.barcode ? true : false}>
        <FormLabel htmlFor="barcode">{formLabel}</FormLabel>
        <Input
          autoFocus
          autoComplete="off"
          borderColor={'gray.400'}
          disabled={isLoading}
          id="barcode"
          placeholder="Start Scanning books..."
          {...register('barcode', {
            required: 'You need to enter or scan a barcode...',
          })}
        />
        <FormErrorMessage>
          {errors.barcode && errors.barcode?.message}
        </FormErrorMessage>
      </FormControl>

      <GenericButton isLoading={isLoading} buttonType={formType} />
    </form>
  );
}
