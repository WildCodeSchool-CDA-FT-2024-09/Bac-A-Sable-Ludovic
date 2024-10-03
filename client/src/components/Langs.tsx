import "./Langs.css";

function Lang({ lang }: { lang: string }) {
  return (
    <>
     
      <li className="classLang">{lang}</li>
    </>
  );
}

export default Lang;
