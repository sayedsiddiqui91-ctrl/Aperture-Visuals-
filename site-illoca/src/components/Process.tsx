import { process } from "@/data/content";
import { Underline } from "./Icons";

export default function Process() {
  return (
    <section className="folder folder--light folder--tilt" id="process" aria-labelledby="process-title">
      <div className="folder__sheet folder__sheet--light">
        <div className="folder__tab">{process.tab}</div>
        <div className="folder__inner">
          <div className="process__head">
            <div>
              <div className="t-hand uline">
                {process.eyebrow}
                <Underline />
              </div>
              <h2 className="process__title t-display" id="process-title">
                {process.title}
              </h2>
            </div>
            <p className="process__intro">{process.intro}</p>
          </div>
          <ol className="process__steps">
            {process.steps.map((s) => (
              <li className="process__step" key={s.n}>
                <div className="process__num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
