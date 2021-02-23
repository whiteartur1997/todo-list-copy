import { AddItemForm, AddItemFormPropsType } from "./AddItemForm";
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'AddItemFormExample clicked'
        }
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />

export const AddItemFormExample = Template.bind({});

AddItemFormExample.args = {
    addItem: action("Add item form clicked!")
}
