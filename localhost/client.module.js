// import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.7/mod.js";
import {f_o_html_from_o_js} from "./f_o_html_from_o_js.module.js";

import {f_add_css} from "https://deno.land/x/f_add_css@0.3/mod.js"

let o_state = {
    a_o_notification: [],
    o_js__a_o_notification: [],
    a_o_js_o_notification: []
};

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
        n_seconds_for_msg = Math.max(3, n_seconds_for_msg)
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
let f_f_o_js__font_awesome_icon = function(
    s_msg, 
    s_class__icon = "fa-solid fa-circle-exclamation",
    s_class = "info"
){

    let f = function(
        o_notification
    ){
        if(s_class__icon.includes("spin")){
            //infinity timeout
            if(o_notification.n_milliseconds_to_live > 0){
                o_notification.n_milliseconds_to_live = o_notification.n_milliseconds_to_live__constructor;
            }
        }
        return {
            ...(function(){
                if(s_class__icon.includes("spin")== false){
                    return {
                        onmouseenter: function(){
                            window.cancelAnimationFrame(o_notification.n_animation_id)
                        }, 
                        onmouseleave: function(){
                            o_notification.n_animation_id = window.requestAnimationFrame(o_notification.f_render)
                            // o_notification.n_ms_wind_perf_now = window.performance.now();
                            o_notification.n_ms_wind_perf_now__last = window.performance.now();
                        },
                    }
                }
            })(),
            class: [
                'o_notification', 
                s_class
            ].join(" "), 
            style: [
                'display: flex',
                'flex-wrap:wrap',
                'flex-direction:row',
                'position:relative',
            ].join(";"),
            a_o:[
                {
                    style: 'padding-right: 0.5rem',
                    a_o: [
                        {
                            style: [
                                (function(){
                                    if(s_class__icon.includes("spin")){
                                        return `transform:rotate(${window.performance.now()*0.2}deg);`  
                                    }
                                })()
                            ].join(';'),
                            class: s_class__icon, 
                        }
                    ]
    
                },
                {
                    innerText: s_msg
                },
                {
                    b_render: s_class__icon.includes("spin") == false,
                    class: "fa-solid fa-xmark", 
                    // s_tag: "button", 
                    // innerHTML: "X", 
                    style: [
                        'position:absolute',
                        'top:5px', 
                        'right: 5px',
                        'font-size:0.9rem'
                    ].join(";"),
                    onmousedown: function(){
                        o_notification.n_milliseconds_to_live = -1;
                        o_notification.b_render = false;
                        o_notification.o_state.o_js__a_o_notification._f_render();
                    }
                }, 
                {
                    b_render: s_class__icon.includes("spin") == false,

                    style: [
                        'position:absolute',
                        'bottom:0', 
                        'left: 0',
                        (function(){
                            let n_nor = o_notification.n_milliseconds_to_live / o_notification.n_milliseconds_to_live__constructor
                        
                            return `width:${n_nor*100}%`
                        })(),
                        'height:5px',
                        `background:var(--color-foreground-${s_class})`
                    ].join(";"),
                }
            ]
        }
    }
    return f
}
let f_f_o_js__loading = function(s_text){
    return f_f_o_js__font_awesome_icon(
        s_text,
        "fa-solid fa-spinner spin", 
        "loading"
    )
}
let f_f_o_js__info = function(s_text){
    return f_f_o_js__font_awesome_icon(
        s_text,
        "fa-solid fa-circle-exclamation", 
        "info"
    )
}
let f_f_o_js__success = function(s_text){
    return f_f_o_js__font_awesome_icon(
        s_text,
        "fa-solid fa-circle-check", 
        "success"
    )
}
let f_f_o_js__warning = function(s_text){
    return f_f_o_js__font_awesome_icon(
        s_text,
        "fa-solid fa-triangle-exclamation", 
        "warning"
    )
}
let f_f_o_js__error = function(s_text){
    return f_f_o_js__font_awesome_icon(
        s_text,
        "fa-sharp fa-solid fa-circle-exclamation", 
        "error"
    )
}
let f_f_o_js__validation = function(s_text){
    return f_f_o_js__font_awesome_icon(
        s_text,
        "asdf", 
        "validation"
    )
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

let f_clear_all_notifications = function(){
    o_state.a_o_notification = [];
    o_state.a_o_js_o_notification = [];
    if(typeof o_state.o_js__a_o_notification._f_render == 'function'){
        o_state.o_js__a_o_notification._f_render()
    }
}



let f_o_js__notifier = function(){
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

    // f_add_css(
    //     `${import.meta.url.split('/').slice(0, -1).join("/")}/./pico_browser_notifier.scss.css`
    // )
    let o_s_state_o_color =  {
        loading: {
            s_color_foreground:'#00529B', 
            s_color_background:'#BDE5F8',
        },
        info: {
            s_color_foreground:'#00529B', 
            s_color_background:'#BDE5F8',
        },
        success: {
            s_color_foreground:'#4F8A10', 
            s_color_background:'#DFF2BF',
        },
        warning: {
            s_color_foreground:'#9F6000', 
            s_color_background:'#FEEFB3',
        },
        error: {
            s_color_foreground:'#D8000C', 
            s_color_background:'#FFBABA',
        },
        validation: {
            s_color_foreground:'#D63301', 
            s_color_background:'#FFCCBA',
        },
    }
    let s_css = (
        `
        .a_o_notification{
            pointer-events: none; 
            font-family: sans;
            font-size: 1.2rem;
        }
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
            pointer-events: auto;
            margin: var(--block-spacing-vertical) 0;
            padding: var(--block-spacing-vertical) var(--block-spacing-horizontal);
            border-radius: var(--border-radius);
            background: var(--card-background-color);
            box-shadow: var(--card-box-shadow)
        }
        :root{
            ${Object.keys(o_s_state_o_color).map(function(s){
                return `
                --color-foreground-${s}: ${o_s_state_o_color[s].s_color_foreground};
                --color-background-${s}: ${o_s_state_o_color[s].s_color_background};
                `
            }).join(';')}
        }
        ${Object.keys(o_s_state_o_color).map(function(s){
            return `
            .${s}{
                color: var(--color-foreground-${s}); 
                background: var(--color-background-${s}); 
            }
            `
        }).join("\n")}
        .o_notification{
            max-width:500px;
            border: 1px solid;
            border-radius: 2px;
            margin: 10px 0px;
            padding: 1rem;
        }
        `
    )
    f_add_css(s_css)

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
let f_clear_notification = function(o_notification){
    o_notification.n_milliseconds_to_live = -1;
    o_notification.b_render = false;
    // o_state.o_js__a_o_notification._f_render();
}
let f_restart_notification = function(o_notification){
    o_notification.n_milliseconds_to_live = o_notification.n_milliseconds_to_live__constructor;
    o_notification.b_render = true;
    o_notification.n_ms_wind_perf_now = window.performance.now();
    o_notification.n_ms_wind_perf_now__last = window.performance.now();
    o_notification.n_ms_wind_perf_now__delta = window.performance.now();
    o_notification.n_animation_id = requestAnimationFrame(o_notification.f_render)
    if(typeof o_state.o_js__a_o_notification._f_render == 'function'){
        o_state.o_js__a_o_notification._f_render();
    }
}
export {
    f_o_js__notifier, 
    o_state,
    f_o_js__close_button, 
    f_o_js__timeout_bar, 
    f_f_o_js__timeoutbar_and_close_button, 
    f_o_notification, 
    f_o_notification__and_push_and_render, 
    f_f_o_js__font_awesome_icon, 
    f_clear_all_notifications,
    f_f_o_js__loading,
    f_f_o_js__info,
    f_f_o_js__success,
    f_f_o_js__warning,
    f_f_o_js__error,
    f_f_o_js__validation, 
    f_clear_notification, 
    f_restart_notification
}