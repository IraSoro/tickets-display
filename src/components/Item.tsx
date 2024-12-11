import { Card, CardContent, Typography } from "@mui/material";

import { Ticket } from "../data/Ticket";

interface ItemProps {
  ticket: Ticket;
}

const Item = ({ ticket }: ItemProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{ticket.arrival_date}</Typography>
        <Typography variant="body2" color="text.secondary">
          Description
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Item;
