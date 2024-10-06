import Weather from "../Weather/Weather";
import ZodiacSwiper from "../ZodiacSwiper/ZodiacSwiper";
import "./SignSelection.css";

export default function SignSelection({
  data,
  time,
  sign,
  setSign,
  fade,
  setFade,
}) {

  return (
    data && (
      <header className="App-header">
        <ZodiacSwiper
          sign={sign}
          setSign={setSign}
          data={data}
          time={time}
          fade={fade}
          setFade={setFade}
        />
        {/* <p className="date-display"> {newDate} </p> */}
        {/* <div className="Forecast">
          {data.current ? <Weather data={data} time={time}/> : <div></div>}
        </div> */}
      </header>
    )
  );
}
