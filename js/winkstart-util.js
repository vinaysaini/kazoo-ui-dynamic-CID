(function(e,t,n){e.is_password_valid=function(t,n){var r={standard:"The password must contain at least 6 characters and include a letter and a number.",strong:"The password must contain at least 8 characters including a non-capitalized letter, a capitalized letter, a number and a special character (!%$...)"},n=n||"standard",i=t.match(e.get_password_regex(n));return i&&i[0]?!0:(e.alert("Your password is not valid<br/>"+r[n]||""),!1)},e.get_password_regex=function(e){var t={standard:/(?=^.{6,}$)(?=.*\d)((?=.*[a-z])|(?=.*[A-Z])).*$/g,strong:/(?=^.{8,}$)(?![.\n])(?=.*[\!\@\#\$\%\^\&\*\-\_\(\)\[\]\=\+\^])(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).*$/g};return t[e||"standard"]},e.log=function(t){e.config.debug&&console.log(t)},e.cleanForm=function(){var e=0;n("label").each(function(){n(this).width()>e&&(e=n(this).width())}),n("label").width(e)},e.loadFormHelper=function(e){var t="js/tmpl_snippets/"+e+".html";n.get(t,function(e){n("body").append(e)})},e.confirm=function(t,r,i){var s,o,u={},a=!1;return s=n('<div class="center"><div class="alert_img confirm_alert"></div><div class="alert_text_wrapper info_alert"><span>'+t+'</span></div><div class="clear"/><div class="alert_buttons_wrapper"><button id="confirm_button" class="btn success confirm_button">'+_t("config","OK")+'</button><button id="cancel_button" class="btn danger confirm_button">'+_t("config","CANCEL")+"</button></div></div>"),u.title=_t("config","please_confirm_title"),u.maxWidth="400px",u.width="400px",u.onClose=function(){a?typeof r=="function"&&r():typeof i=="function"&&i()},o=e.dialog(s,u),n("#confirm_button",s).click(function(){a=!0,o.dialog("close")}),n("#cancel_button",s).click(function(){o.dialog("close")}),o},e.charges=function(t,r,i){var s,o,u=!1,a=typeof t.activation_charges?null:t.activation_charges,f=typeof t.activation_charges_description=="undefined"?null:t.activation_charges_description.replace("_"," "),l,c,h={title:_t("config","charges_summary_title"),maxWidth:"auto",width:"auto",onClose:function(){u?typeof r=="function"&&r():typeof i=="function"&&i()}},p=function(e){var t=0,r=e.activation_charges_description,i=[];n.each(e,function(e,r){e!="activation_charges"&&e!="activation_charges_description"&&n.each(r,function(e,n){var r=n.single_discount_rate+n.cumulative_discount_rate*n.cumulative_discount,s=parseFloat(n.rate*n.quantity-r||0).toFixed(2);i.push({service:e.toUpperCase().replace("_"," "),rate:n.rate||0,quantity:n.quantity||0,discount:r>0?"- $"+parseFloat(r).toFixed(2):"",monthlyCharges:s<0?"- $"+Math.abs(s).toFixed(2):"$"+s}),t+=parseFloat(s)})});var s=function(e,t){return parseFloat(e.monthlyCharges)>=parseFloat(t.monthlyCharges)?-1:1};return i.sort(s),i};return l=p(t)[0],c=_t("config","content_charges"),a!==null&&f!==null&&(a===0?c=_t("config","there_is_no")+f+". ":c=_t("config","you_will_pay")+a+_t("config","one_time")+f+". "),s=n('<div class="center"><div class="alert_img confirm_alert"></div><div class="alert_text_wrapper info_alert charges-info">'+c+'</div><div class="alert_text_wrapper info_alert"><table class="charges-summary"><thead><tr><th>'+_t("config","service")+"</th><th>"+_t("config","rate")+"</th><th></th><th>"+_t("config","quantity")+"</th><th>"+_t("config","discount")+"</th><th>"+_t("config","monthly_charges")+"</th></tr></thead><tbody><tr><td>"+l.service+"</td><td>$"+l.rate+"</td><td>X</td><td>"+l.quantity+"</td><td>"+l.discount+"</td><td>$"+l.monthlyCharges+'</td></tr></tbody></table></div><div class="alert_text_wrapper info_alert charges-info">'+_t("config","press_OK_or_Cancel")+'</div><div class="clear"/><div class="alert_buttons_wrapper"><button id="confirm_button" class="btn success confirm_button">'+_t("config","OK")+'</button><button id="cancel_button" class="btn danger confirm_button">'+_t("config","CANCEL")+"</button></div></div>"),o=e.dialog(s,h),n("#confirm_button",s).click(function(){u=!0,o.dialog("close")}),n("#cancel_button",s).click(function(){o.dialog("close")}),o},e.alert=function(t,r,i){var s,o,u={},a=t.toLowerCase(),f={};return r&&r.data&&(f=e.print_r(r.data)),a=="error"?(s=n('<div class="center"><div class="alert_img error_alert"></div><div class="alert_text_wrapper error_alert"><span>'+r+'</span></div><div class="clear"/><div class="alert_buttons_wrapper"><button class="btn primary alert_button">'+_t("config","CLOSE")+"</button></div></div>"),r&&r.data&&(s=n('<div class="center"><div class="alert_img error_alert"></div><div class="alert_text_wrapper error_alert"><span><p>'+r.text+"<p>"+'<p><button class="btn small danger json">Show Errors</button>'+'</p><p style="display:none" class="json_error"></p>'+'</span></div><div class="clear"/><div class="alert_buttons_wrapper"><button class="btn primary alert_button">'+_t("config","CLOSE")+"</button></div></div>"))):a=="info"?s=n('<div class="center"><div class="alert_img info_alert"></div><div class="alert_text_wrapper info_alert"><span>'+r+'</span></div><div class="clear"/><div class="alert_buttons_wrapper"><button class="btn primary alert_button">'+_t("config","CLOSE")+"</button></div></div>"):(i=r,r=t,a=_t("config","WARNING"),s=n('<div class="center"><div class="alert_img warning_alert"></div><div class="alert_text_wrapper warning_alert"><span>'+r+'</span></div><div class="clear"/><div class="alert_buttons_wrapper"><button class="btn primary alert_button">'+_t("config","CLOSE")+"</button></div></div>")),u.title=a.charAt(0).toUpperCase()+a.slice(1),u.maxWidth="600px",u.onClose=function(){typeof i=="function"&&i()},o=e.dialog(s,u),n(".btn.alert_button",s).click(function(){o.dialog("close")}),r&&r.data&&(n(".json_error",o).css({cursor:"pointer"}).append(f),n(".json",o).css("min-width",0).click(function(e){e.preventDefault(),n(".json_error",o).toggle()})),o},e.dialog=function(e,t){var r=n(document.createElement("div")).html(e);n("input",e).keypress(function(e){if(e.keyCode==13)return e.preventDefault(),!1});var i={show:{effect:"fade",duration:200},hide:{effect:"fade",duration:200},zIndex:2e4,close:function(){n("div.popover").remove(),n(r).dialog("destroy"),n(r).remove();if(typeof t.onClose=="function")try{t.onClose()}catch(e){console&&e.message&&e.stack&&(console.log(e.message),console.log(e.stack))}}},s={width:"auto",modal:!0,resizable:!1};return t=n.extend(s,t||{},i),n(r).dialog(t),n(r)},e.random_string=function(e,t){var n=t||"0123456789abcdefghijklmnopqrstuvwxyz",r=n.length,i="";for(var s=e;s>0;s--)i+=n.charAt(Math.floor(Math.random()*n.length));return i},e.friendly_timestamp=function(e){var t=this,e=e,n="-";if(e){var r=new Date((e-62167219200)*1e3),i=r.getMonth()+1,s=r.getFullYear(),o=r.getDate(),u=i+"/"+o+"/"+s,a=r.toLocaleTimeString();n=u+" "+a}return n},e.friendly_seconds=function(e,t){var e=parseFloat(e);return seconds=e%60,minutes=(e-seconds)/60%60,hours=Math.floor((e-seconds)/3600),t=t||"numbers",hours<10&&t=="numbers"&&(hours="0"+hours),minutes<10&&(minutes="0"+minutes),seconds<10&&(seconds="0"+seconds),t=="verbose"?e=hours+" hours "+minutes+" minutes and "+seconds+" seconds":e=hours+":"+minutes+":"+seconds,e},e.link_form=function(e){n("input",e).bind("change.link keyup.link focus.link",function(){var t=n(this),r=t.attr("name"),i=t.attr("type"),s=t.val(),o=t.attr("id"),u=n('input[name="'+r+'"]',e);u.size()>1?i=="checkbox"?(u=u.filter("[value="+s+"]"),t.attr("checked")?u.attr("checked","checked"):u.removeAttr("checked")):n.each(u,function(e,t){var r=n(t);r.attr("id")!==o&&r.val(s)}):t.unbind(".link")})},e.tabs=function(t,r,i){i?(n(".btn",t).removeClass("activate"),n(".advanced",t).addClass("activate")):e.config.advancedView?(n(".btn",t).removeClass("activate"),n(".advanced",t).addClass("activate")):r.hide("blind"),n("li",r).length<2&&t.hide(),n(".basic",t).click(function(){n(this).hasClass("activate")||(n(".btn",t).removeClass("activate"),n(this).addClass("activate"),n("li:first-child > a",r).trigger("click"),r.hide("blind"))}),n(".advanced",t).click(function(){n(this).hasClass("activate")||(n(".btn",t).removeClass("activate"),n(this).addClass("activate"),r.show("blind"))})},e.accordion=function(e,t){function r(e,r){var i=n("#"+e.data("toggle"));r?(e.addClass("activated"),t!=0&&e.html(_t("config","hide")),i.slideDown()):(e.removeClass("activated"),t!=0&&e.html(_t("config","show")),i.slideUp())}n(".toggled",e).hide(),n(".toggle-all",e).click(function(t){var i=n(this);t.preventDefault(),n(".toggle",e).each(function(e){r(n(this),!i.hasClass("activate"))}),i.hasClass("activate")?(i.removeClass("activate"),i.html(_t("config","show_all"))):(i.addClass("activate"),i.html(_t("config","hide_all")))}),n(".toggle",e).click(function(e){var t=n(this);e.preventDefault(),r(t,!t.hasClass("activated"))})},e.chart=function(e,t,r,i){return this.target=e,this.data=t,this.options={seriesDefaults:{renderer:jQuery.jqplot.PieRenderer,rendererOptions:{showDataLabels:!0,dataLabels:"value",startAngle:-90,padding:10}},grid:{background:"transparent",drawBorder:!1,shadow:!1},gridPadding:{top:15,right:0,bottom:0,left:0},legend:{show:!0,location:"e",background:"transparent",border:"none",fontFamily:"Helvetica",fontSize:"8pt"}},n.extend(!0,this.options,r),i&&(this.type=i),this.init()},e.chart.prototype={init:function(){var e=this;e.loadChart(e)},loadChart:function(e){switch(e.type){case"line":case"gauge":default:e.chart=jQuery.jqplot(e.target,[e.data],e.options)}},setData:function(e,t){t?this.data.push(e):this.data=e},setOptions:function(e,t){t?n.extend(!0,this.options,e):this.options=e},refresh:function(){this.chart=jQuery.jqplot(THIS.target,[THIS.data],THIS.options)}},e.print_r=function(e){var t=function(e,n){var r="",i="";n||(n=0);for(var s=0;s<n+1;s++)i+="    ";if(typeof e=="object")for(var o in e){var u=e[o];typeof u=="object"?(r+=i+"'"+o+"': { \n",r+=t(u,n+1),r+=i+"}\n"):r+=i+"'"+o+"': \""+u+'"\n'}else r="===>"+e+"<===("+typeof e+")";return r},n="";return n+="<pre style='text-align:left;'>{\n",n+=t(e),n+="\n}</pre>",n},e.jsonToString=function(e){return JSON.stringify(e)},e.parallel=function(e,t){async.parallel(e,function(e,n){t(e,n)})}})(window.winkstart=window.winkstart||{},window.amplify=window.amplify||{},jQuery);