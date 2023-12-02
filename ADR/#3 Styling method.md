# Styling Method

## Status

accepted

## Context

We need to apply styling to this application quickly. The css bundle should remain small and have no conflicts with the application outside of the widget. We want to have as much control over the styling as possible.

## Decision

We will use tailwind for now. It is an easy to setup framework and should treeshake all unused css in our current setup.

Other considerations:

- Bootstrap; opinionated styling and big. same conflict risks of tailwind
- scss in style tags; slower to write and play with. Higher risk on making mistakes. Would have no conflicts with hosting page.

## Consequences

With Tailwind we have the freedom of css without the constraints of an opinionated framework.

We need to pay attention to how the resulting css is used; it could conflict with the styling of the hosting application. If that problem occurs we could transfer applied classes to style elements in the components.
