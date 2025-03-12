import { genreList } from '@/config/genreList';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
interface ManualBookEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IScannedBookLayout) => void;
}

const StocktakeModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ManualBookEntryModalProps) => {
  const [formData, setFormData] = useState<IScannedBookLayout>({
    id: uuidv4(),
    isbn: '',
    barcode: '',
    author: '',
    title: '',
    genre: '',
    park: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (
      !formData.genre ||
      !formData.title ||
      !formData.author ||
      !formData.isbn ||
      !formData.barcode
    ) {
      toast.error('Please fill in all fields');
      return;
    }
    onSubmit(formData);
  };

  // TODO auto add barcode and park switch??
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manual Book Entry</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Barcode</FormLabel>
            <Input
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              placeholder="Enter Barcode"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>ISBN</FormLabel>
            <Input
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Author</FormLabel>
            <Input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter Author"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Title"
            />
          </FormControl>
          <FormControl mt={4} key={123}>
            <FormLabel>Genre</FormLabel>
            <Select
              borderColor={'gray.400'}
              color={'gray.400'}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  genre: e.target.value,
                });
              }}
              placeholder={'Select The Genre...'}
            >
              {genreList.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            paddingInline={10}
            style={{
              backgroundColor: '#ff0000d9',
            }}
            mr={3}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            paddingInline={10}
            style={{
              backgroundColor: 'green',
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StocktakeModal;
