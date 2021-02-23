import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { ReduxStoreProviderDecorator } from "../stories/decorators/ReduxStoreProviderDecorator";
import App from "./App";

export default {
  title: 'Todolist/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
} as Meta;

type PropsType = {
  demo?: boolean
}

export const Template: Story<PropsType> = (props: {}) => {
  return <App {...props} />
}

export const AppExample = Template.bind({});
AppExample.args = {
  demo: true
};