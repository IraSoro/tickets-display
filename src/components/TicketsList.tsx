import { useEffect, useState } from "react";
import { Button, Card, Divider, Grid, Typography } from "@mui/material";

import { Ticket } from "../data/Ticket";
import { CurrencyInfo } from "../data/Currency";
import { RespCurrencyRates } from "../utils/fakeCurrencyApi";

interface ItemProps {
  ticket: Ticket;
  currency: CurrencyInfo;
  exchange: RespCurrencyRates;
}

const Item = (props: ItemProps) => {
  const [price, setPrice] = useState(props.ticket.price);

  const calculationPrice = (base: number, rate: number) => {
    return Math.round(base / rate);
  };

  useEffect(() => {
    let newPrice = 0;
    switch (props.currency.code) {
      case "RU":
        newPrice = props.ticket.price;
        break;
      case "USD":
        newPrice = calculationPrice(
          props.ticket.price,
          props.exchange.rates.USD
        );
        break;
      case "EUR":
        newPrice = calculationPrice(
          props.ticket.price,
          props.exchange.rates.EUR
        );
        break;
      default:
        return;
    }
    setPrice(newPrice);
  }, [props.currency, props.ticket.price, props.exchange.rates]);

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
  rates: RespCurrencyRates;
}

const TicketsList = (props: TicketsListProps) => {
  return (
    <Grid container direction="column" spacing={2}>
      {props.tickets.map((ticket, i) => (
        <Grid item key={i}>
          <Item
            ticket={ticket}
            currency={props.currency}
            exchange={props.rates}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TicketsList;
