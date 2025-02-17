interface amountProps {
  amountCache: React.ChangeEventHandler<HTMLInputElement>;
  clearCache: () => void;
  price: string;
}

export type {
  amountProps
}