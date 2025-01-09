'use client'
import { Button, ButtonProps } from "@ui/button";

export const NextButton = ({ namespace, sortOrder, ...props }: React.PropsWithChildren<Props>) => {
  const lsKey = `${namespace}-completion`;

  const handleClick = () => {
    let sortOrderArray = [];
    const storedArray = localStorage.getItem(lsKey);
    
    if (storedArray) {
      sortOrderArray = JSON.parse(storedArray);
    }

    if (!sortOrderArray.includes(sortOrder)) {
      sortOrderArray.push(sortOrder);
      localStorage.setItem(lsKey, JSON.stringify(sortOrderArray));
    }
  };

  return (
    <Button className="w-full md:w-fit gap-2" onClick={handleClick} {...props} />
  )
}

type Props = ButtonProps & {
  namespace: string;
  sortOrder: number;
}