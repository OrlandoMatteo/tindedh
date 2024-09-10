import type { Meta, StoryObj } from '@storybook/react';

import MtgCard from './MtgCard';

const meta = {
  component: MtgCard,
} satisfies Meta<typeof MtgCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};