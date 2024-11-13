import "./Langs.css";

type LangProps = {
  id:  number | string;
  lang: string;
  onClick: () => void;
};

function Lang({ lang, onClick }: LangProps) {
  return (
    <>
      <li  onClick={onClick} className="classLang">
        {lang}
      </li>
    </>
  );
}

export default Lang;
