import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "5s", target: 200 }, //ramp uo
    { duration: "5m", target: 200 }, // stable
    { duration: "5s", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(99)<100"], /// 99% of request must complete under 100 miliseconds
  },
};

export default () => {
  const res = http.get("https://pizza.grafana.fun/");
  check(res, { 200: (r) => r.status === 200 });
  sleep(1);
};
