import { useState, useEffect } from 'react';

const TOKEN_CONTRACT_ADDRESS = '0x169b1CE420F585d8cB02f3b23240a5b90BA54C92';
const TRAIT_TYPES = ['background', 'eyes', 'mouth', 'accessory'];

const TokenFilters = ({ onFilterChange }) => {
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    const fetchMetadata = async () => {
      const response = await fetch(`https://api.thirdweb.com/tokens/${TOKEN_CONTRACT_ADDRESS}/metadata`);
      const data = await response.json();
      setMetadata(data.traits);
    };
    fetchMetadata();
  }, []);

  const handleFilterChange = (traitType, traitValue) => {
    const newFilters = { ...filters };
    if (traitValue === '') {
      delete newFilters[traitType];
    } else {
      newFilters[traitType] = traitValue;
    }
    onFilterChange(newFilters);
  };

  return (
    <div>
      {metadata.map((trait, index) => {
        if (TRAIT_TYPES.includes(trait.trait_type)) {
          return (
            <div key={index}>
              <label htmlFor={trait.trait_type}>{trait.trait_type}</label>
              <select id={trait.trait_type} onChange={(e) => handleFilterChange(trait.trait_type, e.target.value)}>
                <option value="">All</option>
                {trait.values.map((value, index) => (
                  <option key={index} value={value.value}>
                    {value.value} ({value.count})
                  </option>
                ))}
              </select>
            </div>
          );
        }
      })}
    </div>
  );
};

export default TokenFilters;