import React, { useEffect, useState } from "react";
import "./Song.css";

function Song({ id, title, author, link }) {
  return (
    <div className="song">
      <p>{title}</p>
      <p>{author}</p>
    </div>
  );
}

export default Song;
