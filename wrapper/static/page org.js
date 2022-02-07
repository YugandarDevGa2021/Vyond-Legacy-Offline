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
		case '/character_creator/new_char/': {
			title = 'Import a character - Character Creator';
			attrs = {	
				data: process.env.SWF_URL + '/cc.swf', // data: 'cc.swf',
				type: 'application/x-shockwave-flash', id: 'char_creator', width: '960', height: '600',
			};
			params = {
				flashvars: {
					'apiserver': 'http://localhost/', 'storePath': process.env.STORE_URL + '/<store>',
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>', 'original_asset_id': query['id'] || null,
					'themeId': 'business', 'ut': 60, 'bs': 'default', 'appCode': 'go', 'page': '', 'siteId': 'go',
					'm_mode': 'school', 'isLogin': 'Y', 'isEmbed': 1, 'ctc': 'go', 'tlang': 'en_US',
				},
				allowScriptAccess: 'always',
				movie: process.env.SWF_URL + '/cc.swf', // 'http://localhost/cc.swf'
			};
			break;
		}
case '/character_creator': {
			title = 'Make a Character - GoAnimate for Schools Remastered';
			attrs = {	
				data: process.env.SWF_URL + '/cc_browser.swf', // data: 'cc_browser.swf',
				type: 'application/x-shockwave-flash', id: 'char_creator', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'apiserver': 'http://localhost/', 'storePath': process.env.STORE_URL + '/<store>',
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>',
					'themeId': 'business', 'ut': 60, 'appCode': 'go', 'page': '', 'siteId': 'go',
					'm_mode': 'school', 'isLogin': 'Y', 'isEmbed': 1, 'ctc': 'go', 'tlang': 'en_US',
				},
				allowScriptAccess: 'always',
				align: 'middle'
			};
			break;
		}
	
		case '/videomaker/full': {
			let presave = query.movieId && query.movieId.startsWith('m') ? query.movieId :
				`m-${fUtil[query.noAutosave ? 'getNextFileId' : 'fillNextFileId']('movie-', '.xml')}`;
			title = 'Import/edit video on the Legacy Video Maker';
			attrs = { 
				data: process.env.SWF_URL + '/go_full.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'apiserver': 'http://localhost/', 'storePath': process.env.STORE_URL + '/<store>', 'isEmbed': 1, 'ctc': 'go',
					'ut': 60, 'bs': 'default', 'appCode': 'go', 'page': '', 'siteId': 'go', 'lid': 13, 'isLogin': 'Y', 'retut': 1,
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>', 'themeId': 'business', 'tlang': 'en_US',
					'presaveId': presave, 'goteam_draft_only': 1, 'isWide': 1, 'nextUrl': '/dashboard/videos',
				},
				allowScriptAccess: 'always',
			};
			sessions.set({ movieId: presave }, req);
			break;
		}

	case '/movie': {
			title = 'Video Player - GoAnimate For Schools Remastered';
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
	`<link rel="stylesheet" href="/html/css/common_combined.css.gz.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700"><link rel="stylesheet" href="/html/css/importer.css.gz.css"><script href="/html/themelist/themelistfiles/common_combined.js.gz.js"></script><script>document.title='${title}',flashvars=${JSON.stringify(
	params.flashvars
	)}</script><body style="margin:0px">
	<nav class="navbar site-nav" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            <a class="navbar-brand" href="/html/list.html" title="GoAnimate for Schools Remastered">
                <img src="/html/img/logo4s.png" alt="GoAnimate For Schools Remastered">
            </a>
        </div>

        <ul class="nav site-nav-alert-nav hidden-xs">
            <li>
                <a href="/web/20181218221022/http://vyondhoster.000webhostapp.com/messages" title="Messages"><span class="glyphicon glyphicon-envelope"></span><span class="count"></span></a>
            </li>
            <li>
                <a href="/web/20181218221022/http://vyondhoster.000webhostapp.com/notifications" title="Notifications"><span class="glyphicon glyphicon-bell"></span><span class="count"></span></a>
            </li>
        </ul>
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown">Your Account <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="/web/20181218221022/http://vyondhoster.000webhostapp.com/student">Dashboard</a></li>
                        <li><a href="/web/20181218221022/http://vyondhoster.000webhostapp.com/movies">Your Videos</a></li>
                        <li class="divider"></li>
                        <li><a href="/web/20181218221022/http://vyondhoster.000webhostapp.com/account">Account Settings</a></li>
                        <li><a href="/web/20181218221022/http://vyondhoster.000webhostapp.com/profile/0DyHqK6Yj9dM">Your Profile</a></li>
                        <li class="divider"></li>
                        <li><a class="logout-link" href="/web/20181218221022/http://vyondhoster.000webhostapp.com/logoff">Logout</a></li>
                    </ul>
                </li><li class="dropdown">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown">Explore <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="https://web.archive.org/web/20181004174617/http://vyondhoster.000webhostapp.com/students">Students</a></li>
                        <li><a href="https://web.archive.org/web/20181004174617/http://vyondhoster.000webhostapp.com/teachers">Teachers</a></li>
                        <li><a href="https://web.archive.org/web/20181004174617/http://vyondhoster.000webhostapp.com/videos">Videos</a></li>
                        <li class="divider"></li>
                        <li><a href="https://web.archive.org/web/20181004174617/https://blog.goanimate4schools.com/">Educator Experiences</a></li>
                        <li><a href="https://web.archive.org/web/20181004174617/http://vyondhoster.000webhostapp.com/public_faq">FAQ</a></li>
                    </ul>
                </li>
                <li>
                    <a class="hidden-sm hidden-md hidden-lg" href="/html/themelist/themelist.html">Make a Video</a>
                    <span class="site-nav-btn hidden-xs"><a class="btn btn-green" href="/html/themelist/themelist.html">Make a Video</a></span>
                </li>
            </ul>
        </div>
    </div>
</nav>
	${toObjectString(attrs, params)}
	</body>${stuff.pages[url.pathname] || ''}`
		);
	return true;
}
