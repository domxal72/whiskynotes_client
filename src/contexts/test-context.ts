import { createContext } from "react";

// Context example
export type TContext = {
  value: string
  fn: (newVal: { value: string }) => void
}

const TestContext = createContext<TContext>({value: 'def', fn: (newVal) => {}})

export default TestContext
