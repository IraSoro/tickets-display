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

const Transplants = () => {
  const options = [
    "Без пересадок",
    "1 пересадка",
    "2 пересадки",
    "3 пересадки",
  ];

  const [selectTransplant, setSelectTransplant] = useState([0, 1, 2, 3]);
  const updateTransplant = (value: number) => {
    console.log(selectTransplant);
    setSelectTransplant((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  return (
    <>
      <Typography
        variant="h6"
        sx={{ textAlign: "left", margin: "20px 0 10px" }}
      >
        Количество пересадок
      </Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Все" />
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                onChange={() => {
                  console.log("change");
                  updateTransplant(i);
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
}

const Filters = (props: FiltersProps) => {
  return (
    <Card className="filters-card" elevation={0}>
      <CardContent>
        <Currency
          currency={props.currency}
          updateCurrency={props.setCurrency}
        />
        <Transplants />
      </CardContent>
    </Card>
  );
};

export default Filters;
