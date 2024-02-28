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
}

const FormInput = (props: FormInputProps) => {
    const [inputValue, setInputValue] = useState<number | string>("");

    const handleOnChange = () => {
        const inputElement = document.querySelector(`#${props.id}`) as HTMLInputElement;
        const inputElementValue = inputElement.value;
        setInputValue(inputElementValue);
    }

    if (props.type === "file") {
        return (
            <>
                <FormControl fullWidth>
                    <InputLabel
                        htmlFor={props.id}
                        shrink={true}
                        variant="outlined"
                        margin="dense"
                        style={{
                            padding: '0px 5px',
                            backgroundColor: "#FFF"
                        }}
                        key={`input-label`}
                    >
                        {props.label}
                    </InputLabel>
                    {props.onChange &&  <OutlinedInput
                        label={props.label}
                        id={props.id}
                        type={props.type}
                        sx={{ marginBottom: 1.5 }}
                        key={`outlined-input`}
                        value={inputValue}
                    />}
                    {!props.onChange &&  <OutlinedInput
                        label={props.label}
                        id={props.id}
                        type={props.type}
                        sx={{ marginBottom: 1.5 }}
                        key={`outlined-input`}
                        value={inputValue}
                        onChange={handleOnChange}
                    />}
                </FormControl>
            </>
        )
    } else {
        return (
            <>
                <FormControl fullWidth>
                    <InputLabel
                        htmlFor={props.id}
                        key={`input-label`}
                        shrink={props.shrink}
                        style={props.style}
                    >
                        {props.label}
                    </InputLabel>
                    <OutlinedInput
                        label={props.label}
                        value={props.value}
                        id={props.id}
                        onChange={props.onChange}
                        type={props.type}
                        sx={{ marginBottom: 1.5 }}
                        multiline={props.multiline}
                        minRows={props.minRows}
                        key={`outlined-input`}
                        readOnly={props.readOnly}
                    />
                </FormControl>
            </>
        )
    }
}

export default FormInput;