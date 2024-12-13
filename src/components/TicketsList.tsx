import { Button, Card, Divider, Grid, Typography } from "@mui/material";

import { Ticket } from "../data/Ticket";

import "./TicketsList.css";

interface ItemProps {
  ticket: Ticket;
}

const Item = ({ ticket }: ItemProps) => {
  return (
    <Card
      sx={{
        maxWidth: 800,
        height: 150,
        display: "flex",
        padding: 2,
        alignItems: "center",
        borderRadius: "20px",
      }}
      elevation={0}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={3}>
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
            {`$ ${ticket.price}`}
          </Typography>
          <Button
            variant="contained"
            color="warning"
            sx={{ boxShadow: "none", borderRadius: 5, width: 150 }}
          >
            Купить
          </Button>
        </Grid>

        <Grid item xs={1} sm={1} sx={{ height: 150, justifyItems: "center" }}>
          <Divider orientation="vertical" />
        </Grid>

        <Grid item xs={8} sm={8} container spacing={2}>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h4">{ticket.departure_time}</Typography>
            <Typography variant="body1" color="text.secondary">
              {`${ticket.origin}, ${ticket.origin_name}`}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {ticket.departure_date}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="body2">{`Пересадок: ${ticket.stops}`}</Typography>
            <Divider sx={{ width: "100%" }} />
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h4">{ticket.arrival_time}</Typography>
            <Typography variant="body1" color="text.secondary">
              {`${ticket.destination}, ${ticket.destination_name}`}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {ticket.arrival_date}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
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
