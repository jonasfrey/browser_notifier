// import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.7/mod.js";
import {f_o_html_from_o_js} from "./f_o_html_from_o_js.module.js";

import {f_add_css} from "https://deno.land/x/f_add_css@0.3"

let o_state = {
    a_o_notification: [],
    o_js__a_o_notification: [],
    a_o_js_o_notification: []
};
let s_css = `
.a_o_notification .info,
.a_o_notification .success,
.a_o_notification .warning,
.a_o_notification .error,
.a_o_notification .validation {
    border: 1px solid;
    margin: 10px 0px;
    padding: 15px 10px 15px 50px;
    background-repeat: no-repeat;
    background-position: 10px center;
}
.a_o_notification .info {
    color: #00529B !important;
    background-color: #BDE5F8 !important;
    background-image: url('https://i.imgur.com/ilgqWuX.png');
}
.a_o_notification .success {
    color: #4F8A10 !important;
    background-color: #DFF2BF !important;
    background-image: url('https://i.imgur.com/Q9BGTuy.png');
}
.a_o_notification .warning {
    color: #9F6000 !important;
    background-color: #FEEFB3 !important;
    background-image: url('https://i.imgur.com/Z8q7ww7.png');
}
.a_o_notification .error{
    color: #D8000C !important;
    background-color: #FFBABA !important;
    background-image: url('https://i.imgur.com/GnyDvKN.png');
}
.a_o_notification .validation{
    color: #D63301 !important;
    background-color: #FFCCBA !important;
    background-image: url('https://i.imgur.com/GnyDvKN.png');
}
`;
f_add_css('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css')

class O_notification{
    constructor(
        f_o_js, 
        b_render,
        n_milliseconds_to_live = null,
        o_state 
    ){
        this.f_o_js =  f_o_js
        this.b_render = b_render
        this.n_milliseconds_to_live__constructor = n_milliseconds_to_live
        this.n_milliseconds_to_live = n_milliseconds_to_live
        this.n_ms_wind_perf_now = window.performance.now();
        this.n_ms_wind_perf_now__last = window.performance.now();
        this.n_ms_wind_perf_now__delta = window.performance.now();
        this.o_state = o_state
    }
}

