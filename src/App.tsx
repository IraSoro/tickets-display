import { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { Ticket, TicketsResponse } from "./data/Ticket";
import TicketsList from "./components/TicketsList";
import Filters from "./components/Filters";

import { currencies } from "./data/Currency";

import "./App.css";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currency, setCurrency] = useState(currencies[0]);

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
        setTickets(tickets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getTickets]);

  return (
    <div className="main-container">
      <div className="outer-container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={3}>
            <Filters currency={currency} setCurrency={setCurrency} />
          </Grid>
          <Grid item xs={12} sm={9} md={9}>
            <TicketsList tickets={tickets} currency={currency}/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
