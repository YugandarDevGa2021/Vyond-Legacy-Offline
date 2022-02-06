const fUtil = require('../misc/file');
const stuff = require('./info');

function toAttrString(table) {
	return typeof (table) == 'object' ? Object.keys(table).filter(key => table[key] !== null).map(key =>
		`${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`).join('&') : table.replace(/"/g, "\\\"");
}
function toParamString(table) {
	return Object.keys(table).map(key =>
		`<param name="${key}" value="${toAttrString(table[key])}">`
	).join(' ');
}
function toObjectString(attrs, params, navbar) {
	return `<object id="obj" ${Object.keys(attrs).map(key =>
		`${key}="${attrs[key].replace(/"/g, "\\\"")}"`
	).join(' ')}>${toParamString(params)}</object>`;
}

module.exports = function (req, res, url) {
	if (req.method != 'GET') return;
	const query = url.query;

	var attrs, params, title;
	switch (url.pathname) {
		case '/charactercreator/': {
			title = 'The Character Creator from Vyond';
			attrs = {	
				data: process.env.SWF_URL + '/cc_browser.swf', // data: 'cc.swf',
				type: 'application/x-shockwave-flash', id: 'char_creator', width: '960', height: '1200',
			};
			params = {
				flashvars: {
					'apiserver': '/', 'storePath': process.env.STORE_URL + '/<store>',
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>',
					'themeId': 'business', 'ut': 60, 'appCode': 'go', 'page': '', 'siteId': 'go',
					'm_mode': 'school', 'isLogin': 'Y', 'isEmbed': 1, 'ctc': 'go', 'tlang': 'en_US',
				},
				allowScriptAccess: 'always',
				movie: process.env.SWF_URL + '/cc.swf', // 'http://localhost/cc.swf'
			};
			break;
		}
		default:
			return;
	}
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	Object.assign(params.flashvars, query);
	res.end(
	`<html><head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link rel="dns-prefetch" href="https://d2bm7x1jqouzel.cloudfront.net">
