<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Wed May 10 2023 16:55:37 GMT+0200 (Central European Summer Time)","n_ts_created":1683730537731} -->
# import lib
```javascript
            // import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.7/mod.js";
            import {f_o_html_from_o_js} from "./f_o_html_from_o_js.module.js";
            import {
                f_clear_all_notifications, 
                f_o_js__notifier,
                o_state as o_state__o_js_notifier,
                f_f_o_js__timeoutbar_and_close_button, 
                f_o_notification, 
                f_o_notification__and_push_and_render, 
                f_f_o_js__font_awesome_icon,
                f_f_o_js__loading,
                f_f_o_js__info,
                f_f_o_js__success,
                f_f_o_js__warning,
                f_f_o_js__error,
                f_f_o_js__validation
            } from "./client.module.js"

              window.o_state = o_state__o_js_notifier
```
# create instance
```javascript
            let o_js__notifier = f_o_js__notifier(
              o_state__o_js_notifier
            );
            let o_html_o_js__notifier = f_o_html_from_o_js(o_js__notifier);
            let o_div_target = document.querySelector("#browser_notifier");
            o_div_target.appendChild(o_html_o_js__notifier);
```
# manually push and render notifications
```javascript
            let o_notification__1 = f_o_notification('test manual');
            o_state__o_js_notifier.a_o_notification.push(o_notification__1);
            o_state__o_js_notifier.o_js__a_o_notification._f_render();
```
# automatically push and render notifications
```javascript
            let o_notification__2 = f_o_notification__and_push_and_render('test auto');

```
# manipulate existing notifications
```javascript
let o_notification__3 = f_o_notification__and_push_and_render('this text will be updated from outside');
console.log(o_notification__3)
o_notification__3.f_o_js = function(o_notification){
  return {
    innerText: `now it is a new text`
  }
}
o_state__o_js_notifier.o_js__a_o_notification._f_render();

```
# throw create push notification
```javascript
f_o_notification__and_push_and_render(
  `this is the most basic example of a notification,
              the length of the text will be detected and 
              the display time of the notification will be 
              automaticallly calculated with a reading speed of slow 
              60 words per minute (6 chars per word)`

);
f_o_notification__and_push_and_render(
              function(o_notification){
                return {
                  innerText: `instead of text we can also use 
                  a function (f_o_js) which gets rendered every frame (requestAnimationFrame), 
                  it will receive the instance o_notification as an parameter, we can use that to create a 
                  countdown for example, time left:${o_notification.n_milliseconds_to_live}ms`
                }
              }
            );
            f_o_notification__and_push_and_render(
              "as the second param we can use the milliseconds of the time a notification will show", 
              3333,
            );
            f_o_notification__and_push_and_render(
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

            let o_notification_4 = f_o_notification__and_push_and_render(
              f_f_o_js__timeoutbar_and_close_button("by default the livrary includes a notification template which includes a timeout bar and a button to close the notification"),
            );
            window.onclick = function(){
              o_notification_4.n_milliseconds_to_live = o_notification_4.n_milliseconds_to_live__constructor;
            }
            window.setTimeout(function(){
              //clear all notifications
              f_clear_all_notifications();
              let o_notification_5 = f_o_notification__and_push_and_render(
                f_f_o_js__font_awesome_icon("lol asdf asdf asdf asdf asdf asdf"),
                20000
              );

              let o_notification_loading = f_o_notification__and_push_and_render(
                f_f_o_js__loading('this is loading'), 
                10000
              )
              window.setTimeout(function(){
                o_notification_loading = f_o_notification__and_push_and_render(
                f_f_o_js__error('could not load'), 
                10000
              )
              },2000)
              f_o_notification__and_push_and_render(
                f_f_o_js__info('this is info'), 
                10000
              )
              f_o_notification__and_push_and_render(
                f_f_o_js__success('this is success'), 
                10000
              )
              f_o_notification__and_push_and_render(
                f_f_o_js__warning('this is warning'), 
                10000
              )
              f_o_notification__and_push_and_render(
                f_f_o_js__error('this is error'), 
                10000
              )
              f_o_notification__and_push_and_render(
                f_f_o_js__validation('this is validation'), 
                10000
              )
              f_o_notification__and_push_and_render(
                f_f_o_js__font_awesome_icon('this is custom', 'fa-solid fa-poo', 'warning'), 
                10000
              )

              let o_n = f_o_notification__and_push_and_render(
                f_f_o_js__info('Feuerfische (Pteroinae), oft auch Rotfeuerfische, seltener Löwenfische (von der englischen Bezeichnung lionfish) genannt, sind Bewohner der Korallenriffe des tropischen Indopazifik und des Roten Meeres aus der Unterordnung der Drachenkopfverwandten (Scorpaenoidei). Sie sind durch ihre großen, fächerförmigen Brustflossen mit langen, fast freistehenden Brustflossenstacheln sehr auffällig. Die Färbung der Feuerfische wird von einem dichten Muster von rötlichen bzw. bräunlichen und weißen Querstreifen bestimmt und dient mit der konturenauflösenden Gestalt der Fische zur Tarnung. Sie sind kaum zu erkennen, wenn sie zwischen Acroporen, Bäumchen-Weichkorallen, Haarsternen, Gorgonenhäuptern, Federwürmern oder Kalkröhrenwürmern stehen.[1] Feuerfische werden je nach Art 12 bis über 40 Zentimeter lang. Der 1816 von G. Cuvier geprägte Name (< πτερόεις) bedeutet „der Geflügelte, Befiederte“ (wird aber meist als weiblich aufgefasst).'), 
              )
              window.onclick = function(){
                o_n.n_milliseconds_to_live = o_n.n_milliseconds_to_live__constructor;
              }
            },1000)

```