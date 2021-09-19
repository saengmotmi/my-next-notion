import React from "react";
import Link from "next/link";

export default function About({ data }) {
  return (
    <div>
      <Link href="/">about</Link> {data}
    </div>
  );
}

About.getInitialState = function () {
  return { data: "data" };
};
