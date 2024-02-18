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
}

const FormInput = (props: FormInputProps) => {
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
                    <OutlinedInput
                        label={props.label}
                        id={props.id}
                        type={props.type}
                        sx={{ marginBottom: 1.5 }}
                        key={`outlined-input`}
                    />
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
                    />
                </FormControl>
            </>
        )
    }
}

export default FormInput;