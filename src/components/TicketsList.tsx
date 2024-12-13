import { useEffect, useState } from "react";
import { Button, Card, Divider, Grid, Typography } from "@mui/material";

import { Ticket } from "../data/Ticket";
import { CurrencyInfo } from "../data/Currency";
import {
  fetchFakeCurrencyRates,
  RespCurrencyRates,
} from "../utils/fakeCurrencyApi";

import "./TicketsList.css";

interface ItemProps {
  ticket: Ticket;
  currency: CurrencyInfo;
  rates: RespCurrencyRates;
}

const Item = (props: ItemProps) => {
  const [price, setPrice] = useState(props.ticket.price);

  useEffect(() => {
    console.log("currency = ", props.currency);
    switch (props.currency.code) {
      case "RU":
        setPrice(props.ticket.price);
        break;
      case "USD":
        setPrice(Math.round(props.ticket.price / props.rates.rates.USD));
        break;
      case "EUR":
        setPrice(Math.round(props.ticket.price / props.rates.rates.EUR));
        break;
      default:
        break;
    }
  }, [props.currency]);

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
            {`${props.currency.symbol} ${price}`}
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
            <Typography variant="h4">{props.ticket.departure_time}</Typography>
            <Typography variant="body1" color="text.secondary">
              {`${props.ticket.origin}, ${props.ticket.origin_name}`}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {props.ticket.departure_date}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="body2">{`Пересадок: ${props.ticket.stops}`}</Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h4">{props.ticket.arrival_time}</Typography>
            <Typography variant="body1" color="text.secondary">
              {`${props.ticket.destination}, ${props.ticket.destination_name}`}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {props.ticket.arrival_date}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

interface TicketsListProps {
  tickets: Ticket[];
  currency: CurrencyInfo;
}

const TicketsList = (props: TicketsListProps) => {
  const [rates, setRates] = useState<RespCurrencyRates>({
    base: "RU",
    rates: { USD: 1, EUR: 1 },
  });

  useEffect(() => {
    fetchFakeCurrencyRates()
      .then((data) => {
        setRates(data as RespCurrencyRates);
      })
      .catch((error) => console.error("Error:", error));
  }, [props.currency]);

  return (
    <Grid container direction="column" spacing={2}>
      {props.tickets.map((ticket, i) => (
        <Grid item key={i}>
          <Item ticket={ticket} currency={props.currency} rates={rates} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TicketsList;
