import { useState } from 'react';
import TestContext from './test-context';

// Provider Example
function TestProvider({ children }) {
  const [valueObj, setValueObj] = useState<{ value: string }>({
    value: 'from state',
  });

  function fn(newVal: { value: string }) {
    setValueObj(newVal);
  }

  return (
    <TestContext.Provider value={{ value: valueObj.value, fn }}>
      {children}
    </TestContext.Provider>
  );
}

export default TestProvider;
