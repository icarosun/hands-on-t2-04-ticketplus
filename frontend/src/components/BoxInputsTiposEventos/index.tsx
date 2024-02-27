import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import FormInput from "../FormInput";


const BoxInputsTiposEventos = () => {
    

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value="tipoIngresso"
                    label="Age"
                    onChange={handleChangeSelectTipoIngressos}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormInput/>
            <FormInput/>
        </Box>
    )
}