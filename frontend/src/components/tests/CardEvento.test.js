import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CardEvento from "../CardEvento";
import { BrowserRouter } from "react-router-dom";

describe("Card Evento", () => {
  it("should render the card evento correctly", () => {
    render(
      <BrowserRouter>
        <CardEvento 
          title = "Teste"
          id='1'
          imageUrl="https://webacademy.icomp.ufam.edu.br/assets/img/logo_letra_branca.png"
          description = "Description event"
          place = "Place" 
        />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("Place")).toBeInTheDocument();
    expect(screen.getByText("Description event")).toBeInTheDocument();
    expect(screen.getByTestId("card-evento-component")).toBeInTheDocument();
  });

  it("should verify the click event on the given DOM", () => {
    render(
      <BrowserRouter>
        <CardEvento 
          title = "Teste"
          id='1'
          imageUrl="https://webacademy.icomp.ufam.edu.br/assets/img/logo_letra_branca.png"
          description = "Description event"
          place = "Place" 
        />
      </BrowserRouter>
    );

    const card = screen.getByTestId("card-evento-component");
    expect(card).toBeInTheDocument();

    fireEvent.click(card);

  });
})

