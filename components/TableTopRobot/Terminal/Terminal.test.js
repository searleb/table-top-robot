import { render, fireEvent, screen } from '@testing-library/react';
import Terminal from './Terminal';

test('loads with empty terminal feed', async () => {
  render(
    <Terminal
      robot={null}
      setRobot={jest.fn()}
      handleMove={jest.fn()}
      handleRotate={jest.fn()}
    />,
  );
  const feed = screen.getByTestId('feed');
  expect(feed.childElementCount).toBe(0);
});

// This test could be expanded to test all input variables
// and expected output in the terminal feed
test('adds output to the terminal feed', async () => {
  render(
    <Terminal
      robot={null}
      setRobot={jest.fn()}
      handleMove={jest.fn()}
      handleRotate={jest.fn()}
    />,
  );
  const form = screen.getByTestId('form');
  const input = screen.getByTestId('input');
  fireEvent.change(input, { target: { value: 'move()' } });
  fireEvent.submit(form);
  const feed = screen.getByTestId('feed');
  expect(feed.childElementCount).toBe(1);
});
