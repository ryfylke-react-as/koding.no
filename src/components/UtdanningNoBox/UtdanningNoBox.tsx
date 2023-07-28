import Link from "@docusaurus/Link";
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

  const keys = [
    "sektor_antall_offentlig",
    "sektor_antall_privat",
    "sektor_antall_selvstendig",
    "sektor_antall_ikkearbeid",
    "sektor_antall_iutdanning",
    "sektor_antall_arbeidsledig",
  ];

  const total = keys.reduce((acc, key) => acc + yrke[key], 0);

  const percent = (number) => {
    return `${((number / total) * 100).toFixed(1)}%`;
  };

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "max-content",
        maxWidth: "100%",
      }}
    >
      <div className="card__header shadow-tl">
        <h3>
          <Link href={yrke.url}>Utdanning.no</Link>:{" "}
          {yrke.tittel}
        </h3>
      </div>
      <div className="card__body">
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
              <td>
                <div className="badge badge--secondary">
                  {percent(yrke.sektor_antall_offentlig)}
                </div>
              </td>
            </tr>
            <tr>
              <td>Privat sektor</td>
              <td>{yrke.sektor_antall_privat}</td>
              <td>
                <div className="badge badge--secondary">
                  {percent(yrke.sektor_antall_privat)}
                </div>
              </td>
            </tr>
            <tr>
              <td>Selvstendig næringsdrivende</td>
              <td>{yrke.sektor_antall_selvstendig}</td>
              <td>
                <div className="badge badge--secondary">
                  {percent(yrke.sektor_antall_selvstendig)}
                </div>
              </td>
            </tr>
            <tr>
              <td>Ikke i arbeid </td>
              <td>{yrke.sektor_antall_ikkearbeid}</td>
              <td>
                <div className="badge badge--secondary">
                  {percent(yrke.sektor_antall_ikkearbeid)}
                </div>
              </td>
            </tr>
            <tr>
              <td>I utdanning</td>
              <td>{yrke.sektor_antall_iutdanning}</td>
              <td>
                <div className="badge badge--secondary">
                  {percent(yrke.sektor_antall_iutdanning)}
                </div>
              </td>
            </tr>
            <tr>
              <td>Arbeidsledig</td>
              <td>{yrke.sektor_antall_arbeidsledig}</td>
              <td>
                <div className="badge badge--secondary">
                  {percent(yrke.sektor_antall_arbeidsledig)}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
