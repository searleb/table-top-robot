import {
  render, fireEvent, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import TableTopRobot from './TableTopRobot';

test('loads table top robot', async () => {
  render(<TableTopRobot />);
});

test('will not render robot out of bounds', async () => {
  render(<TableTopRobot />);
  const form = screen.getByTestId('form');
  const input = screen.getByTestId('input');
  // place the bot
  fireEvent.change(input, { target: { value: 'place(4,4,east)' } });
  fireEvent.submit(form);

  // find the new bot
  const initialBot = screen.getByTestId('robot');
  const initialPosition = initialBot.style.transform;
  expect(initialBot).toBeInTheDocument();

  // move the bot - out of bounds
  fireEvent.change(input, { target: { value: 'move()' } });
  fireEvent.submit(form);

  // the bot should not have moved and error logged to the terminal
  expect(screen.getByTestId('robot').style.transform).toEqual(initialPosition);
  expect(screen.getByText("I'll fall off if I go any further!")).toBeInTheDocument();
});
