import { Card, CardContent, Grid, Typography } from "@mui/material";

import { Ticket } from "../data/Ticket";

import "./TicketsList.css";

interface ItemProps {
  ticket: Ticket;
}

const Item = ({ ticket }: ItemProps) => {
  return (
    <Card className="ticket-card" elevation={0}>
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
    <Grid container direction="column" spacing={2}>
      {tickets.map((ticket, i) => (
        <Grid item key={i}>
          <Item ticket={ticket} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TicketsList;
