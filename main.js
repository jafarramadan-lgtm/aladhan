let cities = [
  { arabicname: "حمص", name: "SY-HI" },
  { arabicname: "اللاذقية", name: "SY-LA" },
  { arabicname: "طرطوس", name: "SY-TA" },
  { arabicname: "الحسكة", name: "SY-HA" },
  { arabicname: "القنيطرة", name: "SY-QU" },
  { arabicname: "الرقة", name: "SY-RA" },
  { arabicname: "السويداء", name: "SY-SU" },
  { arabicname: "دير الزور", name: "SY-DY" },
  { arabicname: "حلب", name: "SY-HL" },
  { arabicname: "حماة", name: "SY-HM" },
  { arabicname: "ادلب", name: "SY-ID" },
  { arabicname: "ريف دمشق", name: "SY-Rd" },
  { arabicname: "درعا", name: "SY-DR" },
  { arabicname: "دمشق", name: "SY-DI" },




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
gettimesofcity("SY-HI");
function filltimeforprayer(id, time) {
  document.getElementById(id).innerHTML = time;
}