<link rel="dns-prefetch" href="//d3v4eglovri8yt.cloudfront.net">
<script>document.title='${title}'</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="The Character Creator from Vyond - Create a character online with Vyond.">
<meta property="og:site_name" content="Vyond">
<meta property="fb:app_id" content="177116303202">
<meta name="google-site-verification" content="K_niiTfCVi72gwvxK00O4NjsVybMutMUnc-ZnN6HUuA">
<link rel="canonical" href="https://vyondremastered1.herokuapp.com/yourvideos">
<link href="https://josephcrosmanplays532.github.io/fonts/1/sailec.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/css/common_combined.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/css/cc.css.gz.css" rel="stylesheet" type="text/css">
<!--[if lt IE 9]>
<style text="text/css">
.top-nav.collapse {height: auto;overflow: visible;}
</style>
<![endif]-->
<script type="text/javascript" src="https://pi.pardot.com/pd.js"></script><script type="text/javascript" src="https://pi.pardot.com/pd.js"></script><script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script><script type="text/javascript" async="" src="https://sjs.bizographics.com/insight.min.js"></script><script type="text/javascript" async="" src="//www.googleadservices.com/pagead/conversion_async.js"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script><script src="https://connect.facebook.net/signals/config/784667875001149?v=2.9.15&amp;r=stable" async=""></script><script async="" src="//connect.facebook.net/en_US/fbevents.js"></script><script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script><script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script><script type="text/javascript" src="https://pi.pardot.com/pd.js"></script><script type="text/javascript" async="" src="//munchkin.marketo.net/155/munchkin.js"></script><script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script><script src="https://connect.facebook.net/signals/config/784667875001149?v=2.9.15&amp;r=stable" async=""></script><script async="" src="//connect.facebook.net/en_US/fbevents.js"></script><script type="text/javascript" async="" src="https://sjs.bizographics.com/insight.min.js"></script><script type="text/javascript" async="" src="//www.googleadservices.com/pagead/conversion_async.js"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script><script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script><script>
var srv_tz_os = -4, view_name = "go", user_cookie_name = "u_info";
var user_role = 11;
</script>
<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/common_combined.js.gz.js"></script>
<script type="text/javascript" src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/../po/goserver_js-en_US.json.gz.json"></script>
<script type="text/javascript">
var I18N_LANG = 'en_US';
var GT = new Gettext({'locale_data': json_locale_data});
</script>
<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/sessionChecker.js.gz.js"></script>
<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/amplitude/go_amp.js.gz.js"></script>
<!-- Vyond Cookie Consent -->
<script>(function(v,y,o,n){v[n]=v[n]||[];
var f=y.getElementsByTagName(o)[0],d=y.createElement(o);
d.type='text/javascript';d.async=true;d.src=
'https://ga.vyond.com/ajax/cookie_policy';
f.parentNode.insertBefore(d,f);
})(window,document,'script','_vyccq');</script>
<!-- End Vyond Cookie Consent -->
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXV7MD');
dataLayer.push({"userId":"0TBAAga2Mn6g"});
</script>
<!-- Google Tag Manager -->
<script>
</script>
<script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script><script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/956549168/?random=1577875084777&amp;cv=9&amp;fst=1577875084777&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;eid=376635470&amp;u_h=900&amp;u_w=1600&amp;u_ah=860&amp;u_aw=1600&amp;u_cd=24&amp;u_his=2&amp;u_tz=-360&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=6&amp;gtm=2wgc61&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Ftvy4gv.000webhostapp.com%2FThe%2520Character%2520Creator%2520from%2520Vyond%2520-%2520Make%2520a%2520Character%2520Online%2520cw.html&amp;tiba=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script><script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=109029277&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Ftvy4gv.000webhostapp.com%2FThe%2520Character%2520Creator%2520from%2520Vyond%2520-%2520Make%2520a%2520Character%2520Online%2520cw.html&amp;referrer="></script><script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script><script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script><script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/956549168/?random=1580006012218&amp;cv=9&amp;fst=1580006012218&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;u_h=900&amp;u_w=1600&amp;u_ah=860&amp;u_aw=1600&amp;u_cd=24&amp;u_his=2&amp;u_tz=-360&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=6&amp;gtm=2wg1f1&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Fkennystuff001001001.000webhostapp.com%2Foldvyondstuff%2Fcharactercreator&amp;tiba=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script><script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fkennystuff001001001.000webhostapp.com%2Foldvyondstuff%2Fcharactercreator&amp;referrer="></script><script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fkennystuff001001001.000webhostapp.com%2Foldvyondstuff%2Fcharactercreator&amp;referrer="></script></head>
<body class="en_US has-user" contenteditable="false">
<script type="text/javascript">
if (self !== top) {
            jQuery('body').hide();
    }
</script>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TXV7MD" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<script type="text/javascript">
        jQuery.extend(CCStandaloneBannerAdUI, {"actionshopSWF":"https:\/\/d3v4eglovri8yt.cloudfront.net\/animation\/66453a3ba2cc5e1b\/actionshop.swf","apiserver":"http:\/\/ga.vyond.com\/","clientThemePath":"https:\/\/d3v4eglovri8yt.cloudfront.net\/static\/55910a7cd204c37c\/<client_theme>","userId":"0TBAAga2Mn6g"});
</script>
<div class="page-container">
<div class="site-header">
    <div class="navbar site-nav site-nav--legacy" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="/yourvideos" title="Vyond">
                      <img alt="Vyond" src="/pages/html/logo.png">
                  </a>
            </div>
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav navbar-right">
<li class="dropdown">
     <a class="dropdown-toggle" href="https://josephcrosmanplays532.github.io/help" data-toggle="dropdown">Help<span class="dropdown-caret"></span></a>
    <ul class="dropdown-menu dropdown-menu-help">

        <li>
            <a href="#" onclick="zE.activate({hideOnClose: true});amplitudeTrackCtaHelp('quick_search');return false;">Quick Search</a>
        </li>
        <li>
            <a href="https://josephcrosmanplays532.github.io/help" onclick="amplitudeTrackCtaHelp('help_center');" target="_blank">Help Center</a>
        </li>
        <li>
            <a href="https://josephcrosmanplays532.github.io/whatsnew" onclick="amplitudeTrackCtaHelp('whats_new');" target="_blank">What’s New</a>
        </li>
    </ul>
