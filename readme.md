```javascript
    import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.7/mod.js";

    import {
        f_o_js__notifier,
        O_state,
    } from "./client.module.js"// https://deno.land/x/modulename@versiontag/mod.js

    let o_div_target = document.querySelector("#browser_notifier");
    let o_js__notifier = f_o_js__notifier(
        new O_state(
            o_div_target,//o_element_html,
        )
    );
    o_js__notifier.f_notify(
        'This notification will remain 5000 ms => 5000/1000 = 5 seconds',
        'success', 
        5000
    );
    o_js__notifier.f_notify(
        'This text will show a bit longer because it also takes a bit longer to read longer text. The timeout can of course also be set up by passing a parameter to the f_notify, it is in milliseconds.',
        'success'
    );
    o_js__notifier.f_notify(
        'If you hover over me i will stop with the timeout. As soon as you leave me with the mouse cursor i will continue time out.',
        'success'
    );
    o_js__notifier.f_notify(
        f_o_html_from_o_js(
        {
            a_o:[
            {
                s_tag: "h2", 
                innerText: new Date().toString()
            }, 
            {
                s_tag: "button",
                innerText: "Yes"
            }, 
            {
                s_tag: "button",
                innerText: "No!"
            }
            ]
        }
        ).outerHTML, 
        'success'
    );

```