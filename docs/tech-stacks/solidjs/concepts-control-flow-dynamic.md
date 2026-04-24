---
title: Control flow - Dynamic
source: https://docs.solidjs.com/concepts/control-flow/dynamic
description: Dynamic is a Solid component that allows you to render components dynamically based on data.
---

# Control flow - Dynamic

`<Dynamic>` is a Solid component that allows you to render components dynamically based on data. By passing either a string representing a native HTML element or a component function to the `component` prop, you can render the chosen component with the remaining props you provide.

```jsx
import { createSignal, For } from "solid-js";
import { Dynamic } from "solid-js/web";

const RedDiv = () => <div style="color: red">Red</div>;
const GreenDiv = () => <div style="color: green">Green</div>;
const BlueDiv = () => <div style="color: blue">Blue</div>;

const options = {
  red: RedDiv,
  green: GreenDiv,
  blue: BlueDiv,
};

function App() {
  const [selected, setSelected] = createSignal("red");

  return (
    <>
      <select
        value={selected()}
        onInput={(e) => setSelected(e.currentTarget.value)}
      >
        <For each={Object.keys(options)}>
          {(color) => <option value={color}>{color}</option>}
        </For>
      </select>
      <Dynamic component={options[selected()]} />
    </>
  );
}
```

## Props

When working with these components, you can pass props to the component you are rendering by passing them to the `<Dynamic>` component.
