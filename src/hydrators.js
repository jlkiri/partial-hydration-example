import React from "react";
import ReactDOM from "react-dom";

function interopDefault(mod) {
  return (mod && mod.default) || mod;
}

export function ServerHydrator({ load, ...props }) {
  const Child = interopDefault(load());
  console.log("server hydrator");
  return (
    <section className="hydrated">
      <Child {...props} />
    </section>
  );
}

export class Hydrator extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    new IntersectionObserver(async ([entry], obs) => {
      if (!entry.isIntersecting) return;
      obs.unobserve(this.root);

      const { load, ...props } = this.props;
      console.log("client hydrator");
      const Child = interopDefault(await load());
      ReactDOM.hydrate(<Child {...props} />, this.root);
    }).observe(this.root);
  }

  render() {
    return (
      <section
        className="hydrated"
        ref={c => (this.root = c)}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: "" }}
      ></section>
    );
  }
}