let f_o_notification = function(
    f_o_js, 
    n_milliseconds_to_live = null
){

    let o_notification = new O_notification(
        f_o_js, 
        true, 
        1,//temporarily set 
        o_state
    );

    if(typeof f_o_js == 'string'){
        let s = f_o_js;
        f_o_js = function(o_notification){
            return {
                innerText: s
            }
        }
    }

    if(n_milliseconds_to_live == null){
        // slow reader 100 words per minute
        var n_chars_per_word = 6;  
        var n_seconds_per_word = 60/100;

        var n_words = f_o_html_from_o_js({
            f_o_js: f_o_js
        }).innerText.length / n_chars_per_word;
        var n_seconds_for_msg = n_words * n_seconds_per_word;
        // console.log(n_seconds_for_msg)
        n_seconds_for_msg = Math.max(2, n_seconds_for_msg)
        n_milliseconds_to_live = n_seconds_for_msg*1000
    }

    o_notification = new O_notification(
        f_o_js,
        true, 
        n_milliseconds_to_live,
        o_state
    );

    var o_js_o_notification = {
        f_o_js: function(){
            let o_js = f_o_js(o_notification)
            o_js.b_render = o_notification.b_render // we have to add the render boolean
            return o_js
        }
    }

    o_notification.f_render = function(){
        o_notification.n_animation_id = requestAnimationFrame(o_notification.f_render);

        o_notification.n_ms_wind_perf_now = window.performance.now();
        o_notification.n_ms_wind_perf_now__delta = o_notification.n_ms_wind_perf_now - o_notification.n_ms_wind_perf_now__last;

        o_notification.n_milliseconds_to_live -= o_notification.n_ms_wind_perf_now__delta;
        if(o_notification.n_milliseconds_to_live < 0){
            o_notification.b_render = false;
        }
        // o_js__a_o_notification._f_render();
        let n_nor = o_notification.n_milliseconds_to_live / o_notification.n_milliseconds_to_live__constructor
        if(n_nor < 0.){
            
            o_notification.b_render = false;
            if(typeof o_state.o_js__a_o_notification._f_render == 'function'){
                o_state.o_js__a_o_notification._f_render();
            }
        }
        if(typeof o_js_o_notification._f_render == 'function'){
            o_js_o_notification._f_render()
        }
        
        // console.log(o_js_o_notification)
        if(!o_notification.b_render){
            window.cancelAnimationFrame(o_notification.n_animation_id)
        }
        o_notification.n_ms_wind_perf_now__last = o_notification.n_ms_wind_perf_now;

    }


    f_o_html_from_o_js(o_js_o_notification);
    o_notification.n_animation_id = window.requestAnimationFrame(o_notification.f_render)
    
    o_state.a_o_js_o_notification.push(o_js_o_notification)

    if(typeof o_state.o_js__a_o_notification == 'function'){
        o_state.o_js__a_o_notification._f_render();
    }

    return o_notification;


    
}
let f_o_js__timeout_bar = function(o_notification){
    // console.log("asdf")
    return {
        style: [
            'position:absolute',
            'bottom:0', 
            'left: 0',
            (function(){
                let n_nor = o_notification.n_milliseconds_to_live / o_notification.n_milliseconds_to_live__constructor
            
                return `width:${n_nor*100}%`
            })(),
            'height:1rem',
            'background:red'
        ].join(";"),
    }
}
let f_o_js__close_button = function(o_notification){
    return {
        s_tag: "button", 
        innerHTML: "X", 
        onclick: function(){
            o_notification.n_milliseconds_to_live = -1;
            o_notification.b_render = false;
            o_notification.o_state.o_js__a_o_notification._f_render();
        }
    }
}
let f_f_o_js__timeoutbar_and_close_button = function(s_msg){
    let f_o_js = function(o_notification){
        return {
            b_render: o_notification.b_render,

            class: "o_notification",
            s_tag: "article",
            style:"position:relative",
            a_o: [
                {
                    innerText: s_msg
                },
                f_o_js__timeout_bar(o_notification),
                f_o_js__close_button(o_notification)
            ],

            onmouseenter: function(){
                window.cancelAnimationFrame(o_notification.n_animation_id)
            }, 
            onmouseleave: function(){
                o_notification.n_animation_id = window.requestAnimationFrame(o_notification.f_render)
                // o_notification.n_ms_wind_perf_now = window.performance.now();
                o_notification.n_ms_wind_perf_now__last = window.performance.now();
            }
        }

    }
    return f_o_js
}





let f_o_js__notifier = function(){
    console.log(o_state)
    o_state.o_js__a_o_notification = {
        f_o_js: function(){
            return {
                class: "a_o_notification",
                a_o: o_state.a_o_js_o_notification.map(
                        function(
                            o_js_o_notification
                        ){
                            // return {
                            //     f_o_html: function(){

                            //     }
                            // }
                            // console.log(o_js_o_notification)
                            // // return {}
                            // return o_js_o_notification.f_o_js()
                            return o_js_o_notification
                        }
                )
            }
        }
    }
    let o = {
        class: '',
        a_o:[
            o_state.o_js__a_o_notification,
        ],
    };

    f_add_css(
        `${import.meta.url.split('/').slice(0, -1).join("/")}/./pico_browser_notifier.scss.css`
    )
    f_add_css(
        `
        .a_o_notification{
            padding:1rem;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            display:flex;
            align-items:center;
            flex-direction:column;
        }
        .o_notification {
            margin: var(--block-spacing-vertical) 0;
            padding: var(--block-spacing-vertical) var(--block-spacing-horizontal);
            border-radius: var(--border-radius);
            background: var(--card-background-color);
            box-shadow: var(--card-box-shadow)
        }
        `
    )
    

    return o;

}
let f_o_notification__and_push_and_render = function(
    f_o_js, 
    n_milliseconds_to_live = null
){
    let o_notification = f_o_notification(
        f_o_js, 
        n_milliseconds_to_live
    );
    o_state.a_o_notification.push(o_notification);
    if(typeof o_state.o_js__a_o_notification._f_render == "function"){
        o_state.o_js__a_o_notification._f_render();
    }
    return o_notification
}

export {
    f_o_js__notifier, 
    o_state,
    f_o_js__close_button, 
    f_o_js__timeout_bar, 
    f_f_o_js__timeoutbar_and_close_button, 
    f_o_notification, 
    f_o_notification__and_push_and_render
}