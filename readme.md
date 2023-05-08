<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Mon May 08 2023 12:14:38 GMT+0200 (Central European Summer Time)","n_ts_created":1683540878794} -->
# compile scss
1. cd ./scss
2. edit pico.scss, update the selector `.web_datepicker_v0_1` to the version number for example`.web_datepicker_v0_2`
3. install scss `npm install -g scss`
4. compile the css minified `sass pico.scss out.min.css --style compressed`
5. copy the compiled file `cp out.min.css ./../../localhost/.`
# import lib
```javascript
            import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.7/mod.js";
            import {
                f_o_js__notifier,
                O_state,
                f_f_o_js__timeoutbar_and_close_button
            } from "./client.module.js"

```
# create instance
```javascript
            let o_div_target = document.querySelector("#browser_notifier");
            let o_js__notifier = f_o_js__notifier(
                new O_state(
                    o_div_target,//o_element_html,
                )
            );
```
# throw create push notification
```javascript
            o_js__notifier.f_notify(
              `this is the most basic example of a notification,
              the length of the text will be detected and 
              the display time of the notification will be 
              automaticallly calculated with a reading speed of slow 
              60 words per minute (6 chars per word)`
            );
            o_js__notifier.f_notify(
              function(o_notification){
                return {
                  innerText: `instead of text we can also use 
                  a function (f_o_js) which gets rendered every frame (requestAnimationFrame), 
                  it will receive the instance o_notification as an parameter, we can use that to create a 
                  countdown for example, time left:${o_notification.n_milliseconds_to_live}ms`
                }
              }
            );
            o_js__notifier.f_notify(
              "as the second param we can use the milliseconds of the time a notification will show", 
              3333,
            );
            o_js__notifier.f_notify(
              function(o_notification){
                return {
                  a_o:[
                    {
                      innerText: `we can also extend the object which will get parsed to html with f_o_html_from_o_js`, 
                    },
                    {
                      s_tag: "button", 
                      innerText: "click me!",
                      onmousedown: function(){
                        alert("you clicked!")
                      },
                    }
                  ]

                }
              },
            );

            o_js__notifier.f_notify(
              f_f_o_js__timeoutbar_and_close_button("by default the livrary includes a notification template which includes a timeout bar and a button to close the notification"),
            );

```