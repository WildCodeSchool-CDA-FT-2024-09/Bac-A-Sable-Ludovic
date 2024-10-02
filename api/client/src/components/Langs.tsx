import "./Langs.css";

function Lang({ lang }: { lang: string }) {
  return (
    <>
     
      <h2 className="classLang">{lang}</h2>
    </>
  );
}

export default Lang;
