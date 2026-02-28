import { ChevronDown, ChevronUp } from 'lucide-react';

const PriceFilter = ({ price, setPrice }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <div className="flex justify-between items-center cursor-pointer mb-4">
        <h3 className="font-bold text-gray-800">Price Range</h3>
        <ChevronUp size={18} />
      </div>
      <div className="flex flex-col gap-4">
        <input 
          type="range"
          min="0"
          max="20"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-brandGreen [&::-moz-range-thumb]:bg-brandGreen"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>$0</span>
          <span className="font-bold text-brandGreen bg-green-50 px-2 py-1 rounded">
            Up to ${price.toFixed(2)}
          </span>
          <span>$20+</span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;