</li>

         <li>
                        <a class="hidden-sm hidden-md hidden-lg" href="/pages/html/ga.vyond.com/videomaker.html">Make a Video</a>
                        <span class="site-nav-btn hidden-xs"><a class="btn btn-orange" href="/pages/html/ga.vyond.com/videomaker.html">Make a Video</a></span>
                    </li>
<li class="dropdown">
    <a class="dropdown-toggle" href="/account" data-toggle="dropdown" aria-expanded="false">
        <span class="hidden-sm hidden-md hidden-lg">Your Account</span>
        <div class="site-nav__profile-image">
            <div class="badge-circle">U</div>
        </div><span class="dropdown-caret"></span>
    </a>
    <ul class="dropdown-menu dropdown-menu-user">
        <li class="dropdown-user-profile">
            <div class="dropdown-user-profile__display-name">
                User 1            </div>
            <div class="dropdown-user-profile__status">
                Free Trial | <a href="https://www.vyond.com/pricing">Upgrade now</a>            </div>
        </li>
        <li class="divider"></li>
        <li><a href="https://app.vyond.com/v2/profile">Profile Settings</a></li>
        <li><a href="https://app.vyond.com/v2/users/list">Users</a></li>
        <li><a href="https://app.vyond.com/v2/security">Security</a></li>
        <li><a href="https://app.vyond.com/v2/subscription">Subscription</a></li>
        <li class="divider"></li>
        <li><a href="https://vyondstudio.herokuapp.com/video/list" onclick="amplitudeTrackSwitchVideoMaker('Go to Vyond Studio')">Go to Vyond Studio</a></li>
        <li class="divider"></li>
        <li><a class="gtm-logout" href="https://www.vyond.com/">Log Out</a></li>
    </ul>
</li>

                </ul>
            </div>
    </div>
</div>

<div class="container container-cc">


        <ul class="breadcrumb">
            <li><a href="/pages/html/ga.vyond.com/videomaker.html">Make a video</a></li>
            <li class="active">Whiteboard Animation Characters</li>
        </ul>

        <p>Browse characters already available in that theme and use them as a starting point to create new custom characters.</p>

<div id="ccbrowser-container" align="center">${toObjectString(attrs, params)}</div>

<script>
jQuery('#ccbrowser-container').flash({
    id: "ccbrowser",
    swf: "https://josephcrosmanplays532.github.io/animation/cce25167cb1d3404/cc_browser.swf",
    height: 1200,
    width: 960,

    align: "middle",
    allowScriptAccess: "always",
    allowFullScreen: "true",
    wmode: "transparent",

    hasVersion: "10.3",

    flashvars: ${JSON.stringify(params.flashvars)}

</script>
</div>

<footer class="site-footer">
    <div class="container">
        Vyond™ is a trademark of GoAnimate. Inc. ©2018 GoAnimate. Inc. <a href="https://www.vyond.com/terms">Terms of Service</a> | <a href="https://www.vyond.com/privacy">Privacy Policy</a> | <a href="https://www.vyond.com/cookies">Cookies Policy</a>
    </div>

</footer>


<div id="studio_container" style="display: none;">
    <div id="studio_holder"><!-- Full Screen Studio -->
        <div style="top: 50%; position: relative;">
            You can't use GoAnimate because Flash might be disabled. <a href="https://web.archive.org/web/20191022104022/https://get.adobe.com/flashplayer/">Enable Flash</a>.
        </div>
    </div>
</div>



</body>
</html>`
		);
	return true;
}
