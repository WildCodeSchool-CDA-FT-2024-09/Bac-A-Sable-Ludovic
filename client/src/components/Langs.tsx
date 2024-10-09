import "./Langs.css";

type LangProps = {
  lang: string;
  onClick: () => void;
};

function Lang({ lang, onClick }: LangProps) {
  return (
    <>
      <li onClick={onClick} className="classLang">
        {lang}
      </li>
    </>
  );
}

export default Lang;
