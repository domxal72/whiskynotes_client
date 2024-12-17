import { createFileRoute } from '@tanstack/react-router';
import TestProvider from '../../contexts/test-provider';
import TestContext from '../../contexts/test-context';
import { useContext } from 'react';

export const Route = createFileRoute('/distilleries/context-test-component')({
  component: TestContextComponent,
});

function TestContextComponent() {
  return (
    <div>
      <TestProvider>
        {/* Sem musi jit ta child componenta */}
        <ChildComponent />
      </TestProvider>
    </div>
  );
}

function ChildComponent() {
  const { value, fn } = useContext(TestContext);
  return (
    <div>
      <div>
        <div>{value}</div>
        <div>test placeholder</div>
      </div>
      <button
        onClick={() => {
          fn({ value: 'new' });
        }}
      >
        set
      </button>
    </div>
  );
}
