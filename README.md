# poc_blazor - Todo app + reusable components

A small Blazor Web App (.NET 8, **Interactive Server** rendering) that demonstrates
translating Vue/Vuetify components into reusable native Blazor components.
The todo app is only a demonstration surface — the components are the deliverable.

## Reference

- Version: **Vuetify 4.2.3**
- Commit: `fc19d63fda932084c03c6569c596507585890908` (2026-10-01, shallow clone of `master`)
- Components used as reference: `VBtn` (variant `flat`), `VTextField` (variant `outlined`),
  `VCheckbox`, `VDatePicker` — see [MAPPING.md](app/MAPPING.md) for source-to-component mappings
  and known differences.

The Vuetify source is not included in this repository.
See [reference setup](reference/README.md) for instructions on fetching the exact reference used by this PoC.

## Run

Requires the .NET 8 SDK.

```bash
dotnet run --project app
# or
cd app && dotnet run
```

Then open **http://localhost:5223** (the `http` launch profile).

| Route         | Purpose                                        |
| ------------- | ---------------------------------------------- |
| `/`           | Todo demo (add / complete / delete, in-memory) |
| `/components` | Showcase of all translated components          |

## Structure

```
app/
  Components/
    Ui/                 Reusable translated components (Razor + scoped .razor.css)
      FlatButton        ← VBtn variant="flat"
      TextField         ← VTextField variant="outlined" (+ VField)
      AppCheckbox       ← VCheckbox (+ VSelectionControl)
      DatePicker        ← VDatePicker (+ controls/month subcomponents)
    Pages/
      Home.razor        Todo demo (/)
      Showcase.razor    Component showcase (/components)
    Layout/MainLayout   App bar + navigation
  Models/TodoItem.cs    In-memory todo model
  wwwroot/app.css       Shared design tokens (CSS custom properties) + base styles
  wwwroot/js/datepicker.js  Minimal focus helper (only custom JS in the project)
```

## Conventions

- Component styles live in component-scoped `.razor.css` files (CSS isolation).
- Shared values (colors, opacities, radii, easing, font) are CSS variables in
  `wwwroot/app.css`, translated from Vuetify's default light theme.
- Components use Blazor parameters, `EventCallback` and two-way `@bind-Value`.
- Interactions are implemented in C#. The only custom JavaScript is a 7-line
  focus helper required for arrow-key navigation in the calendar grid.
- No Vue at runtime, no third-party Blazor UI library.
