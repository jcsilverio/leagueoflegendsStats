import React from "react";

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 text-center footer">
      Copyright &copy; {new Date().getFullYear()}{" "}
      <a href="https://github.com/jcsilverio/leagueoflegendsStats">
        <i className="fa fa-github" />
        JCSilverio
      </a>
    </footer>
  );
};
