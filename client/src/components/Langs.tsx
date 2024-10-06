import "./Langs.css";

type LangProps = {
  lang: string,
  onClick: () => void;
}

function Lang({ lang, onClick}: LangProps) {
  return (
    <>
     
      <li className="classLang" onClick={onClick}>{lang}</li>
    </>
  );
}

export default Lang;
