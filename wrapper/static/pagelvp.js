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
	case '/videos/': {
		let presave = query.movieId && query.movieId.startsWith('m') ? query.movieId :
				`m-${fUtil[query.noAutosave ? 'getNextFileId' : 'fillNextFileId']('movie-', '.xml')}`;
		title = 'Your Animation - Vyond';
		attrs = {
				data: process.env.SWF_URL + '/player.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
                                        'bs': 'adam', 'nextUrl': '/yourvideos', 'movieId': '', 'ut': '60',
					'isWide': '1', 'presaveId': presave, 'page': '', 
					'apiserver': '/', 'ctc': 'go', 'tlang': 'en_US',
					'autostart': '1', 'appCode': 'go', 'isEmbed': '1',
					'storePath': process.env.STORE_URL + '/<store>', 
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>',
					'animationPath': process.env.SWF_URL + '/',
				},

				allowScriptAccess: 'always',
				allowFullScreen: 'true'
			};
			break;
		}
		default:
			return;
	}
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	Object.assign(params.flashvars, query);
	res.end(
	`<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link rel="dns-prefetch" href="//josephcrosmanplays532.github.io/">

<script>document.title='${title}'</script>

<meta name="viewport" content="width=device-width, initial-scale=1">

<meta name="title" content="Test - Joseph Animate 2021">
<meta name="description" content="Watch the video: Test by Joseph Animate 2021 on GoAnimate.">
<link rel="canonical" href="https://vyond2018.herokuapp.com/videos/?movieId=m-16">
<link rel="image_src" href="/pages/html/13801618.jpg">
<link rel="video_src" href="https://josephcrosmanplays532.github.io/player/swf/m-16">
<meta name="video_height" content="354">
<meta name="video_width" content="550">
<meta name="video_type" content="application/x-shockwave-flash">
<meta name="medium" content="video">

<meta property="og:type" content="article">
<meta property="og:title" content="election">
<meta property="og:description" content="">
<meta property="og:url" content="https://vyond2018.herokuapp.com/videos/?movieId=m-16">
<meta property="og:image" content="https://s3.amazonaws.com/fs.goanimate.com/files/thumbnails/movie/876/5682876/13801618L.jpg">

<meta property="og:video" content="https://josephcrosmanplays532.github.io/player/swf/m-16">
<meta property="og:video:height" content="354">
<meta property="og:video:width" content="550">
<meta property="og:video:type" content="application/x-shockwave-flash">

<link rel="alternate" type="application/json+oembed" href="https://josephcrosmanplays532.github.io/api/oembed?url=http%3A%2F%2Fgoanimate.com%2Fvideos%2F0-1BF1m2VKQA&amp;format=json">
<link rel="alternate" type="text/xml+oembed" href="https://josephcrosmanplays532.github.io/api/oembed?url=http%3A%2F%2Fgoanimate.com%2Fvideos%2F0-1BF1m2VKQA&amp;format=xml">

<meta name="twitter:card" content="player">
<meta name="twitter:title" content="Test - Joseph Animate 2021">
<meta name="twitter:description" content="Watch the video: Test by Joseph Animate 2021 on GoAnimate.">
<meta name="twitter:image:src" content="https://s3.amazonaws.com/fs.goanimate.com/files/thumbnails/movie/876/5682876/13801618L.jpg">
<meta name="twitter:player" content="https://josephcrosmanplays532.github.io/player/embed/m-16">
<meta name="twitter:player:height" content="349">
<meta name="twitter:player:width" content="620">

<meta property="og:site_name" content="GoAnimate">
<meta property="fb:app_id" content="177116303202">

<meta name="google-site-verification" content="K_niiTfCVi72gwvxK00O4NjsVybMutMUnc-ZnN6HUuA">

<link rel="alternate" href="https://web.archive.org/web/20160123121200/http://feeds.feedburner.com/GoAnimate" type="application/rss+xml" title="GoAnimate Blog">
<link rel="alternate" href="https://web.archive.org/web/20160123121200/http://feeds.feedburner.com/GoAnimate/WhatsNew" type="application/rss+xml" title="GoAnimate - Recently Released Content">
<link rel="alternate" href="https://web.archive.org/web/20160123121200/http://feeds.feedburner.com/GoAnimate/MostWatched" type="application/rss+xml" title="GoAnimate - Most Watched">

<link href="https://josephcrosmanplays532.github.io/fonts/1/sailec.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/css/common_combined.css.gz.css" rel="stylesheet" type="text/css">

<link href="https://josephcrosmanplays532.github.io/video-player-2015-files/upsell_modals.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/video-player-2015-files/watermark.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/video-player-2015-files/video.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/video-player-2015-files/videos.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/video-player-2015-files/video_export.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/video-player-2015-files/movie_license.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/video-player-2015-files/video_voice_vendor.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/video-player-2015-files/bootstrap-tokenfield.min.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/video-player-2015-files/bootstrap-tokenfield-addon.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/video-player-2015-files/worknote.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/css/video.css.gz.css" rel="stylesheet" type="text/css">
<!--[if lt IE 9]>
<style text="text/css">
.top-nav.collapse {height: auto;overflow: visible;}
</style>
<![endif]-->

<script>
var srv_tz_os = -5, view_name = "go", user_cookie_name = "u_info";
</script>

<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/common_combined.js"></script>
<script type="text/javascript" src="https://josephcrosmanplays532.github.io/video-player-2015-files/goserver_js-en_US.json"></script>
<script type="text/javascript">
var I18N_LANG = 'en_US';
var GT = new Gettext({'locale_data': json_locale_data});
</script>

<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/jquery.ui.core.min.js"></script>
<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/jquery.ui.widget.min.js"></script>
<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/jquery.ui.position.min.js"></script>
<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/jquery.ui.menu.min.js"></script>
<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/jquery.ui.autocomplete.min.js"></script>
<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/bootstrap-tokenfield.min.js"></script>
<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/trial_upsell.js"></script>
<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/moment.min.js"></script>
<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/country-options.js"></script>


<script type="text/javascript" src="https://josephcrosmanplays532.github.io/video-player-2015-files/recaptcha_ajax.js"></script>

<!-- Google Tag Manager -->
<script>
    dataLayer = [];
    </script>
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-TXV7MD" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXV7MD');</script>
<!-- Google Tag Manager -->



<script type="text/javascript">
    dataLayer.push({
        'event': 'loadUniversalAnalytics'
    });
        dataLayer.push({
            'event': 'create'
        });

dataLayer.push({
    'event': 'pageLoad'
});
</script>



<!-- Facebook TAG -->
<script>(function() {
    var _fbq = window._fbq || (window._fbq = []);
    if (!_fbq.loaded) {
        var fbds = document.createElement('script');
        fbds.async = true;
        fbds.src = '//connect.facebook.net/en_US/fbds.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(fbds, s);
        _fbq.loaded = true;
    }
    _fbq.push(['addPixelId', '689859554455701']);
})();
window._fbq = window._fbq || [];
window._fbq.push(['track', 'PixelInitialized', {}]);
</script>
<noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?id=689859554455701&amp;ev=PixelInitialized"/></noscript>
<!-- Facebook TAG -->


<link href="https://plus.google.com/+goanimate" rel="publisher">

<!-- Start of goanimate Zendesk Widget script -->
<script>/*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(c){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload="document._l();">'),o.close()}("//web.archive.org/web/20160123121200/http://assets.zendesk.com/embeddable_framework/main.js","goanimate.zendesk.com");/*]]>*/</script>
<!-- End of goanimate Zendesk Widget script -->

<script type="text/javascript">
  (function(t,e){var n=t.amplitude||{};var r=e.createElement("script");r.type="text/javascript";
  r.async=true;r.src="https://d24n15hnbwhuhn.cloudfront.net/libs/amplitude-2.8.0-min.gz.js";
  r.onload=function(){t.amplitude.runQueuedFunctions()};var s=e.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(r,s);var i=function(){this._q=[];return this};function o(t){
  i.prototype[t]=function(){this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));
  return this}}var a=["add","append","set","setOnce","unset"];for(var u=0;u<a.length;u++){o(a[u]);
  }n.Identify=i;n._q=[];function c(t){n[t]=function(){n._q.push([t].concat(Array.prototype.slice.call(arguments,0)));
  }}var l=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","setGlobalUserProperties","identify"];
  for(var p=0;p<l.length;p++){c(l[p])}t.amplitude=n})(window,document);

var amplitudeConfig = {
    apiKey: '4c9fffdee3fb26c43dd66c70698c5a8f',
    userId: '',
    userEmail: ''
};

amplitude.init(
    amplitudeConfig.apiKey,
    null,
    {
        includeUtm: true,
        includeReferrer: true
    },
    amplitudeCallBack
);

function amplitudeCallBack() {
    var cookie_string = "amplitudeSessionId" + "=" + encodeURIComponent(amplitude.getSessionId());
    document.cookie = cookie_string;
}

if (amplitudeConfig.userId !== '') {
    amplitude.setUserId(amplitudeConfig.userId);
    amplitude.setUserProperties({
        email: amplitudeConfig.userEmail
    });
}

/**
 * UTM utility.
 */
var utmUtil = (function() {

    'use strict';

    var getUTMParameters;

    /**
     * Gets UTM parameters.
     *
     * @return {Object} A JSON object containing the properties source
     *                    (utm_source), medium (utm_medium), term (utm_term),
     *                    content (utm_content) and name (utm_campaign).
     */
    getUTMParameters = function() {
        var queryString = window.location.search.substring(1),
            parameters,
            parameterIndex,
            parametersCount,
            parameterPair,
            parameterName,
            parameterValue,
            parameterObject = {
                source: null,
                medium: null,
                term: null,
                content: null,
                name: null
            };
        // No query string at all.
        if (queryString === '') {
            return parameterObject;
        }
        parameters = queryString.split('&');
        parametersCount = parameters.length;
        for (parameterIndex = 0; parameterIndex < parametersCount; parameterIndex++) {
            parameterPair = parameters[parameterIndex].split('=');
            if (parameterPair.length !== 2) {
                continue;
            }
            parameterName = parameterPair[0];
            parameterValue = parameterPair[1];
            // Filter out non-UTM parameters.
            switch (parameterName) {
                case 'utm_source':
                    parameterObject.source = parameterValue;
                    break;
                case 'utm_medium':
                    parameterObject.medium = parameterValue;
                    break;
                case 'utm_term':
                    parameterObject.term = parameterValue;
                    break;
                case 'utm_content':
                    parameterObject.content = parameterValue;
                    break;
                case 'utm_campaign':
                    parameterObject.name = parameterValue;
                    break;
            }
        }
        return parameterObject;
    };

    return {
        getUTMParameters: getUTMParameters
    };
}());
</script>
<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/go_amp.js"></script>
<script>
// Page view.
var utmParameters = utmUtil.getUTMParameters(),
loginStatus = AMPLITUDE_EVENT_PROPERTIES.NO;amplitudeTrackEvent(
    AMPLITUDE_EVENT.PAGE_VIEW,
    {
        page_url: window.location.toString(),
        login_status: loginStatus,
        utm_source: utmParameters.source,
        utm_medium: utmParameters.medium,
        utm_term: utmParameters.term,
        utm_content: utmParameters.content,
        utm_name: utmParameters.name,
        referral: document.referrer
    }
);
</script>


<!-- Google Knowledge Graph -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VyondRemastered",
    "url": "https://vyondremastered1.herokuapp.com",
    "logo": "https://gawpstorage.s3.amazonaws.com/img/google_knowledge_graph_logo.jpg",
    "sameAs": [
        "https://www.facebook.com/GoAnimateInc",
        "https://twitter.com/GoAnimate",
        "https://www.linkedin.com/company/goanimate",
        "https://www.youtube.com/user/GoAnimate"
    ]
}
</script>

</head>
<body class="en_US">
<script type="text/javascript">
if (self !== top) {
            jQuery('body').hide();
    }
</script>
<div id="fb-root"></div>
<script>
    window.fbAsyncInit = function() {
        FB.init({
            appId : '177116303202',
            cookie : true,
            status : true,
            xfbml : true,
            version : 'v2.1'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>

<script type="text/javascript">
        jQuery.extend(CCStandaloneBannerAdUI, {"actionshopSWF":"https:\/\/web.archive.org\/web\/20160123121200\/http:\/\/lightspeed.goanimate.com\/animation\/4bd9a7c97397c789\/actionshop.swf","apiserver":"https:\/\/web.archive.org\/web\/20160123121200\/http:\/\/goanimate.com\/","clientThemePath":"https:\/\/web.archive.org\/web\/20160123121200\/http:\/\/lightspeed.goanimate.com\/static\/e15535186b40e6eb\/<client_theme>","userId":""});
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
                  <a class="navbar-brand" href="http://localhost:4343/pages/html/ga.vyond.com/yourvideos" title="Vyond">
                      <img alt="Vyond" src="https://d3v4eglovri8yt.cloudfront.net/static/add8e214e09bd155/go/img/vyond/vyond_logo_legacy.png">
                  </a>
            </div>
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                
<ul class="nav navbar-nav navbar-right">
<li class="dropdown">
    <a class="dropdown-toggle" href="https://discord.gg/YYFenX5Fep" data-toggle="dropdown">Help<span class="dropdown-caret"></span></a>
    <ul class="dropdown-menu dropdown-menu-help">

        <li>
            <a href="#" onclick="zE.activate({hideOnClose: true});amplitudeTrackCtaHelp('quick_search');return false;">Quick Search</a>
        </li>
        <li>
            <a href="https://support.vyond.com" onclick="amplitudeTrackCtaHelp('help_center');" target="_blank">Help Center</a>
        </li>
        <li>
            <a href="https://product.vyond.com/" onclick="amplitudeTrackCtaHelp('whats_new');" target="_blank">What's New   </a>
        </li>
    </ul>
</li>
                    <li>
                        <a class="hidden-sm hidden-md hidden-lg" href="http://localhost:4343/pages/html/ga.vyond.com/videomaker">Make a Video</a>
                        <span class="site-nav-btn hidden-xs"><a class="btn btn-orange" href="http://localhost:4343/pages/html/ga.vyond.com/videomaker">Make a Video</a></span>
                    </li>
<li class="dropdown">
    <a class="dropdown-toggle" href="https://ga.vyond.com/account?_ga=2.15274102.1991779285.1608744997-274477995.1607549653" data-toggle="dropdown" aria-expanded="false">
        <span class="hidden-sm hidden-md hidden-lg">Your Account</span>
        <div class="site-nav__profile-image">
            <div class="badge-circle">U</div>
        </div>
<span class="dropdown-caret"></span>
    </a>
    <ul class="dropdown-menu dropdown-menu-user">
        <li class="dropdown-user-profile">
            <div class="dropdown-user-profile__display-name">
                User 1            </div>
            <div class="dropdown-user-profile__status">
                Free trial | <a href="https://www.vyond.com/pricing">Upgrade now</a>            </div>
        </li>
        <li class="divider"></li>
        <li><a href="https://app.vyond.com/v2/profile">Profile Settings</a></li>
        <li><a href="https://app.vyond.com/v2/users/list">Users</a></li>
        <li><a href="https://app.vyond.com/v2/security">Security</a></li>
        <li><a href="https://app.vyond.com/v2/subscription">Subscription</a></li>
        <li class="divider"></li>
        <li><a href="https://app.vyond.com/" onclick="amplitudeTrackSwitchVideoMaker('Go to Vyond Studio')">Go to Vyond Studio</a></li>
        <li class="divider"></li>
        <li><a class="gtm-logout" href="/pages/html/ga.vyond.com/login">Log Out</a></li>
    </ul>
                
            </div>
    </div>
</div>

<!-- END OF HEADER -->
<div id="video-page">
<div class="video-top">
    <div class="container">
        
    </div>
<div class="video-content">
        <div class="thumbnail-container" style="background-image:url(/movie_thumbs/${params.flashvars.movieId}.png;)">
            <div class="thumbnail-overlay"></div>
        </div>
        <div class="container">
            <div class="row">
                <meta name="medium" content="video">
<div style="position:relative">
    <div id="playerdiv" align="center" style="width:958px;height:539px;">
        You can't use Vyond because Flash might be disabled. <a href="https://get.adobe.com/flashplayer/">Get Flash</a>
    </div>
    </div>
<script type="text/javascript">
var playerApiReady = false;
function playerLoaded() {
    playerApiReady = true;
    jQuery(document).trigger('playerApiReady');
};
jQuery('#playerdiv').flash({
    id: "Player",
    swf: "${params.flashvars.animationPath}player.swf",
    height: 539,
    width: 958,
    bgcolor: "#000000",
    scale: "exactfit",
    allowScriptAccess: "always",
    allowFullScreen: "true",
    wmode: "opaque",
    hasVersion: "10.3",
    flashvars: ${JSON.stringify(params.flashvars)}});
jQuery('#player-overlay-dismiss').click(function() {
    jQuery('#player-overlay').hide();
});
</script>
                </div>
            </div>
                <div class="sidebar col-sm-5 hidden-xs">
                    <div class="row panel-container">
                        <div class="setting-panels">
                            <div class="main-panel">
                                <div class="setting-title"><span class="glyph-pro glyph-show-thumbnails_with_lines"></span> Settings</div>
                                <ul class="setting-items">
    
    
    
    
    
    
                                    </ul>
                            </div>
                            <div class="sub-panel">
                                <div class="panel-item logo-panel">
                                    <div class="panel-title">
                                        <span class="glyph-pro glyph-chevron-left"></span><span class="text">Logo</span>
                                    </div>
                                    <div class="list-container">
                                        <div class="panel-info">
                                            Want to use a brand new logo?<br>
                                            <a href="https://josephcrosmanplays532.github.io/account/logo">
                                                Go to Account settings &gt;
                                            </a>
                                        </div>
                                        <div class="default-logo-list-container">
                                            <ul class="logo-list">
                                                <li data-watermark="0dhteqDBt5nY"><img src="./Your Animation - Vyond_files/no_watermark.png"></li>
                                                <li data-watermark="0vTLbQy9hG7k"><img src="./Your Animation - Vyond_files/vyond.png"></li>
                                            </ul>
                                        </div>
                                        <div class="logo-list-container">
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-item history-panel">
                                    <div class="panel-title">
                                        <span class="glyph-pro glyph-chevron-left"></span><span class="text">Revision history</span>
                                    </div>
                                    <div class="list-container"></div>
                                </div>
                                <div class="panel-item notes-panel">
                                    <div class="panel-title-static">
                                        <span class="glyph-pro glyph-blog"></span><span class="text">Notes</span>
                                    </div>
                                    <div class="list-container"></div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="thumbnail-overlay"></div>
<div class="video-top">

    <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject">
        <link itemprop="url" href="https://josephcrosmanplays532.github.io/Dhar-Mann-Video-Archives/RUDE CASHIER Won�t Sell To KID - DELETING AFTER 48 HOURS!! | Dhar Mann/styles/vyond/watch">
        <meta itemprop="name" content="RUDE CASHIER Won�t Sell To KID">
        <meta itemprop="description" content=" SHOP MERCH here: shop.dharmann.com">
        <meta itemprop="duration" content="PT0H0M3S">
        <meta itemprop="thumbnailUrl" content="https://josephcrosmanplays532.github.io/Dhar-Mann-Video-Archives/RUDE CASHIER Won�t Sell To KID - DELETING AFTER 48 HOURS!! | Dhar Mann/images/5btJhbxqTdY.png">
        <meta itemprop="uploadDate" content="2021-12-14T19:37:10-0500">
        <meta itemprop="embedURL" content="https://josephcrosmanplays532.github.io/Dhar-Mann-Video-Archives/RUDE CASHIER Won�t Sell To KID - DELETING AFTER 48 HOURS!! | Dhar Mann/styles/vyond/embed">
        <meta itemprop="playerType" content="HTML5 Flash">
        <meta itemprop="videoQuality" content="HD">
        <meta itemprop="height" content="720">
        <meta itemprop="width" content="1280">
    </div>

    <div class="settings privacy private hidden-xs">
        <div class="container">
            <div class="row settings-row">
                <div class="col-sm-9">
                    <div class="settings-label hidden-xs">Share</div>
                    <div class="using-draft"><span class="icon glyph-pro glyph-lock inline"></span>Draft</div>
                                   </div>
            </div>
        </div>
        <div id="autosave-overlay" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true">�</button>
                        <h3 class="modal-title">Your video was autosaved</h3>
                    </div>
                    <div class="modal-body">
                        <span class="autosave-message"></span>
                        <a class="history-toggle" data-dismiss="modal">View revision history.</a>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default text-uppercase" onclick="fullscreenStudio('/videomaker/full/editcheck/5btJhbxqTdY');">Manually saved</button>
                        <button class="load-autosave btn btn-default btn-orange text-uppercase">Load autosaved</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="settings headline">
        <div class="container">
            <div class="settings-row">
            <h1 class="video-title visible-xs">Day 25 Final</h1>
            <p>Created by <a href="https://www.youtube.com/channel/UCnry-lH2ePRlP7RHerX_YTw" title="User 1">User 1</a></p>
<p>Rights holder: Fanimation36</p>
<a class="btn btn-orange" href=""> Transfer Commercial Rights</a>


        </div>
        </div>
    </div>


    <div class="settings social headline">
        <div class="container">
            <div class="settings-row">
                    <div class="row">
                        <div class="col-sm-6">
                            <img class="portrait portrait-tiny img-circle" src="" alt="">
                        </div>
                        <div class="col-sm-6 socials-icons">
                            <ul class="socials-sharing">
                                <li>
                                                                        </a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div><div class="export disabled" id="export">
        <div class="container">
            <div class="title-row">
                <h3 class="title">Export</h3>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="download-export" data-type="Download">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Download<br><span class="text-uppercase">Video</span></div>
                        <div class="description">
                            Up to 1080p Full HD.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank"><br>View plans</a>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="gif-export" data-type="Gif">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Download<br><span class="text-uppercase">animated GIF</span></div>
                        <div class="description">
                            Paste your video clip anywhere as a GIF!                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="youtube-export" data-type="Youtube" data-connected="true">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">YouTube</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="wistia-export" data-type="Wistia" data-connected="false">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">Wistia</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                            <div class="for-connect">Connect</div>
                            <div class="for-connected">Connected</div>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="vidyard-export" data-type="Vidyard" data-connected="false">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">Vidyard</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                            <div class="for-connect">Connect</div>
                            <div class="for-connected">Connected</div>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="vimeo-export" data-type="Vimeo" data-connected="false">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">Vimeo</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                            <div class="for-connect">Connect</div>
                            <div class="for-connected">Connected</div>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="vzaar-export" data-type="Vzaar" data-connected="false">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">Vzaar</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                            <div class="for-connect">Connect</div>
                            <div class="for-connected">Connected</div>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="wevideo-export" data-type="WeVideo" data-connected="false">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">WeVideo</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                            <div class="for-connect">Connect</div>
                            <div class="for-connected">Connected</div>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
        <div id="autosave-overlay" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true">�</button>
                        <h3 class="modal-title">Your video was autosaved</h3>
                    </div>
                    <div class="modal-body">
                        <span class="autosave-message"></span>
                        <a class="history-toggle" data-dismiss="modal">View revision history.</a>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default text-uppercase" onclick="fullscreenStudio(&#39;/videomaker/full/editcheck/5btJhbxqTdY&#39;);">Manually saved</button>
                        <button class="load-autosave btn btn-default btn-orange text-uppercase">Load autosaved</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
        <div class="col-md-4 aside video-aside">

            <div></div><br>

        </div>
    </div>
</div>
</div>

<!-- modals -->


<script>
// Twitter
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//web.archive.org/web/20160123121200/http://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

// Google Plus
(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

// Pinterest
(function(d){
  var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
  p.type = 'text/javascript';
  p.async = true;
  p.src = '//assets.pinterest.com/js/pinit.js';
  f.parentNode.insertBefore(p, f);
}(document));

// constants defined for movie title prefix editing
var MOVIE_TITLE_PREFIX = '';
var MOVIE_TITLE = 'election';
var MOVIE_USERNAME = 'LindNel13';

var USER_USERNAME = '';var MOVIE_COLLAB_LOCK = false;
// Amplitude interface for Flash player.
function logAmplitudeEvent(eventName, eventProperties) {
    if (amplitude !== undefined) {
        if (eventName === AMPLITUDE_EVENT.PLAYS_VIDEO) {
            eventProperties["referral"] = document.referrer;
        }
        amplitude.logEvent(eventName, eventProperties);
    }
}

        amplitudeTrackEvent(
            AMPLITUDE_EVENT.WATCH_VIDEO,
            {
                video_id: '0-1BF1m2VKQA',
                owner: '0ebQWccvfxlY'
            }
        );
</script>

<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/users.js"></script>
<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/video.js"></script>
<script src="https://josephcrosmanplays532.github.io/video-player-2015-files/videos.js"></script>








<div id="video-share" class="modal" role="dialog" aria-hidden="true">
  <div class="modal-dialog"><div class="modal-content"></div></div>
</div>
<!-- FOOTER -->

<footer class="site-footer">
    <div class="container">
        Vyond™ is a trademark of GoAnimate. Inc. ©2019 GoAnimate. Inc. <a href="https://www.vyond.com/terms">Terms of Service</a> | <a href="https://www.vyond.com/privacy">Privacy Policy</a> | <a href="https://www.vyond.com/cookies">Cookies Policy</a>
    </div>

</footer>

</footer><div id="studio_container" style="display: none;">
    <div id="studio_holder"><!-- Full Screen Studio -->
        <div style="top: 50%; position: relative;">
            You can't use GoAnimate because Flash might be disabled. <a href="https://web.archive.org/web/20191022104022/https://get.adobe.com/flashplayer/">Enable Flash</a>.
        </div>
    </div>
</div>


</html>`
		);
	return true;
}
