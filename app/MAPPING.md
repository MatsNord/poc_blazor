# Source-to-component mapping

Reference: **Vuetify 4.2.3**, commit `fc19d63fda932084c03c6569c596507585890908`,
at `reference/vuetify` (read-only). All paths below are relative to
`reference/vuetify/packages/vuetify/src/`.

## Components

| Blazor component | Vuetify source | Notes |
| --- | --- | --- |
| `Components/Ui/FlatButton.razor(.css)` | `components/VBtn/VBtn.sass`, `components/VBtn/_variables.scss`, `composables/variant.tsx` | `variant="flat"`, default size/density only. `Color` sets the theme **background** (as Vuetify does for elevated/flat) plus the generated on-color foreground (`on-primary` white, `on-error` white, `on-surface` near-black). `OnClick` ≈ `@click`, `Disabled` ≈ `disabled`, `ChildContent` ≈ default slot. Hover/active state layer ≈ `.v-btn__overlay` (uses the foreground color); focus ring ≈ `.v-btn:focus-visible::after`. Disabled flat ≈ surface background + faded on-surface text. |
| `Components/Ui/TextField.razor(.css)` | `components/VTextField/VTextField.sass`, `components/VField/VField.sass`, `components/VField/_variables.scss` | `variant="outlined"`, default density (56px). `Label`/`Value`/`Error` ≈ `label`/`v-model`/`error-messages`. Label is static on the top border (0.75rem, medium emphasis) — see difference 4. Error details from `VInput` messages (0.75rem, error color). |
| `Components/Ui/AppCheckbox.razor(.css)` | `components/VCheckbox/VCheckbox.sass`, `components/VSelectionControl/VSelectionControl.sass` | 40px control target with circular hover/focus state layer; 18px box; mdi check path. `Value`/`ValueChanged` ≈ `v-model`; label associated via `for`. |
| `Components/Ui/DatePicker.razor(.css)` | `components/VDatePicker/VDatePicker.sass`, `VDatePickerMonth.sass`, `VDatePickerControls.sass`, `components/VDatePicker/_variables.scss` | 328px popup (elevation-8 shadow), 56px controls row, 7-column grid of 40px day cells. Prev/next chevron icons are mdi paths. `Value` (`DateOnly?`) ≈ `v-model`; Clear button in the actions row. |

## Design tokens (`wwwroot/app.css`)

Translated from the default light theme in `composables/theme.ts` and
`styles/settings/_variables.scss`:

| Token | Value | Vuetify source |
| --- | --- | --- |
| `--v-primary` / `--v-on-primary` | `#1867C0` / `#FFFFFF` | light theme `primary` |
| `--v-error` | `#B00020` | light theme `error` |
| `--v-surface` | `#FFFFFF` | light theme `surface` |
| `--v-surface-variant` / `--v-on-surface-variant` | `#424242` / `#EEEEEE` | used by the selected day cell |
| `--v-high-emphasis` / `--v-medium-emphasis` | `rgba(0,0,0,.87)` / `rgba(0,0,0,.60)` | `--v-high/medium-emphasis-opacity` |
| `--v-border-color` | `rgba(0,0,0,.38)` | field outline opacity `.38` |
| `--v-hover-opacity` / `--v-focus-opacity` / `--v-pressed-opacity` | `.04` / `.12` / `.12` | `--v-hover/focus/pressed-opacity` |
| `--v-disabled-opacity` | `.38` (button disabled uses `.26`, matching `$button-disabled-opacity`) | `--v-disabled-opacity` |
| `--v-radius` | `4px` | `$border-radius-root` |
| `--v-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | `$standard-easing` |
| `--v-font-family` | `Roboto, sans-serif` (loaded from Google Fonts with system fallback) | default font |

## Known differences

Deliberate simplifications and unavoidable gaps versus the Vue originals:

1. **Scope**: only the flat button, outlined field and single-value date picker
   variants are translated. No density system, sizes, variants, theme switching,
   or dark mode — the default light theme values are baked into tokens.
2. **Ripple**: Vuetify's touch ripple is not reproduced; hover/focus/pressed
   overlay states are preserved.
3. **Focused field border width**: the 1px → 2px focus transition is simulated
   with an inset `box-shadow` to avoid layout shift, instead of Vuetify's
   separate `.v-field__outline` border element.
4. **Static label**: deliberate simplification — TextField and DatePicker labels
   sit permanently on the top border (0.75rem, medium emphasis, same position and
   typography in both) with a surface-colored patch breaking the outline, instead of
   Vuetify's floating/animated label (resting inside the field, floating with scale
   0.75 on focus/value). Placeholders are therefore always visible when the field is
   empty, and focused-label color behavior (difference below) no longer applies.
5. **Date formatting and week start** come from .NET `CurrentCulture`
   (Vuetify uses its own locale system; `en-US` also starts weeks on Sunday).
6. **Today indicator**: a primary inset ring is added for usability; the
   Vuetify month stylesheet does not define distinct default styling for
   `.v-date-picker-month__day--today`.
7. **Popup positioning** is absolute below the trigger. Vuetify uses `VOverlay`
   with viewport collision detection; the demo does not.
8. **Outside click** is handled by a transparent fixed backdrop element instead
   of Vuetify's overlay stack / `click-outside` directive — no JavaScript needed.
9. **Focus management**: Escape/Select/Clear restore focus to the trigger via
   Blazor's built-in `ElementReference.FocusAsync`. Arrow-key navigation between
   day cells uses one 7-line JS helper (`wwwroot/js/datepicker.js`) because the
   grid re-renders and server-side element handles go stale; this is the only
   custom JavaScript in the project.
10. **ARIA** is simplified: the grid uses `role="grid"` with `aria-pressed` day
    buttons rather than Vuetify's full `gridcell`/`row` markup.
11. Icons are inline SVG using the same mdi paths instead of the `@mdi/js`
    icon font/component pipeline.
