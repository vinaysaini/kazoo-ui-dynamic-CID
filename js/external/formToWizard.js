(function(e){e.fn.formToWizard=function(t){function o(t){var n="step"+t;e("#"+n+"commands").append("<a href='javascript:void(0);' id='"+n+"Prev' class='prev fancy_button blue'>< Back</a>"),e("#"+n+"Prev").bind("click",function(r){e("#"+n).hide(),e("#step"+(t-1)).show(),e(s).hide(),a(t-1)})}function u(t){var n="step"+t;e("#"+n+"commands").append("<a href='javascript:void(0);' id='"+n+"Next' class='next fancy_button blue'>Next ></a>")}function a(t){e("#steps li").removeClass("current"),e("#stepDesc"+t).addClass("current")}t=e.extend({submitButton:""},t);var n=this,r=e(n).find("fieldset"),i=r.size(),s="#"+t.submitButton;e(s).hide(),e(n).before("<ul id='steps'></ul>"),r.each(function(t){e(this).wrap("<div id='step"+t+"'></div>"),e(this).append("<p id='step"+t+"commands'></p>");var n=e(this).find("legend").html();e("#steps").append("<li id='stepDesc"+t+"'>Step "+(t+1)+"<span>"+n+"</span></li>"),t==0?(u(t),a(t)):t==i-1?(e("#step"+t).hide(),o(t)):(e("#step"+t).hide(),o(t),u(t))})}})(jQuery);