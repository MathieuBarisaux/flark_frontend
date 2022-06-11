import "./LoadScreen.scss";

const LoadScreen = () => {
  return (
    <div className="LoadScreen">
      <div className="LoadScreen__container">
        <div className="LoadScreen__square LoadScreen__square--1"></div>
        <div className="LoadScreen__squareMini LoadScreen__squareMini--1"></div>
        <div className="LoadScreen__square LoadScreen__square--2"></div>
        <div className="LoadScreen__square LoadScreen__square--3"></div>
        <div className="LoadScreen__square LoadScreen__square--4"></div>
      </div>
    </div>
  );
};

export default LoadScreen;
