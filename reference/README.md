# Design reference — Vuetify

This PoC uses Vuetify as the reference for component appearance,
states and behavior. The Blazor implementation is maintained separately
under `app/`.

Vuetify is not a runtime dependency and its source code is not included
in this repository. The reference is only needed when inspecting or
developing the translated components.

## Source

- Repository: https://github.com/vuetifyjs/vuetify
- Version: v4.2.3
- Commit: `fc19d63fda932084c03c6569c596507585890908`

## Get the reference

Run from the PoC repository root:

```sh
git clone https://github.com/vuetifyjs/vuetify.git reference/vuetify
git -C reference/vuetify checkout --detach fc19d63fda932084c03c6569c596507585890908
```

This creates the local `reference/vuetify/` directory, which is excluded
from Git by the PoC's `.gitignore`.
