import { Card, CardContent, Typography } from "@mui/material";

import "./Filters.css";

const Filters = () => {
  return (
    <Card className="filters-card" elevation={0}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Filters;
