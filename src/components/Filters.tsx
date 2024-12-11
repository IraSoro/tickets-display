import { Card, CardContent, Typography } from "@mui/material";

const Filters = () => {
  return (
    <Card sx={{ width: "25%", mr: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Filters;
