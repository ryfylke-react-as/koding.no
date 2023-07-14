import React, { useEffect, useState } from "react";

type Response<T extends string> = {
  [key in T]: {
    uno_id: T;
    tittel: string;
    url: string;
    summary: string;
    sektor_antall_personer: number;
    sektor_antall_offentlig: number;
    sektor_antall_privat: number;
    sektor_antall_selvstendig: number;
    sektor_antall_ikkearbeid: number;
    sektor_antall_iutdanning: number;
    sektor_antall_arbeidsledig: number;
    interesser: string[];
    sokeord: string[];
  };
};

export const UtdanningNoBox = <T extends string>(props: {
  id: T;
}) => {
  const [data, setData] = useState<Response<T> | null>(null);

  useEffect(() => {
    fetch(
      `https://api.utdanning.no/sammenligning/main?uno_id=${props.id}&vis_alt=true`
    )
      .then((res) => res.json())
      .then((data) => setData(data as Response<T>))
      .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return null;
  }

  const yrke = data[props.id];

  const total =
    yrke.sektor_antall_arbeidsledig +
    yrke.sektor_antall_iutdanning +
    yrke.sektor_antall_ikkearbeid +
    yrke.sektor_antall_offentlig +
    yrke.sektor_antall_privat +
    yrke.sektor_antall_selvstendig;

  const percent = (number) => {
    return `${((number / total) * 100).toFixed(2)}%`;
  };

  return (
    <div
      style={{
        background: "var(--ifm-background-surface-color)",
        padding: "1rem",
        width: "max-content",
        maxWidth: "100%",
        border: "1px solid var(--ifm-blockquote-border-color)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <strong>{yrke.tittel}</strong> (
        <a href={yrke.url}>Utdanning.no</a>)
      </div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Antall personer</th>
            <th>Prosentandel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Offentlig sektor</td>
            <td>{yrke.sektor_antall_offentlig}</td>
            <td>{percent(yrke.sektor_antall_offentlig)}</td>
          </tr>
          <tr>
            <td>Privat sektor</td>
            <td>{yrke.sektor_antall_privat}</td>
            <td>{percent(yrke.sektor_antall_privat)}</td>
          </tr>
          <tr>
            <td>Selvstendig næringsdrivende</td>
            <td>{yrke.sektor_antall_selvstendig}</td>
            <td>{percent(yrke.sektor_antall_selvstendig)}</td>
          </tr>
          <tr>
            <td>Ikke i arbeid </td>
            <td>{yrke.sektor_antall_ikkearbeid}</td>
            <td>{percent(yrke.sektor_antall_ikkearbeid)}</td>
          </tr>
          <tr>
            <td>I utdanning</td>
            <td>{yrke.sektor_antall_iutdanning}</td>
            <td>{percent(yrke.sektor_antall_iutdanning)}</td>
          </tr>
          <tr>
            <td>Arbeidsledig</td>
            <td>{yrke.sektor_antall_arbeidsledig}</td>
            <td>{percent(yrke.sektor_antall_arbeidsledig)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
