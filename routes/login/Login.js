module.exports = {
    "module": "login",
    "channel": "login",
    "api":[
      {
        "method":"post",
        "route":"/login/:event"
      },
      {
        "method":"get",
        "route": "/login/:event"
      }
    ]
};
