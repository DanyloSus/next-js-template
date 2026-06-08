import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button" },
};

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
};

export const Loading: Story = {
  args: { children: "Saving", isLoading: true },
};
