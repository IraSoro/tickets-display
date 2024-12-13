import { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { Ticket, TicketsResponse } from "./data/Ticket";
import TicketsList from "./components/TicketsList";
import Filters from "./components/Filters";

import { currencies } from "./data/Currency";
import {
  fetchFakeCurrencyRates,
  RespCurrencyRates,
} from "./utils/fakeCurrencyApi";

import "./App.css";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currency, setCurrency] = useState(currencies[0]);
  const [rates, setRates] = useState<RespCurrencyRates>({
    base: "RU",
    rates: { USD: 1, EUR: 1 },
  });

  const [stops, setStops] = useState([true, true, true, true]);

  const getTickets = useCallback(async () => {
    const resp = await fetch("/tickets.json");
    if (!resp.ok) {
      throw new Error(`Failed to fetch tickets: ${await resp.json()}`);
    }
    const jsonData = (await resp.json()) as TicketsResponse;
    return jsonData.tickets;
  }, []);

  useEffect(() => {
    getTickets()
      .then((tickets) => {
        setTickets(tickets.filter((ticket) => stops[ticket.stops] === true));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getTickets, stops]);

  useEffect(() => {
    fetchFakeCurrencyRates()
      .then((data) => {
        setRates(data as RespCurrencyRates);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="main-container">
      <div className="outer-container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={3}>
            <Filters
              currency={currency}
              setCurrency={setCurrency}
              stops={stops}
              setStops={setStops}
            />
          </Grid>
          <Grid item xs={12} sm={9} md={9}>
            <TicketsList tickets={tickets} currency={currency} rates={rates} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
