import ReferenceList from "../components/ReferenceList";

export default function Page() {
  return (
    <div className="grid">
      <section>
        <h2>Focused Research Prompt</h2>
        <p>
          This project examines how Samuel Richardson's <em>Pamela; or, Virtue Rewarded</em> (1740)
          helped inaugurate the English novel as a moral and emotional art form. It tracks how
          sentimental discourse (pity, tears, moral feeling) becomes a public pedagogy for virtue,
          while also negotiating social class and gender: a servant heroine whose chastity is tested
          becomes a model for middle-class virtue, even as the narrative converts affect into
          social capital and marital mobility.
        </p>
      </section>

      <section>
        <h2>Key Analytical Axes</h2>
        <ul>
          <li><strong>Sentimentalism</strong>: Epistolary immediacy cultivates sympathy and moral judgment.</li>
          <li><strong>Virtue and Reward</strong>: Chastity operates as ethical currency within emergent bourgeois norms.</li>
          <li><strong>Gender</strong>: Femininity is scripted through feeling, restraint, and narrative credibility.</li>
          <li><strong>Class</strong>: Pamela's upward mobility reframes service, property, and consent.</li>
          <li><strong>Form</strong>: The novel fuses private feeling with public moral instruction.</li>
        </ul>
      </section>

      <section>
        <h2>Peer-Reviewed JSTOR Articles</h2>
        <p className="muted">
          Curated automatically from Crossref and filtered to items with JSTOR DOIs (10.2307/?). Click
          any title to open the stable JSTOR page. Use keywords to refine.
        </p>
        <ReferenceList />
      </section>

      <section>
        <h2>How to Use These Sources</h2>
        <ul>
          <li><strong>Start</strong> with articles that foreground sentimentalism, virtue, and gender.</li>
          <li><strong>Contrast</strong> sympathetic pedagogy with critiques of coercion, surveillance, and class power.</li>
          <li><strong>Frame</strong> a thesis on how feeling adjudicates virtue amid unequal relations.</li>
        </ul>
      </section>
    </div>
  );
}
