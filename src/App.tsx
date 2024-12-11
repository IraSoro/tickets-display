import { useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import { Ticket, TicketsResponse } from "./data/Ticket";
import Item from "./components/Item";
import Filters from "./components/Filters";

import "./App.css";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

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
    <Box display="flex" p={2}>
      <Filters />

      <Grid container spacing={2} sx={{ width: "75%" }}>
        {tickets.map((ticket, i) => (
          <Grid item key={i}>
            <Item ticket={ticket} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
