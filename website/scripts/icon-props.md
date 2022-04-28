## Props

### `style`

Icon style.

| Type       |
| ---------- |
| View Style |

---

### `size`

Width and height of the icon.

| Type   | Default |
| ------ | ------- |
| number | `24`    |

---

### `color`

Changes the stroke or fill color if it is not overridden. Color will change based on the theme.

| Type                                                             | Default     |
| ---------------------------------------------------------------- | ----------- |
| string or `'default'` or `'primary'` or `'error'` or `'greyout'` | `'default'` |

---

### `stroke`

Stroke color of the icon. This overrides the color set with the [`color`](#color) prop.

| Type   |
| ------ |
| string |

---

### `fill`

Fill color of the icon. This overrides the color set with the [`color`](#color) prop.

| Type   |
| ------ |
| string |

---

### `filled`

If `true`, uses the [`stroke`](#stroke) prop as fill color.
If [`fill`](#fill) is also set, this prop will be ignored.

| Type    |
| ------- |
| boolean |
