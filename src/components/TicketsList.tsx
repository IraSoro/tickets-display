import { Card, CardContent, Grid, List, Typography } from "@mui/material";

import { Ticket } from "../data/Ticket";

interface ItemProps {
  ticket: Ticket;
}

const Item = ({ ticket }: ItemProps) => {
  return (
    <Card style={{ maxWidth: "800px", width: "100%" }}>
      <CardContent>
        <Typography variant="h6">{ticket.arrival_date}</Typography>
        <Typography variant="body2" color="text.secondary">
          Description
        </Typography>
      </CardContent>
    </Card>
  );
};

interface TicketsListProps {
  tickets: Ticket[];
}

const TicketsList = ({ tickets }: TicketsListProps) => {
  return (
    <List>
      {tickets.map((ticket, i) => (
        <Grid item key={i}>
          <Item ticket={ticket} />
        </Grid>
      ))}
    </List>
  );
};

export default TicketsList;
