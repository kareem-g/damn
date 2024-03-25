import React from 'react';
import Currencies from 'assets/currencies.json';
type Props = {
  price: number;
  items: string[];
  title: string;
  onClick: () => void;
};

const OptionWrapper: React.FC<Props> = ({price, items, title, onClick}) => {
  return (
    <div className="flex items-start justify-start gap-5 m-3">
      <div className="flex flex-col items-start justify-start gap-5">
        <button
          onClick={onClick}
          className="text-[#1E90FF] bg-white font-bold border-[1px] rounded-full px-5 py-1.5 border-black">
          {title}
        </button>
        <span className="text-[#7DB447] text-[20px]">
          From{' '}
          {
            Currencies.find(
              (item) => item.code === localStorage.getItem('curr') ?? 'USD'
            )?.symbol
          }{' '}
          {price}
        </span>
      </div>
      <ul className=" mx-10 flex flex-col items-start justify-start gap-2 list-disc">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default OptionWrapper;
