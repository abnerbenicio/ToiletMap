import React from "react";
import { render, screen } from "@testing-library/react-native";
import MapPage from "../src/app/MapPage";
import * as Location from "expo-location";
import API from "../src/api/toilet-api";

// Mock do expo-location
jest.mock("expo-location", () => ({
  getCurrentPositionAsync: jest.fn(),
}));

// Mock da API
jest.mock("../src/api/toilet-api", () => ({
  get: jest.fn(),
}));

describe("MapPage", () => {
  test("deve renderizar corretamente o componente", async () => {
    Location.getCurrentPositionAsync.mockResolvedValue({
      coords: { latitude: -20.2724787, longitude: -40.2894821 },
    });

    API.get.mockResolvedValue({ data: [] });

    render(<MapPage />);

    expect(await screen.findByText("Carregando...")).toBeTruthy();
  });

});

afterAll(() => {
  jest.clearAllTimers();
  jest.restoreAllMocks();
});

