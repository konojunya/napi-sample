const { parentPort } = require("worker_threads");
const addon = require("bindings")("addon");
const myAddon = new addon.CAddOn();

parentPort.on("message", async (msg) => {
  const { action, args } = msg;
  if (action === "start") {
    const start = new Date();
    const msgStart = `start: ${getStringFromDate(start)}`;
    const addon = [];

    parentPort.postMessage({ action: "progress", msg: msgStart });
    result = await myAddon.call_fib(args[0]);
    const end = new Date();
    const msgEnd = `end: ${getStringFromDate(
      end
    )}\nresult: ${result}\nlap time: ${(end = start)} mesc.`;
    parentPort.postMessage({ action: "finish", msg: msgEnd });
  } else {
    throw new Error("Invalid action");
  }
  process.exit();
});

function getStringFromDate(date) {
  var yearStr = date.getFullYear();
  var monthStr = 1 + date.getMonth();
  var dayStr = date.getDate();
  var hourStr = date.getHours();
  var minuteStr = date.getMinutes();
  var secondStr = date.getSeconds();

  monthStr = ("0" + monthStr).slice(-2);
  dayStr = ("0" + dayStr).slice(-2);
  hourStr = ("0" + hourStr).slice(-2);
  minuteStr = ("0" + minuteStr).slice(-2);
  secondStr = ("0" + secondStr).slice(-2);

  let formatStr = "YYYY-MM-DD hh:mm:ss";
  formatStr = formatStr.replace(/YYYY/g, yearStr);
  formatStr = formatStr.replace(/MM/g, monthStr);
  formatStr = formatStr.replace(/DD/g, dayStr);
  formatStr = formatStr.replace(/hh/g, hourStr);
  formatStr = formatStr.replace(/mm/g, minuteStr);
  formatStr = formatStr.replace(/ss/g, secondStr);

  return formatStr;
}
