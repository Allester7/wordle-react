import React from 'react';

function ExampleComponent({ isActive, isDisabled }) {
  const dynamicClass = isActive ? 'active' : 'inactive';
  const additionalClass = isDisabled ? 'disabled' : '';

  return (
    <div
      className={`base-class ${dynamicClass} ${additionalClass}`}
    >
      Dynamic Class Example
    </div>
  );
}

export default ExampleComponent;

// Usage:
// <ExampleComponent isActive={true} isDisabled={false} />
// Resulting className: "base-class active"
