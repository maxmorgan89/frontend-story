## Actions

- Unified interface to describe events
- Just data, no functionality
- Has at a minimum a type property
- Strongly typed using classes and enums

**Good actions hygiene:**

- Unique events get unique actions
- Actions are grouped by their source
- Actions are never reused

**Good naming example:**

- `"[Movies Page] Select Movie”`
- `"[Movies Page] Add Movie"`
- `"[Movies Page] Update Movie"`
- `"[Movies Page] Delete Movie”`



