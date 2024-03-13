import React from "react";
import { render, screen } from "@testing-library/react";
import CardEvento from "../CardEvento";

describe("Card Evento", () => {
  it("should render the card evento correctly", () => {
    render(
      <CardEvento 
        title = "Teste"
        id='1'
        imageUrl="https://webacademy.icomp.ufam.edu.br/assets/img/logo_letra_branca.png"
        description = "Description event"
        place = "Place" 
      />
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("Place")).toBeInTheDocument();
    expect(screen.getByText("Description event")).toBeInTheDocument();
  })
})

