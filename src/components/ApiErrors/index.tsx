import { FormAlert } from "../FormAlert";
import { useEffect, useState } from "react";

export function ApiErrors(props: ApiErrors) {
  const { items, variant, onChange, reset } = props;
  const [show, setShow] = useState<boolean[]>(
    new Array(items.length).fill(true)
  );

  useEffect(() => {
    reset && setShow(new Array(items.length).fill(true));
  }, [reset]);

  return (
    <>
      {items.map((item: string, index: number) => {
        if (index > import.meta.env.VITE_MAX_ERRORS_TO_SHOW) return;
        return (
          <FormAlert
            key={` Alert: ${index} `}
            variant={variant || "danger"}
            onClose={() => {
              setShow((prevShow) => {
                const newShow = [...prevShow];
                newShow[index] = false;
                return newShow;
              }),
                onChange && onChange();
            }}
            show={show[index]}
            dismissible={true}
          >
            {item}
          </FormAlert>
        );
      })}
    </>
  );
}
