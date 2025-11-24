let cities = [
  { arabicname: "حمص", name: "HI" },
  { arabicname: "اللاذقية", name: "LA" },
  { arabicname: "طرطوس", name: "TA" },
  { arabicname: "الحسكة", name: "HA" },
  { arabicname: "القنيطرة", name: "QU" },
  { arabicname: "الرقة", name: "RA" },
  { arabicname: "السويداء", name: "SU" },
  { arabicname: "دير الزور", name: "DY" },
  { arabicname: "حلب", name: "HL" },
  { arabicname: "حماة", name: "HM" },
  { arabicname: "ادلب", name: "ID" },
  { arabicname: "ريف دمشق", name: "Rd" },
  { arabicname: "درعا", name: "DR" },
  { arabicname: "دمشق", name: "DI" },




];
for (let city of cities) {
  const content = `
    <option>${city.arabicname}</option>
    `;
  document.getElementById("cityselect").innerHTML += content;
}
document.getElementById("cityselect").addEventListener("change", function () {
    let  cityname=""
    document.getElementById("cityName").innerHTML=document.getElementById("cityselect").value
    for (city of cities){
        if(city.arabicname===document.getElementById("cityselect").value){
            cityname=city.name

        }
    }

gettimesofcity(cityname)
});
function gettimesofcity(c) {
  let params = {
    country: "SY",
    city: c,
  };

  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      const timings = response.data.data.timings;
      filltimeforprayer("fajrTime", timings.Fajr);
      filltimeforprayer("sunriseTime", timings.Sunrise);
      filltimeforprayer("dhurhTime", timings.Dhuhr);
      filltimeforprayer("asrTime", timings.Asr);
      filltimeforprayer("sunsetTime", timings.Sunset);
      filltimeforprayer("ishaTime", timings.Isha);
      const readabledate = response.data.data.date.readable;
      const weekday = response.data.data.date.hijri.weekday.ar;
      const date = weekday + " " + readabledate;
      document.getElementById("date").innerHTML = date;
    })
    .catch(function (error) {
      console.log(error);
    });
}
gettimesofcity("HI");
function filltimeforprayer(id, time) {
  document.getElementById(id).innerHTML = time;
}

