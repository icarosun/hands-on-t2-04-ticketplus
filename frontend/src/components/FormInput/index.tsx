import { useState } from 'react';
import {
    FormControl,
    InputLabel,
    OutlinedInput
} from '@mui/material';

interface FormInputProps {
    id: string;
    label?: string;
    value?: string | number | null;
    onChange?: any;
    type: "text"
        | "email"
        | "password"
        | "number"
        | "file";
    multiline?: boolean;
    minRows?: number;
    readOnly?: boolean;
    shrink?: boolean;
    style?: object;
    placeholder? : string;
    inteiraInput?: boolean;
}

const FormInput = (props: FormInputProps) => {
    const [inputValue, setInputValue] = useState<number | string>("");

    const handleOnChange = () => {
        const inputElement = document.querySelector(`#${props.id}`) as HTMLInputElement;
        const inputElementValue = parseFloat(inputElement.value);
        if (props.inteiraInput) {
            const precoTicketsMeiaElement = document.querySelector("#preco-tickets-2") as HTMLInputElement;
            const precoTicketsMeia = inputElementValue/2;
            precoTicketsMeiaElement.value = precoTicketsMeia.toFixed(2);
        }
        setInputValue(inputElementValue);
    }

    if (props.type === "file") {
        return (
            <>
                <FormControl fullWidth>
                    <OutlinedInput
                        size='small'
                        label={props.label}
                        id={props.id}
                        type={props.type}
                        placeholder={props.placeholder}
                        sx={{ marginBottom: 0 }}
                        key={`outlined-input`}
                    />
                </FormControl>
            </>
        )
    } else {
        return (
            <>
                <FormControl fullWidth>
                    {props.onChange && 
                        <OutlinedInput
                            size='small'
                            label={props.label}
                            value={props.value}
                            id={props.id}
                            onChange={props.onChange}
                            type={props.type}
                            sx={{ marginBottom: 1.5 }}
                            multiline={props.multiline}
                            minRows={props.minRows}
                            placeholder={props.placeholder}
                            key={`outlined-input`}
                            readOnly={props.readOnly}
                        />
                    }
                    {!props.onChange && 
                        <OutlinedInput
                            size='small'
                            label={props.label}
                            value={props.value}
                            id={props.id}
                            type={props.type}
                            sx={{ marginBottom: 1.5 }}
                            multiline={props.multiline}
                            minRows={props.minRows}
                            placeholder={props.placeholder}
                            key={`outlined-input`}
                            readOnly={props.readOnly}
                            onChange={handleOnChange}
                        />
                    }
                </FormControl>
            </>
        )
    }
}

export default FormInput;