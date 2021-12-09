import React, { useState } from "react";
import { functions } from "../../js/functions";
import { useFunctionsQuery } from "@react-query-firebase/functions";

import Header from "../timeline/Header";
import Filters from "../timeline/Filters";
import Entry from "../timeline/Entry";
import Loader from "../timeline/Loader";
import Footer from "../timeline/Footer";

export default function Timeline() {
  let [filters, setFilters] = useState({ theme: [], tech: [], blockchain: [] });

  let entries = [];
  const query = useFunctionsQuery(
    ["entries", { limit: 2 }],
    functions,
    "getEntries"
  );
  if (entries.len === 0 && !query.isLoading && !query.isError) {
    entries = query.data;
  }

  // eslint-disable-next-line no-unused-vars
  const renderEntries = () => {
    return (
      <article className="timeline">
        {entries.map((entry, ind) => {
          let className = ind % 2 === 0 ? "even" : "odd";
          if (ind === 0) {
            className += " first";
          }
          return <Entry key={entry.id} entry={entry} className={className} />;
        })}
      </article>
    );
  };

  const renderBody = () => {
    if (query.isLoading) {
      return <Loader />;
    } else if (query.isError) {
      return <span>Error</span>;
    }
    return renderEntries();
  };

  return (
    <>
      <Header />
      <Filters filters={filters} setFilters={setFilters} />
      <div className="content-wrapper" aria-busy={query.isLoading}>
        {renderBody()}
      </div>
      <Footer />
    </>
  );
}
