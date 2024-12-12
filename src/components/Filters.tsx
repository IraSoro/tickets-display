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

import "./Filters.css";

interface CurrencyProps {
  currencyArr: string[];
  updateCurrency: (newCurrency: string) => void;
}

const Currency = (props: CurrencyProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState(
    props.currencyArr[0]
  );

  const handleClick = (currency: string) => {
    setSelectedCurrency(currency);
    props.updateCurrency(currency);
  };

  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "left", margin: "5px 0 10px" }}>
        Валюта
      </Typography>
      <ButtonGroup variant="outlined" size="large">
        {props.currencyArr.map((currency) => (
          <Button
            key={currency}
            onClick={() => handleClick(currency)}
            sx={{
              borderRadius: "8px",
              bgcolor:
                selectedCurrency === currency ? "primary.main" : "transparent",
              color: selectedCurrency === currency ? "white" : "inherit",
              "&:hover": {
                bgcolor:
                  selectedCurrency === currency
                    ? "primary.dark"
                    : "rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            {currency}
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

const Filters = () => {
  const currencies = ["RU", "USD", "EUR"];
  const updateCurrency = (newCurrency: string) => {
    console.log("update currency: ", newCurrency);
  };

  return (
    <Card className="filters-card" elevation={0}>
      <CardContent>
        <Currency currencyArr={currencies} updateCurrency={updateCurrency} />
        <Transplants />
      </CardContent>
    </Card>
  );
};

export default Filters;
