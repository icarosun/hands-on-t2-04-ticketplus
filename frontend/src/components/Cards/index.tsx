import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";

export interface Card {
  isMoney?: boolean;
  title: string;
  value: number;
}

export default function CustomCard(props: Card) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={0.5}>
          <Typography variant="h6" color="textSecondary">
            {props.title}
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h4" color="inherit">
                {props.isMoney ? "R$ " + props.value : props.value}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
