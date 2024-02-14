import { Box, Grid } from "@mui/material";
import DashboardDefault from "../Dashboard";

export default function PaginaOrganizador() {
  return (
    <Box padding={2}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <DashboardDefault />
        </Grid>
      </Grid>
    </Box>
  );
}
