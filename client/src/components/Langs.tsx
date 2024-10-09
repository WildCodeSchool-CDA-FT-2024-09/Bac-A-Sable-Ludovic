import "./Langs.css";

type LangProps = {
  lang: string;
};

function Lang({ lang }: LangProps) {
  return (
    <>
      <li className="classLang">{lang}</li>
    </>
  );
}

export default Lang;
