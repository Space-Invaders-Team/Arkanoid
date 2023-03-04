export type TInput = {
  value?: string;
  classname?: string;
  placeholder: string;
  name: string;
  type: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};
