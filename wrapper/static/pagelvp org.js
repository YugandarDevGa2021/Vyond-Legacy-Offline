const sessions = require('../data/sessions');
const fUtil = require('../fileUtil');
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
			title = 'Video Player - Vyond';
		attrs = {
				data: process.env.SWF_URL + '/player.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'apiserver': 'http://localhost/', 'storePath': process.env.STORE_URL + '/<store>', 'ut': 60,
					'autostart': 0, 'isWide': 1, 'clientThemePath': process.env.CLIENT_URL + '/<client_theme>',
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
	`<link rel="stylesheet" href="/html/css/common_combined.css.gz.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700"><link rel="stylesheet" href="/html/css/importer.css.gz.css"><link rel="stylesheet" href="/html/css/video.css.gz.css"><link rel="stylesheet" href="/html/css/video_export.css.gz.css"><script href="/html/js/common_combined.js.gz.js"></script><script>document.title='${title}',flashvars=${JSON.stringify(
	params.flashvars
	)}</script><body style="margin:0px">
<script type="text/javascript" id="" src="https://ga.vyond.com/ajax/cookie_policy"></script><div class="site-header">
    <div class="navbar site-nav site-nav--legacy" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="https://ga.vyond.com/yourvideos" title="Vyond">
                      <img alt="Vyond" src="/html/logo.png">
                  </a>
            </div>

            <div class="collapse navbar-collapse navbar-ex1-collapse">
                
<ul class="nav navbar-nav navbar-right">
<li class="dropdown">
    <a class="dropdown-toggle" href="https://discord.gg/YYFenX5Fep" data-toggle="dropdown">Help<span class="dropdown-caret"></span></a>
    <ul class="dropdown-menu dropdown-menu-help">

        <li>
            <a href="https://discord.gg/YYFenX5Fep">Help Center</a>
        </li>
    </ul>
</li>


                    <li>
                        <a class="hidden-sm hidden-md hidden-lg" href="/videomaker">Make a Video</a>
                        <span class="site-nav-btn hidden-xs"><a class="btn btn-orange" href="/videomaker">Make a Video</a></span>
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
                BluePeacocks            </div>
        

        <li class="divider"></li>
        <li><a href="/account">Account Settings</a></li>
        <li class="divider"></li>
        <li><a class="logout-link gtm-logout" href="/logoff">Logout</a></li>
    </ul>
</li>

      </ul>

                
            </div>
    </div>
</div>

<div id="video-page">
 
<div class="video-content">
        <div class="thumbnail-container" style="background-image:url('http://localhost/movie_thumbs/m-57')">
            <div class="thumbnail-overlay"></div>
        </div>

<div class="video-player-viewport using-flash" style="background-image:url('http://localhost/movie_thumbs/m-57')">
                                <div class="video-player-wrapper embed-responsive embed-responsive-16by9">
                                   	${toObjectString(attrs, params)}
                                    <video class="embed-responsive-item hidden" id="h5-player"></video>
                                </div>
                                <div class="video-info hidden-xs" data-video-id="07m3MiyKSl-w" data-is-owner="yes" data-owner="0aWj-HdFtJ5c" data-duration="4" style="display: block;">
                                    <div class="video-info-content">
                                        <div class="editable">
                                            <div class="non-edit-fields">
                                                <a class="edit-video-info" data-action="edit-video-info">Edit video info</a>
                                                <h1 class="title">Test vid</h1>
                                                <p class="description"></p>
                                            </div>
                                        </div>
                                        <p class="creator">Created by <a href="http://web.archive.org/web/20181123104749/https://ga.vyond.com/user/0aWj-HdFtJ5c" title="WolfychuAndBeck">BluePeacocks</a></p>
                                        <p class="status">
                                            <span class="js-show-revision-history" style="cursor: pointer;">
                                                                                                Last modified: 13 October 2020 - 4:41pm                                                                                        </span>
                                        </p>
                                    </div>
                                    <form id="movie-setting-form" class="edit-fields">
                                        <div class="form-group">
                                            <input class="form-control" type="text" name="title" placeholder="Title" value="Isabelle from animal crossing tests out poopanim8" maxlength="50">
                                        </div>
                                        <div class="form-group">
                                            <textarea class="form-control" name="desc" placeholder="Description" maxlength="255"></textarea>
                                        </div>
                                        <div class="form-group text-right">
                                            <input type="hidden" name="enc_mid" value="07m3MiyKSl-w">
                                            <button class="btn btn-orange" type="submit">Done</button>
                                        </div>
                                    </form>
                                </div>
                                <div class="video-loading" id="video-loading" style="display: none;">
                                    <div class="video-loading-message"></div>
                                </div>
                                <div id="player-control" class="non-playing" style="display: block;">
                                    <div class="seek-bar-container">
                                        <div class="seek-bar">
                                            <div class="buffered-bar"></div>
                                            <div class="hover-bar"></div>
                                            <div class="played-bar"></div>
                                            <div class="time-tooltip"></div>
                                        </div>
                                    </div>
                                    <div class="button-container">
                                        <div class="playback-button paused">
                                            <div class="play-button"></div>
                                            <div class="pause-button"></div>
                                            <div class="replay-button"></div>
                                        </div>
                                        <div class="progress-time-container">
                                            <div class="progress-time">00:00 / 00:04</div>
                                        </div>
                                        <div class="controls-right">
                                            <div class="volume-container">
                                                <div class="volume-control">
                                                    <div class="volume-icon">
                                                        <div class="volume-up-icon"></div>
                                                        <div class="volume-mute-icon"></div>
                                                    </div>
                                                    <div class="volume-slider">
                                                        <div class="slider-track">
                                                            <div class="track-value-bar"></div>
                                                        </div>
                                                        <div class="slider-thumb"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="fullscreen-container">
                                                <div class="fullscreen-button"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
			</div>
<div class="video-top">
    

    <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject">
        <link itemprop="url" href="https://ga.vyond.com/videos/0WEJBDnBJFGk">
        <meta itemprop="name" content="GoAnimate Went Wrong!">
        <meta itemprop="description" content="Can you do yours? Wrong, Go!Animate, Went, OUT OF ORDER, OUT OF ORDER, SOLD OUT, OUT OF ORDER, SOLD OUT, SOLD OUT, OUT OF ORDER, SOLD OUT, SOLD OUT, Noooooooooooooooooooooooooooooooooooooooo! Everything is sold out!, OUT OF ORDER, SOLD OUT, SOLD OUT, Oh my god! Fire! Waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah!, The pizza is almost done kids!, Oh no! I burned the pan!, Waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah!, Ok guys, I'm sorry that I removed the comments, messages, favorites, and followers! I will get it back in 2016!, Oh my god there's fire Noooooooooooooooooooooooooooooooooooooooo!, Wa wa wa wa wa wa wa wa wa wa wa wa wa wa! Fire!, Waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah! There is fire everywhere of all of GoAnimate!, Oh my god! Why is there fire everywhere! Please help us! Waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah!, Help Us Save , Call 911 or donate, Call 911 or donate, Shut up!, Fire! Waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah!, Emergency, Oh my god! Fire! Wa-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-ah!, Wawawawawawawawawawawawa! I can't believe there is fire of all over GoAnimate World! Its ruined!, Wa-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-a-ah! Fire! Why is it doing that? I have no idea why!, WORLD, Ha ha ha ha ha ha ha ha ha ha ha ha ha ha!  Your GoAnimate World exploded! Better luck next time! Ha ha ha ha ha ha ha ha ha ha ha!, WARNING: Something scary is happening at 2:45">
        <meta itemprop="duration" content="PT0H3M24S">
        <meta itemprop="thumbnailUrl" content="http://web.archive.org/web/20190127154917im_/https://s3.amazonaws.com/fs.goanimate.com/files/thumbnails/movie/1087/5965087/24627393.jpg">
        <meta itemprop="uploadDate" content="2015-09-05T15:03:48-0400">
        <meta itemprop="embedURL" content="https://ga.vyond.com/player/embed/0WEJBDnBJFGk">
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
                    <div class="using-private"><span class="icon glyph-pro glyph-lock inline"></span>Private</div>
                    <div class="using-password-protected"><span class="icon glyph-pro glyph-lock inline"></span>Password-Protected</div>
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
                        <button class="btn btn-default text-uppercase" onclick="fullscreenStudio('/videomaker/full/editcheck/0WEJBDnBJFGk');">Manually saved</button>
                        <button class="load-autosave btn btn-default btn-orange text-uppercase">Load autosaved</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="settings headline">
        <div class="container">
            <div class="settings-row">
            <h1 class="video-title visible-xs">GoAnimate Went Wrong!</h1>
            <p>Created by <a href="http://web.archive.org/web/20190127154917/https://ga.vyond.com/user/0saUjypIHmxo" title="jacob630">BluePeacocks</a></p>

        </div>
        </div>
    </div>


    <div class="settings social grey">
        <div class="container">
            <div class="settings-row">
                    <div class="row">
                        <div class="col-sm-6">
                            <input id="copyable-url" class="form-control gtm-ga-event" type="url" readonly="true" value="https://ga.vyond.com/videos/0WEJBDnBJFGk?utm_source=linkshare&amp;utm_medium=linkshare&amp;utm_campaign=usercontent" onclick="this.select()" data-gtmv-action="Share - Click text field" data-gtmv-category="" data-gtmv-label="24627393 - Guest">
                        </div>
                        <div class="col-sm-6 socials-icons">
                            <ul class="socials-sharing">
                                <li>
                                    <a class="glyph-pro glyph-embed-close" data-remote="/ajax/getEmbedOverlay/0WEJBDnBJFGk" data-action="video-embed" title="" data-original-title="Embed code">
                                        <span class="sr-only sr-only-focusable">Embed code</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
<div class="export disabled" id="export">
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
                            Up to 1080p Full HD.                            <a class="for-unavailable" href="http://web.archive.org/web/20190127154917/https://www.vyond.com/pricing" target="_blank"><br>View plans</a>
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
                            Paste your video clip anywhere as a GIF!                            <a class="for-unavailable" href="http://web.archive.org/web/20190127154917/https://www.vyond.com/pricing" target="_blank">View plans</a>
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
                            Available to subscribers only.                            <a class="for-unavailable" href="http://web.archive.org/web/20190127154917/https://www.vyond.com/pricing" target="_blank">View plans</a>
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
                            Available to subscribers only.                            <a class="for-unavailable" href="http://web.archive.org/web/20190127154917/https://www.vyond.com/pricing" target="_blank">View plans</a>
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
                            Available to subscribers only.                            <a class="for-unavailable" href="http://web.archive.org/web/20190127154917/https://www.vyond.com/pricing" target="_blank">View plans</a>
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
                            Available to subscribers only.                            <a class="for-unavailable" href="http://web.archive.org/web/20190127154917/https://www.vyond.com/pricing" target="_blank">View plans</a>
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
                            Available to subscribers only.                            <a class="for-unavailable" href="http://web.archive.org/web/20190127154917/https://www.vyond.com/pricing" target="_blank">View plans</a>
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
                            Available to subscribers only.                            <a class="for-unavailable" href="http://web.archive.org/web/20190127154917/https://www.vyond.com/pricing" target="_blank">View plans</a>
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
<div class="shortcut-instruction hidden-xs hidden-sm">
        <div class="container">
            <ul>
                <li>
                    <div class="key play"></div>
                    <div class="name">Play / Pause</div>
                </li>
                <li>
                    <div class="key back-forward"></div>
                    <div class="name">Back/forward 5 secs</div>
                </li>
                <li>
                    <div class="key full-screen"></div>
                    <div class="name">Full Screen</div>
                </li>
                <li>
                    <div class="key exit-full-screen"></div>
                    <div class="name">Exit Full Screen</div>
                </li>
            </ul>
        </div>
    </div>
<footer class="site-footer">
    <div class="container">
        Vyond� is a trademark of GoAnimate, Inc. � 2018 GoAnimate, Inc. <a href="http://web.archive.org/web/20190127154917/https://www.vyond.com/terms">Terms of Service</a> | <a href="http://web.archive.org/web/20190127154917/https://www.vyond.com/privacy">Privacy Policy</a> | <a href="http://web.archive.org/web/20190127154917/https://www.vyond.com/cookies">Cookies Policy</a>
    </div>
</footer>

<script></script>
	</body>${stuff.pages[url.pathname] || ''}`
		);
	return true;
}
