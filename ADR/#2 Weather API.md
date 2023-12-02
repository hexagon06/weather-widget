# Weather API

## Status

accepted

## Context

For the project we need an open weather api. It should be easy to request basic weather predictions. We work with a development time constraint.

## Decision

We use [tomorrow.io](https://docs.tomorrow.io/) to request weather data. The API seems clear, and has many features. The documentation is up to date and readable. The recipes feature helps to get up and running quickly. While configuration may take a little more time to setup, the documentation seems sufficient.

[openweathermap.org](https://openweathermap.org/api) was also considered, but seems less readable and has less support for setting up.

## Consequences

We should be up and running quickly with this api. Some time will need to be spent on configuration.

openweathermap is still a valid option if we encounter any issues, apis seem to be similar in useage
