amplify.request.types["ajax-poll"]=function(e){e.frequency=e.frequency||0;var t="ajax-poll-"+e.resourceId;return amplify.request.define(t,"ajax",e),function(n){var r=n.success,i=$.extend({},n,{resourceId:t});i.success=function(){r.apply(this,arguments),setTimeout(function(){amplify.request(i)},e.frequency*1e3)},amplify.request(i)}};