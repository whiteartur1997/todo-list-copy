import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react/types-6-0";
import { EditableSpan, EditableSpanPropsType } from "./EditableSpan";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            desciption: "Changed value editable span"
        },
        value: {
            defaultValue: "HTML",
            description: "Start value to editable span"
        }
    }
}

export const Template:Story<EditableSpanPropsType> = (args) => {
    return <EditableSpan {...args} />
}

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange: action("Value changed")
}