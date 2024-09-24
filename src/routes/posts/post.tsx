import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/post')({
  component: () => <div>Hello /posts/post!</div>,
});
