import { AxiosResponse } from "axios";

interface CustomDeleteModalProps {
  title: string;
  deleteFunction: () => Promise<AxiosResponse | void>;
  item: string;
  itemType: string;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}
