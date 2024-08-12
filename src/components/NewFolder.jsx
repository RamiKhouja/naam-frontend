import React from 'react';
import Select from 'react-select';
import { icons } from './icons';

const NewFolder = () => {
  // const [selectedIcon, setSelectedIcon] = useState('Home');
  // const SelectedIconComponent = icons[selectedIcon];

  const iconOptions = Object.keys(icons).map(key => ({
    value: key,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {React.createElement(icons[key], { className: 'w-8' })}
        <span style={{ marginLeft: '10px' }}>{key}</span> {/* Display the icon name */}
      </div>
    ),
  }));

  const handleChange = selectedOption => {
    console.log('Selected icon:', selectedOption);
    // Handle selected icon here
  };

  return (
    <Select
      options={iconOptions}
      onChange={handleChange}
      placeholder="Select an icon"
    />
  );
};

export default NewFolder;
