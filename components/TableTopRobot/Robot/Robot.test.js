import { render, screen } from '@testing-library/react';
import Robot from './Robot';

test('should not load the robot', async () => {
  render(
    <Robot robot={null} />,
  );
  const bot = screen.queryByRole('img');
  expect(bot).toBeNull();
});

test('should render 0,0 coord as bottom left', async () => {
  render(
    <Robot robot={{
      x: 0, y: 0, facing: 0, rotation: 0,
    }}
    />,
  );
  const bot = screen.getByTestId('robot');
  expect(bot.style.getPropertyValue('transform')).toBe('translate(0%,400%) rotate(0deg)');
});

test('should be translate props to css styles', async () => {
  render(
    <Robot robot={{
      x: 1, y: 1, facing: 0, rotation: 180,
    }}
    />,
  );
  const bot = screen.getByTestId('robot');
  expect(bot.style.getPropertyValue('transform')).toBe('translate(100%,300%) rotate(180deg)');
});
