import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

import { CurrencyInfo, currencies } from "../data/Currency";

import "./Filters.css";

interface CurrencyProps {
  currency: CurrencyInfo;
  updateCurrency: (newCurrency: CurrencyInfo) => void;
}

const Currency = (props: CurrencyProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState(props.currency);

  const handleClick = (currency: CurrencyInfo) => {
    setSelectedCurrency(currency);
    props.updateCurrency(currency);
  };

  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "left", margin: "5px 0 10px" }}>
        Валюта
      </Typography>
      <ButtonGroup variant="outlined" size="large">
        {currencies.map((currency) => (
          <Button
            key={currency.code}
            onClick={() => handleClick(currency)}
            sx={{
              borderRadius: "8px",
              bgcolor:
                selectedCurrency.code === currency.code
                  ? "primary.main"
                  : "transparent",
              color:
                selectedCurrency.code === currency.code ? "white" : "inherit",
              "&:hover": {
                bgcolor:
                  selectedCurrency.code === currency.code
                    ? "primary.dark"
                    : "rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            {currency.code}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};

interface TransplantsProps {
  stops: boolean[];
  setStops: (newStops: boolean[]) => void;
}

const Transplants = (props: TransplantsProps) => {
  const [allChecked, setAllChecked] = useState(true);
  const options = [
    "Без пересадок",
    "1 пересадка",
    "2 пересадки",
    "3 пересадки",
  ];

  return (
    <>
      <Typography
        variant="h6"
        sx={{ textAlign: "left", margin: "20px 0 10px" }}
      >
        Количество пересадок
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={allChecked}
              onChange={(e) => {
                console.log(e.target.checked);
                setAllChecked(e.target.checked);
                if (e.target.checked === true) {
                  props.setStops([true, true, true, true]);
                }
              }}
            />
          }
          label="Все"
        />
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                checked={props.stops[i]}
                onChange={(e) => {
                  props.stops[i] = e.target.checked;
                  props.setStops([...props.stops]);
                  if (e.target.checked === false) {
                    setAllChecked(false);
                    return;
                  }
                  if (!props.stops.includes(false)) {
                    setAllChecked(true);
                  }
                }}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </>
  );
};

interface FiltersProps {
  currency: CurrencyInfo;
  setCurrency: (newCurrency: CurrencyInfo) => void;

  stops: boolean[];
  setStops: (newStops: boolean[]) => void;
}

const Filters = (props: FiltersProps) => {
  return (
    <Card className="filters-card" elevation={0}>
      <CardContent>
        <Currency
          currency={props.currency}
          updateCurrency={props.setCurrency}
        />
        <Transplants stops={props.stops} setStops={props.setStops} />
      </CardContent>
    </Card>
  );
};

export default Filters;
