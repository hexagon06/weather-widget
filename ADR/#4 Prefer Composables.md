# Prefer Composables

## Status

accepted

## Context

We have a typescript heavy vue app which has considerable business logic. We want to test our code, using unittests for most business rules as those require the least amount of effort to maintain. Unittesting components is difficult as it requires a lot of stubbing and knowledge of the context of the tests.

## Decision

We write as much of the businesslogic using [Vue's composables pattern](https://vuejs.org/guide/reusability/composables). Only binding to the elements and anything to do with the lifecycle of the component itself has to be done in the component.

## Consequences

This way of working separates the logic from the components and allows us to test using only data and no visuals.
The downside is that the logic is no longer in the same file of the html, which could be seen as a feature of .jsx and .vue files
