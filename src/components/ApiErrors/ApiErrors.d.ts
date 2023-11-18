interface ApiErrors {
  items: Array<string>;
  variant?: "danger" | "warning";
  onChange?: () => void;
  reset?: boolean;
}
