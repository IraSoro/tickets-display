import { Card, CardContent, Typography } from "@mui/material";

const Filters = () => {
  return (
    <Card sx={{ maxWidth: "300px", width: "100%", height: "300px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Filters;
