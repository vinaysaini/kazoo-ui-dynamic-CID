(function(){function e(n){var r=[],i=n.firstChild;while(i){if(i.nodeName.match(/INPUT|SELECT|TEXTAREA/i))r.push({name:i.name,value:t(i)});else{var s=e(i);r=r.concat(s)}i=i.nextSibling}return r}function t(e){if(e.nodeName=="INPUT"){if(e.type.toLowerCase()=="radio"||e.type.toLowerCase()=="checkbox")return e.checked&&e.value!="on"?e.value:e.checked?!0:!1;if(!e.type.toLowerCase().match(/button|reset|submit|image/i))return e.value}else{if(e.nodeName=="TEXTAREA")return e.innerHTML;if(e.nodeName=="SELECT")return n(e)}return""}function n(e){var t=e.multiple;if(!t)return e.value;var n=[];for(var r=e.getElementsByTagName("option"),i=0,s=r.length;i<s;i++)r[i].selected&&n.push(r[i].value);return n}window.form2object=function(t,n){t=typeof t=="string"?document.getElementById(t):t,n=n||".";var r=e(t),i={},s={};for(var o=0;o<r.length;o++){var u=r[o].value,a=r[o].name,f=a.split(n),l=i;for(var c=0;c<f.length;c++){var h=f[c],p;if(h.indexOf("[]")>-1&&c==f.length-1)p=h.substr(0,h.indexOf("[")),l[p]||(l[p]=[]),l[p].push(u);else if(h.indexOf("[")>-1){p=h.substr(0,h.indexOf("["));var d=h.replace(/^[a-z]+\[|\]$/gi,"");s[p]||(s[p]={}),l[p]||(l[p]=[]),c==f.length-1?l[p].push(u):s[p][d]||(l[p].push({}),s[p][d]=l[p][l[p].length-1]),l=s[p][d]}else c<f.length-1?(l[h]||(l[h]={}),l=l[h]):l[h]=u}}return i},window.form2json=window.form2object})();